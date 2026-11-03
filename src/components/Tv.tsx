import { useState, type ReactNode } from 'react';

/**
 * El televisor de tubo del modo Retro CRT del juego, en chico: la pantalla en 4:3 con líneas de barrido, el logo y
 * los botones. POWER apaga y prende la pantalla (como un tubo); CH pasa a un canal sin señal y vuelve a AUX.
 */
export function Tv({ children }: { children: ReactNode }) {
  const [prendida, setPrendida] = useState(true);
  const [transicion, setTransicion] = useState<null | 'apagando' | 'prendiendo'>(null);
  const [canal, setCanal] = useState(0);
  const [osd, setOsd] = useState<string | null>('AUX');

  const mostrar = (t: string) => {
    setOsd(t);
    window.clearTimeout((mostrar as unknown as { id?: number }).id);
    (mostrar as unknown as { id?: number }).id = window.setTimeout(() => setOsd(null), 2200);
  };
  const power = () => {
    if (transicion) return;
    if (prendida) {
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
        mostrar(canal === 0 ? 'AUX' : `CH 0${canal}`);
      }, 650);
    }
  };
  const cambiar = (paso: number) => {
    if (!prendida || transicion) return;
    const n = (canal + paso + 4) % 4;
    setCanal(n);
    mostrar(n === 0 ? 'AUX' : `CH 0${n}`);
  };

  return (
    <div className="tv">
      <div className={`tv-pantalla ${prendida ? '' : 'sin-imagen'} ${transicion ?? ''}`}>
        <div className="tv-imagen">{children}</div>
        {prendida && canal > 0 && <span className="tv-nieve" aria-hidden />}
        {osd && prendida && <b className="tv-osd">{osd}</b>}
        <span className="tv-crt" aria-hidden />
      </div>
      <div className="tv-panel">
        <span className="tv-parlante" aria-hidden />
        <img className="tv-logo" src="/marca/logo_tv.webp" alt="PROJECT GENESIS" />
        <span className="tv-botones">
          <span className="tv-control">
            <span className="tv-par">
              <button type="button" className="tv-boton" aria-label="CH −" onClick={() => cambiar(-1)} />
              <button type="button" className="tv-boton" aria-label="CH +" onClick={() => cambiar(1)} />
            </span>
            <small>− CH +</small>
          </span>
          <span className="tv-control">
            <span className="tv-par">
              <button type="button" className="tv-boton tv-encendido" aria-label="POWER" onClick={power} />
              <i className={`tv-led ${prendida ? 'prendida' : ''}`} />
            </span>
            <small>POWER</small>
          </span>
        </span>
      </div>
    </div>
  );
}
