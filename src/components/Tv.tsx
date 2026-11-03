import { useRef, useState, type ReactNode } from 'react';

const CANALES = 5;

/**
 * El televisor de tubo del modo Retro CRT del juego: la pantalla en 4:3 con líneas de barrido y, abajo, el parlante,
 * las entradas de video y audio con sus cables, el logo y los botones. POWER apaga y prende la pantalla (como un
 * tubo), − VOL + muestra las barras verdes y − CH + y TV/VIDEO pasan entre AUX (la pelea) y canales sin señal.
 */
export function Tv({ children }: { children: ReactNode }) {
  const [prendida, setPrendida] = useState(true);
  const [transicion, setTransicion] = useState<null | 'apagando' | 'prendiendo'>(null);
  const [canal, setCanal] = useState(0);
  const [volumen, setVolumen] = useState(0.5);
  const [osd, setOsd] = useState<null | { tipo: 'canal' | 'volumen'; n: number }>({ tipo: 'canal', n: 0 });
  const reloj = useRef<number | undefined>(undefined);

  const mostrar = (o: { tipo: 'canal' | 'volumen'; n: number }) => {
    setOsd(o);
    window.clearTimeout(reloj.current);
    reloj.current = window.setTimeout(() => setOsd(null), 2400);
  };
  const power = () => {
    if (transicion) return;
    if (prendida) {
      setOsd(null);
      setTransicion('apagando');
      setTimeout(() => {
        setPrendida(false);
        setTransicion(null);
      }, 1200);
    } else {
      setPrendida(true);
      setTransicion('prendiendo');
      setTimeout(() => {
        setTransicion(null);
        mostrar({ tipo: 'canal', n: canal });
      }, 650);
    }
  };
  const cambiarCanal = (n: number) => {
    if (!prendida || transicion) return;
    setCanal(n);
    mostrar({ tipo: 'canal', n });
  };
  const subirVolumen = (paso: number) => {
    if (!prendida || transicion) return;
    const v = Math.round(Math.min(1, Math.max(0, volumen + paso)) * 10) / 10;
    setVolumen(v);
    mostrar({ tipo: 'volumen', n: v });
  };
  const boton = (texto: string, accion: () => void, clase = 'tv-boton') => (
    <button type="button" className={clase} aria-label={texto} title={texto} onClick={accion} />
  );

  return (
    <div className="tv">
      <div className={`tv-pantalla ${prendida ? '' : 'sin-imagen'} ${transicion ?? ''}`}>
        <div className="tv-imagen">{children}</div>
        {prendida && canal > 0 && <span className="tv-nieve" aria-hidden />}
        {osd && prendida && (
          <div className="tv-osd" aria-live="polite">
            {osd.tipo === 'canal' ? (
              <b>{osd.n === 0 ? 'AUX' : `CH ${String(osd.n).padStart(2, '0')}`}</b>
            ) : (
              <>
                <b>VOL</b>
                <span className="tv-osd-barras">
                  {Array.from({ length: 20 }, (_, i) => (
                    <i key={i} className={i < Math.round(osd.n * 20) ? 'llena' : ''} />
                  ))}
                </span>
              </>
            )}
          </div>
        )}
        <span className="tv-crt" aria-hidden />
      </div>
      <div className="tv-panel">
        <span className="tv-izquierda" aria-hidden>
          <span className="tv-parlante" />
          {/* Las entradas de video y audio, con sus cables enchufados (por ahí entra el juego), y los audífonos. */}
          <span className="tv-entradas">
            <span className="tv-jack">
              <small>VIDEO</small>
              <i className="tv-rca amarillo" />
            </span>
            <span className="tv-jack">
              <small>L-AUDIO-R</small>
              <span className="tv-par">
                <i className="tv-rca blanco" />
                <i className="tv-rca rojo" />
              </span>
            </span>
            <span className="tv-jack">
              <small>PHONES</small>
              <i className="tv-audifonos" />
            </span>
          </span>
        </span>
        <img className="tv-logo" src="/marca/logo_tv.webp" alt="PROJECT GENESIS" />
        <span className="tv-botones">
          <span className="tv-control tv-vol">
            <span className="tv-par">
              {boton('VOL −', () => subirVolumen(-0.1))}
              {boton('VOL +', () => subirVolumen(0.1))}
            </span>
            <small>− VOL +</small>
          </span>
          <span className="tv-control">
            <span className="tv-par">
              {boton('CH −', () => cambiarCanal((canal + CANALES) % (CANALES + 1)))}
              {boton('CH +', () => cambiarCanal((canal + 1) % (CANALES + 1)))}
            </span>
            <small>− CH +</small>
          </span>
          <span className="tv-control">
            {boton('TV/VIDEO', () => cambiarCanal(canal === 0 ? 1 : 0))}
            <small>TV/VIDEO</small>
          </span>
          <span className="tv-control">
            <span className="tv-par">
              {boton('POWER', power, 'tv-boton tv-encendido')}
              <i className={`tv-led ${prendida ? 'prendida' : ''}`} />
            </span>
            <small>POWER</small>
          </span>
        </span>
      </div>
    </div>
  );
}
