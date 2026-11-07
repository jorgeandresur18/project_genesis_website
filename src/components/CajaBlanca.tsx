// «Aspectos técnicos» (antes «Caja blanca»): cómo está hecho el juego, con diagramas, código real y los personajes por dentro (la demo del
// Capítulo 1). Los textos y las cifras están en src/data/caja_blanca.ts.
import { type CSSProperties, type ReactNode } from 'react';
import { CAJA, CODIGO, FICHAS } from '../data/caja_blanca';
import { ENLACES, PERSONAJES, type Lang } from '../data/textos';

type T = (typeof CAJA)['es'];

// ---------- Código con colores (un resaltado mínimo: comentarios, textos, palabras clave y números) ----------
const PALABRAS = /\b(export|function|const|for|of|if|return|await|import|from|it|expect)\b/;
const TOKENS = /(\/\/.*$)|("(?:[^"\\]|\\.)*"(?=\s*:))|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(export|function|const|for|of|if|return|await|import|from|it|expect)\b|\b(\d+(?:\.\d+)?)\b/gm;

function resaltar(codigo: string): ReactNode[] {
  const out: ReactNode[] = [];
  let ultimo = 0;
  for (const m of codigo.matchAll(TOKENS)) {
    const i = m.index ?? 0;
    if (i > ultimo) out.push(codigo.slice(ultimo, i));
    const clase = m[1] ? 'c-com' : m[2] ? 'c-clave' : m[3] ? 'c-str' : m[4] && PALABRAS.test(m[4]) ? 'c-kw' : 'c-num';
    out.push(
      <span key={i} className={clase}>
        {m[0]}
      </span>,
    );
    ultimo = i + m[0].length;
  }
  out.push(codigo.slice(ultimo));
  return out;
}

function Codigo({ codigo, archivo }: { codigo: string; archivo: string }) {
  return (
    <figure className="cb-codigo">
      <figcaption>
        <i />
        <i />
        <i />
        <span>{archivo}</span>
      </figcaption>
      <pre>
        <code>{resaltar(codigo)}</code>
      </pre>
    </figure>
  );
}

/** Una lista de pasos con flechas, que se acomoda sola al ancho (en el celular, hacia abajo). */
function Pasos({ pasos, clase = '' }: { pasos: readonly string[]; clase?: string }) {
  return (
    <ol className={`cb-pasos ${clase}`}>
      {pasos.map((p, i) => (
        <li key={p} style={{ '--i': i } as CSSProperties}>
          <span>{p}</span>
        </li>
      ))}
    </ol>
  );
}

// ---------- Diagrama 1: datos → motor → interfaz ----------
function Arquitectura({ d }: { d: T['bloques']['arquitectura']['diagrama'] }) {
  const columnas = [
    { x: 20, t: d.datos, items: d.datosItems, c: '#f0b54a' },
    { x: 330, t: d.motor, items: d.motorItems, c: '#5ea8ff' },
    { x: 640, t: d.ui, items: d.uiItems, c: '#ff6fa5' },
  ];
  return (
    <div className="cb-diagrama">
      <svg viewBox="0 0 900 330" role="img" aria-label={`${d.datos} → ${d.motor} → ${d.ui}`}>
        <defs>
          <marker id="cb-flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#9aa0ab" />
          </marker>
        </defs>
        {columnas.map((col) => (
          <g key={col.t}>
            <rect x={col.x} y="14" width="240" height="214" rx="14" fill="#0e0e13" stroke={col.c} strokeOpacity="0.7" />
            <rect x={col.x} y="14" width="240" height="42" rx="14" fill={col.c} fillOpacity="0.16" />
            <text x={col.x + 120} y="41" textAnchor="middle" className="cb-svg-titulo" fill={col.c}>
              {col.t}
            </text>
            {col.items.map((it, i) => (
              <g key={it}>
                <rect x={col.x + 16} y={70 + i * 38} width="208" height="30" rx="7" fill="#17171e" stroke="#2c2c36" />
                <text x={col.x + 120} y={90 + i * 38} textAnchor="middle" className="cb-svg-item">
                  {it}
                </text>
              </g>
            ))}
          </g>
        ))}
        <line x1="264" y1="121" x2="326" y2="121" stroke="#9aa0ab" strokeWidth="2" markerEnd="url(#cb-flecha)" />
        <line x1="574" y1="121" x2="636" y2="121" stroke="#9aa0ab" strokeWidth="2" markerEnd="url(#cb-flecha)" />
        {/* El estado global, entre el motor y la interfaz; las pruebas, sobre los datos y el motor. */}
        <rect x="330" y="252" width="550" height="34" rx="9" fill="#5ea8ff" fillOpacity="0.1" stroke="#5ea8ff" strokeOpacity="0.45" strokeDasharray="5 4" />
        <text x="605" y="274" textAnchor="middle" className="cb-svg-item">
          {d.estado}
        </text>
        <rect x="20" y="296" width="550" height="28" rx="9" fill="#3ddc84" fillOpacity="0.1" stroke="#3ddc84" strokeOpacity="0.45" strokeDasharray="5 4" />
        <text x="295" y="315" textAnchor="middle" className="cb-svg-item" fill="#8ff0b8">
          ✓ {d.pruebas}
        </text>
      </svg>
    </div>
  );
}

// ---------- Diagrama 2: el mapa del Capítulo 1 ----------
// En dos mitades, una al lado de la otra: lo que pasa en el mundo real y lo que pasa dentro del juego.
// En el celular van una debajo de la otra (cada mitad es su propio dibujo, así no se achica).
type Nodo = { k: keyof T['bloques']['mapa']['nodos']; tipo?: 'decision' | 'pelea' | 'fin'; salida?: { k: keyof T['bloques']['mapa']['salidas']; tipo: 'temprano' | 'bad'; pelea?: boolean } };
const MUNDO: Nodo[] = [
  { k: 'oficina' },
  { k: 'heladeria' },
  { k: 'cerveza', tipo: 'decision', salida: { k: 'sinBar', tipo: 'temprano' } },
  { k: 'bar' },
  { k: 'beso', tipo: 'decision', salida: { k: 'rechazo', tipo: 'temprano' } },
  { k: 'casa' },
  { k: 'correo', tipo: 'decision', salida: { k: 'correo', tipo: 'temprano' } },
];
const JUEGO: Nodo[] = [
  { k: 'juego' },
  { k: 'cami' },
  { k: 'bastion', tipo: 'pelea' },
  { k: 'grieta' },
  { k: 'invierno' },
  { k: 'rikka' },
  { k: 'fin', tipo: 'fin' },
];
const PASO = 54;
const X = 196;
const ARRIBA = 64;
const ANCHO = 600;
const yDe = (i: number) => ARRIBA + i * PASO;

function Mitad({ m, nodos, n, titulo, children }: { m: T['bloques']['mapa']; nodos: Nodo[]; n: number; titulo: string; children?: ReactNode }) {
  const alto = yDe(nodos.length - 1) + 30;
  return (
    <svg viewBox={`0 0 ${ANCHO} ${alto}`} role="img" aria-label={`${m.t}: ${titulo}`}>
      <text x="16" y="26" className="cb-svg-mitad">
        <tspan className="cb-svg-mitad-n">{n}</tspan> {titulo}
      </text>
      <line x1={X} y1={yDe(0)} x2={X} y2={yDe(nodos.length - 1)} stroke="#3a3a46" strokeWidth="2" />
      {nodos.map((nodo, i) => {
        const y = yDe(i);
        const salida = nodo.salida;
        return (
          <g key={nodo.k}>
            {salida && (
              <g>
                <path d={`M${X + 20} ${y} H${X + 100}`} stroke={salida.tipo === 'bad' ? '#ff4d5e' : '#7a7a86'} strokeWidth="1.6" strokeDasharray="4 4" />
                <rect x={X + 100} y={y - 14} width="230" height="28" rx="14" fill={salida.tipo === 'bad' ? '#2a0c12' : '#15151b'} stroke={salida.tipo === 'bad' ? '#ff4d5e' : '#5a5a66'} />
                <text x={X + 215} y={y + 5} textAnchor="middle" className="cb-svg-salida" fill={salida.tipo === 'bad' ? '#ff9aa6' : '#b4b4be'}>
                  {m.salidas[salida.k]}
                </text>
              </g>
            )}
            {nodo.tipo === 'decision' ? (
              <rect x={X - 11} y={y - 11} width="22" height="22" transform={`rotate(45 ${X} ${y})`} fill="#ff6fa5" />
            ) : nodo.tipo === 'pelea' ? (
              <rect x={X - 12} y={y - 12} width="24" height="24" rx="5" fill="#0e0e13" stroke="#f0b54a" strokeWidth="2.5" />
            ) : nodo.tipo === 'fin' ? (
              <rect x={X - 10} y={y - 10} width="20" height="20" fill="#d9dde4" />
            ) : (
              <circle cx={X} cy={y} r="7" fill="#0e0e13" stroke="#d9dde4" strokeWidth="2" />
            )}
            <text x={X - 26} y={y + 5} textAnchor="end" className={`cb-svg-nodo ${nodo.tipo === 'decision' ? 'es-decision' : ''}`}>
              {m.nodos[nodo.k]}
            </text>
          </g>
        );
      })}
      {children}
    </svg>
  );
}

function Mapa({ m }: { m: T['bloques']['mapa'] }) {
  const iBeso = MUNDO.findIndex((n) => n.k === 'beso');
  const iInvierno = JUEGO.findIndex((n) => n.k === 'invierno');
  const yb = yDe(iBeso);
  return (
    <div className="cb-diagrama cb-mapa">
      <div className="cb-mapa-mitades">
        <Mitad m={m} nodos={MUNDO} n={1} titulo={m.mitades[0]}>
          {/* El beso: propasarse lleva a la pelea con Nikki, y perderla, a un bad end. */}
          <g>
            <path d={`M${X + 10} ${yb + 8} C ${X + 50} ${yb + 30}, ${X + 60} ${yb + 38}, ${X + 100} ${yb + 40}`} fill="none" stroke="#f0b54a" strokeWidth="1.6" strokeDasharray="4 4" />
            <rect x={X + 100} y={yb + 28} width="24" height="24" rx="5" fill="#0e0e13" stroke="#f0b54a" strokeWidth="2.5" />
            <text x={X + 132} y={yb + 45} className="cb-svg-salida" fill="#f6cf85">
              {m.nodos.pelea}
            </text>
            <path d={`M${X + 112} ${yb + 54} V${yb + 68} H${X + 250}`} fill="none" stroke="#ff4d5e" strokeWidth="1.6" strokeDasharray="4 4" />
            <rect x={X + 250} y={yb + 55} width="150" height="26" rx="13" fill="#2a0c12" stroke="#ff4d5e" />
            <text x={X + 325} y={yb + 73} textAnchor="middle" className="cb-svg-salida" fill="#ff9aa6">
              {m.salidas.nikki}
            </text>
          </g>
        </Mitad>
        <Mitad m={m} nodos={JUEGO} n={2} titulo={m.mitades[1]}>
          {/* Los bad ends de dentro del juego, como marcas rojas a lo largo del tramo. */}
          <g>
            <path d={`M${X + 34} ${yDe(0)} V${yDe(iInvierno)}`} stroke="#ff4d5e" strokeWidth="2" strokeOpacity="0.5" />
            {Array.from({ length: 8 }, (_, i) => {
              const y = yDe(0) + ((yDe(iInvierno) - yDe(0)) * i) / 7;
              return (
                <text key={i} x={X + 34} y={y + 5} textAnchor="middle" className="cb-svg-x">
                  ✕
                </text>
              );
            })}
            <text x={X + 56} y={(yDe(0) + yDe(iInvierno)) / 2 + 5} className="cb-svg-salida" fill="#ff9aa6">
              {m.bads}
            </text>
          </g>
        </Mitad>
      </div>
      <ul className="cb-leyenda">
        <li>
          <i className="l-decision" /> {m.leyenda[0]}
        </li>
        <li>
          <i className="l-temprano" /> {m.leyenda[1]}
        </li>
        <li>
          <i className="l-bad" /> {m.leyenda[2]}
        </li>
        <li>
          <i className="l-pelea" /> {m.leyenda[3]}
        </li>
      </ul>
    </div>
  );
}

// ---------- Diagrama 3: el ciclo de un turno ----------
function Ciclo({ pasos }: { pasos: readonly string[] }) {
  const cx = 320;
  const cy = 180;
  const rx = 210;
  const ry = 128;
  const en = (a: number) => ({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) });
  const angulos = pasos.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / pasos.length);
  return (
    <div className="cb-diagrama cb-ciclo">
      <svg viewBox="0 0 640 360" role="img" aria-label={pasos.join(' → ')}>
        <defs>
          <marker id="cb-flecha-oro" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="#c9a75e" />
          </marker>
        </defs>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#2c2c36" strokeWidth="2" />
        {angulos.map((a, i) => {
          // Una flecha corta entre cada par de pasos, sobre la elipse.
          const desde = en(a + 0.42);
          const hasta = en(angulos[(i + 1) % angulos.length] + (i === angulos.length - 1 ? Math.PI * 2 : 0) - 0.42);
          return (
            <path key={i} d={`M${desde.x} ${desde.y} A ${rx} ${ry} 0 0 1 ${hasta.x} ${hasta.y}`} fill="none" stroke="#c9a75e" strokeWidth="2" markerEnd="url(#cb-flecha-oro)" />
          );
        })}
        {angulos.map((a, i) => {
          const p = en(a);
          return (
            <g key={pasos[i]}>
              <rect x={p.x - 98} y={p.y - 19} width="196" height="38" rx="6" fill="#0a0a0d" stroke="#c9a75e" />
              <text x={p.x} y={p.y + 5} textAnchor="middle" className="cb-svg-pixel">
                {pasos[i]}
              </text>
            </g>
          );
        })}
        <text x={cx} y={cy - 2} textAnchor="middle" className="cb-svg-centro">
          dano()
        </text>
        <text x={cx} y={cy + 22} textAnchor="middle" className="cb-svg-item" fill="#9aa0ab">
          batalla.ts · turnos.ts
        </text>
      </svg>
    </div>
  );
}

// ---------- Los personajes ----------
const MAX = { ps: 40, atq: 8, def: 6, vel: 14 };

function Personajes({ t, lang }: { t: T['personajes']; lang: Lang }) {
  return (
    <div className="cb-personajes">
      {FICHAS.map((f) => {
        const p = PERSONAJES.find((x) => x.id === f.id)!;
        const ficha = t.fichas[f.id];
        return (
          <article key={f.id} className="cb-personaje" style={{ '--c': p.color } as CSSProperties}>
            <a className="cb-personaje-captura" href={`/capturas/caja/${f.id}.jpg`} target="_blank" rel="noreferrer">
              <img src={`/capturas/caja/${f.id}.jpg`} alt={ficha.captura} loading="lazy" />
              <span>{ficha.captura}</span>
            </a>
            <div className="cb-personaje-cuerpo">
              <header>
                <img src={`/sprites/${f.id}.webp`} alt="" loading="lazy" />
                <div>
                  <h4>{p.nombre}</h4>
                  <small>{ficha.rol}</small>
                </div>
              </header>
              <dl className="cb-personaje-cifras">
                <div>
                  <dt>{f.lineas}</dt>
                  <dd>{t.lineas}</dd>
                </div>
                <div>
                  <dt>{f.sprites}</dt>
                  <dd>{t.expresiones}</dd>
                </div>
              </dl>
              <ul className="cb-stats">
                {(Object.keys(MAX) as (keyof typeof MAX)[]).map((s) => (
                  <li key={s}>
                    <span>{t.stats[s]}</span>
                    <i style={{ '--v': `${(f.stats[s] / MAX[s]) * 100}%` } as CSSProperties} />
                    <b>{f.stats[s]}</b>
                  </li>
                ))}
              </ul>
              <p className="cb-movs">
                <span>{t.ataques}:</span> {f.ataques[lang].join(', ')}
                <br />
                <span>{t.especial}:</span> ★ {f.especial[lang]}
              </p>
              <p className="cb-nota">{ficha.nota}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ---------- La sección ----------
export function CajaBlanca({ lang }: { lang: Lang }) {
  const t = CAJA[lang];
  const b = t.bloques;
  return (
    <section id="caja" className="seccion caja">
      <img className="tecnico-emblema" src="/marca/tecnico_emblema.webp" alt="" />
      <p className="cb-ojo">
        <span>$</span> git clone project_genesis
      </p>
      <h2>{t.titulo}</h2>
      <p className="seccion-texto">{t.sub}</p>

      <dl className="cb-cifras">
        {t.cifras.map((c) => (
          <div key={c.d}>
            <dt>{c.n}</dt>
            <dd>{c.d}</dd>
          </div>
        ))}
      </dl>

      <div className="cb-bloque">
        <div className="cb-texto">
          <h3>{b.arquitectura.t}</h3>
          {b.arquitectura.p.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Arquitectura d={b.arquitectura.diagrama} />
      </div>

      <div className="cb-bloque cb-dos">
        <div className="cb-texto">
          <h3>{b.escena.t}</h3>
          {b.escena.p.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <img className="cb-mini" src="/capturas/caja/heladeria.jpg" alt="" loading="lazy" />
        </div>
        <Codigo codigo={CODIGO.escena} archivo={b.escena.pie} />
      </div>

      <div className="cb-bloque cb-dos">
        <div className="cb-texto">
          <h3>{b.flujo.t}</h3>
          {b.flujo.p.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Pasos pasos={b.flujo.pasos} />
        </div>
        <Codigo codigo={CODIGO.eleccion} archivo={b.flujo.pie} />
      </div>

      <div className="cb-bloque cb-mapa-bloque">
        <div className="cb-texto">
          <h3>{b.mapa.t}</h3>
          {b.mapa.p.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Mapa m={b.mapa} />
      </div>

      <div className="cb-bloque cb-dos">
        <div className="cb-texto">
          <h3>{b.rpg.t}</h3>
          {b.rpg.p.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Ciclo pasos={b.rpg.ciclo} />
        </div>
        <div className="cb-columna">
          <Codigo codigo={CODIGO.dano} archivo={b.rpg.pie} />
          <img className="cb-mini" src="/capturas/caja/hangar.jpg" alt="" loading="lazy" />
        </div>
      </div>

      <div className="cb-bloque cb-dos">
        <div className="cb-texto">
          <h3>{b.calidad.t}</h3>
          {b.calidad.p.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Pasos pasos={b.calidad.pasos} clase="cb-pasos-verde" />
        </div>
        <Codigo codigo={CODIGO.rutas} archivo={b.calidad.pie} />
      </div>

      <div className="cb-bloque cb-dos">
        <div className="cb-texto">
          <h3>{b.herramientas.t}</h3>
          {b.herramientas.p.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Pasos pasos={b.herramientas.arte} />
        </div>
        <figure className="cb-captura">
          <img src="/capturas/caja/editor.jpg" alt={b.herramientas.editor} loading="lazy" />
          <figcaption>{b.herramientas.editor}</figcaption>
        </figure>
      </div>

      <h3 className="cb-subtitulo">{t.personajes.t}</h3>
      <p className="seccion-texto">{t.personajes.p}</p>
      <Personajes t={t.personajes} lang={lang} />

      <div className="cb-repo">
        <a className="boton" href={ENLACES.github} target="_blank" rel="noreferrer">
          {t.repo}
        </a>
      </div>
    </section>
  );
}

