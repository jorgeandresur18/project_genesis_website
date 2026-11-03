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
  // Los cables se desenchufan con un clic. Video: sin imagen (queda AUX). Audio: muestra qué lado se oye.
  const [cables, setCables] = useState({ video: true, izq: true, der: true });
  const [brilla, setBrilla] = useState(0);
  const [aviso, setAviso] = useState<string | null>(null);
  const tirar = (k: 'video' | 'izq' | 'der') => {
    const n = { ...cables, [k]: !cables[k] };
    setCables(n);
    if (k !== 'video') {
      setAviso(n.izq && n.der ? 'L · R' : n.izq ? 'L ·  ' : n.der ? '  · R' : 'MUTE');
      window.clearTimeout(reloj.current);
      reloj.current = window.setTimeout(() => setAviso(null), 2200);
    }
  };
  const sinVideo = !cables.video && canal === 0;

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
        {prendida && sinVideo && <span className="tv-sin-video" aria-hidden />}
        {prendida && sinVideo && !osd && !transicion && <b className="tv-osd">AUX</b>}
        {prendida && aviso && <b className="tv-osd tv-osd-audio">AUDIO {aviso}</b>}
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
        <span className="tv-izquierda">
          <span className="tv-parlante" />
          {/* Las entradas de video y audio, con sus cables enchufados (por ahí entra el juego), y los audífonos. */}
          <span className="tv-entradas">
            <span className="tv-jack">
              <small>VIDEO</small>
              <button type="button" className={`tv-rca amarillo ${cables.video ? '' : 'suelto'}`} aria-label="VIDEO" aria-pressed={cables.video} onClick={() => tirar('video')} />
            </span>
            <span className="tv-jack">
              <small>L-AUDIO-R</small>
              <span className="tv-par">
                <button type="button" className={`tv-rca blanco ${cables.izq ? '' : 'suelto'}`} aria-label="AUDIO L" aria-pressed={cables.izq} onClick={() => tirar('izq')} />
                <button type="button" className={`tv-rca rojo ${cables.der ? '' : 'suelto'}`} aria-label="AUDIO R" aria-pressed={cables.der} onClick={() => tirar('der')} />
              </span>
            </span>
            <span className="tv-jack">
              <small>PHONES</small>
              <i className="tv-audifonos" />
            </span>
          </span>
        </span>
        {/* El emblema: al tocarlo brilla como una chapa de metal. */}
        <button type="button" className="tv-emblema" aria-label="PROJECT GENESIS" onClick={() => setBrilla((n) => n + 1)}>
          <img className="tv-logo" src="/marca/logo_tv.webp" alt="" />
          {brilla > 0 && <i key={brilla} className="tv-emblema-brillo" />}
        </button>
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
