import { useEffect, useRef, useState } from 'react';
import { Sprite, type Anim, type Hoja } from './Sprite';

// Las hojas de sprites del juego (la fila y los cuadros de cada animación salen de su .json).
const JAIR: Hoja = { src: '/rpg/jair_hoja.png', w: 2640, h: 812, cuadroW: 132, cuadroH: 116 };
const NIKKI: Hoja = { src: '/rpg/nikki_hoja.png', w: 2640, h: 2668, cuadroW: 132, cuadroH: 116 };
const A = {
  jair: {
    idle: { row: 0, frames: 6, fps: 6 },
    ataque: { row: 2, frames: 10, fps: 12, loop: false },
    dano: { row: 3, frames: 9, fps: 12, loop: false },
    salto: { row: 1, frames: 9, fps: 10, loop: false },
  },
  nikki: {
    idle: { row: 0, frames: 24, fps: 12 },
    ataque: { row: 3, frames: 10, fps: 12, loop: false },
    dano: { row: 4, frames: 8, fps: 12, loop: false },
  },
} satisfies Record<string, Record<string, Anim>>;

// Dónde pisa cada uno en el fondo del bar (como en el juego: % de la imagen, el centro de los pies).
const POS = { nikki: { x: 36, y: 77 }, jair: { x: 78, y: 76 } };
const PS = { jair: 54, nikki: 102 };

type Paso = { quien: 'jair' | 'nikki'; tipo: 'ataque' | 'esquiva' | 'cura' };
// El guion del bucle: se repite para siempre (como la vida de Jair).
const GUION: Paso[] = [
  { quien: 'jair', tipo: 'ataque' },
  { quien: 'nikki', tipo: 'ataque' },
  { quien: 'jair', tipo: 'ataque' },
  { quien: 'nikki', tipo: 'esquiva' },
  { quien: 'jair', tipo: 'ataque' },
  { quien: 'nikki', tipo: 'ataque' },
  { quien: 'nikki', tipo: 'cura' },
];

const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Una pelea del juego en bucle, hecha con sus sprites y el fondo del bar: Jair y Nikki se turnan para atacar, con
 * el texto de la acción, los números de daño y la vida que baja. Va dentro del televisor de la sección del RPG.
 */
export function PeleaEnBucle({ mensajes }: { mensajes: { turno: string; jair: string; nikki: string; esquiva: string; cura: string } }) {
  const caja = useRef<HTMLDivElement>(null);
  const [alto, setAlto] = useState(400);
  const [anim, setAnim] = useState<{ jair: Anim; nikki: Anim }>({ jair: A.jair.idle, nikki: A.nikki.idle });
  const [vez, setVez] = useState({ jair: 0, nikki: 0 });
  const [x, setX] = useState({ jair: POS.jair.x, nikki: POS.nikki.x });
  const [ps, setPs] = useState({ ...PS });
  const [texto, setTexto] = useState(mensajes.turno);
  const [numero, setNumero] = useState<null | { quien: 'jair' | 'nikki'; t: string; k: number }>(null);
  const textos = useRef(mensajes);
  textos.current = mensajes;

  // El tamaño de los sprites sigue al alto de la pantalla del televisor.
  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAlto(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let vivo = true;
    const jugar = (quien: 'jair' | 'nikki', a: Anim) => {
      setAnim((m) => ({ ...m, [quien]: a }));
      setVez((v) => ({ ...v, [quien]: v[quien] + 1 }));
    };
    (async () => {
      for (let i = 0; vivo; i = (i + 1) % GUION.length) {
        setTexto(textos.current.turno);
        await espera(1300);
        if (!vivo) return;
        const p = GUION[i];
        if (p.tipo === 'cura') {
          setTexto(textos.current.cura);
          setPs({ ...PS });
          setNumero({ quien: 'nikki', t: `+${PS.nikki}`, k: Math.random() });
          await espera(1600);
          continue;
        }
        const atacante = p.tipo === 'esquiva' ? 'nikki' : p.quien;
        const blanco = atacante === 'jair' ? 'nikki' : 'jair';
        setTexto(atacante === 'jair' ? textos.current.jair : textos.current.nikki);
        // Se acerca al blanco, pega y vuelve.
        setX((m) => ({ ...m, [atacante]: atacante === 'jair' ? POS.nikki.x + 11 : POS.jair.x - 11 }));
        await espera(320);
        jugar(atacante, atacante === 'jair' ? A.jair.ataque : A.nikki.ataque);
        await espera(420);
        if (p.tipo === 'esquiva') {
          jugar('jair', A.jair.salto);
          setNumero({ quien: 'jair', t: 'MISS', k: Math.random() });
          setTexto(textos.current.esquiva);
        } else {
          const dano = blanco === 'nikki' ? 9 + Math.floor(Math.random() * 4) : 12 + Math.floor(Math.random() * 5);
          jugar(blanco, blanco === 'jair' ? A.jair.dano : A.nikki.dano);
          setNumero({ quien: blanco, t: String(dano), k: Math.random() });
          setPs((m) => ({ ...m, [blanco]: Math.max(1, m[blanco] - dano) }));
        }
        await espera(700);
        setX((m) => ({ ...m, [atacante]: POS[atacante].x }));
        await espera(350);
        jugar('jair', A.jair.idle);
        jugar('nikki', A.nikki.idle);
        await espera(500);
      }
    })();
    return () => {
      vivo = false;
    };
  }, []);

  const escala = (alto * 0.27) / 116;
  return (
    <div className="pelea" ref={caja}>
      <div className="pelea-escena">
        {(['nikki', 'jair'] as const).map((q) => (
          <div key={q} className="pelea-figura" style={{ left: `${x[q]}%`, top: `${POS[q].y}%` }}>
            <Sprite hoja={q === 'jair' ? JAIR : NIKKI} anim={anim[q]} vez={vez[q]} escala={escala} espejo={q === 'jair'} />
            {numero?.quien === q && (
              <b key={numero.k} className={`pelea-numero ${numero.t === 'MISS' ? 'falla' : numero.t.startsWith('+') ? 'cura' : ''}`}>
                {numero.t}
              </b>
            )}
            <i className="pelea-vida">
              <i style={{ width: `${(ps[q] / PS[q]) * 100}%` }} />
            </i>
          </div>
        ))}
      </div>
      <div className="pelea-mensaje">{texto}</div>
      <div className="pelea-tarjeta">
        <b>Jair</b> <small>Nv 5</small>
        <span>
          HP <strong>{ps.jair}</strong> / {PS.jair}
        </span>
      </div>
    </div>
  );
}
