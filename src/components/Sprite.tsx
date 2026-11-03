import { useEffect, useState, type CSSProperties } from 'react';

/** Una animación de una hoja de sprites del juego: una fila de cuadros, a su velocidad. */
export interface Anim {
  row: number;
  frames: number;
  fps: number;
  loop?: boolean;
}

/** Una hoja de sprites: la imagen, su tamaño y el de cada cuadro. */
export interface Hoja {
  src: string;
  w: number;
  h: number;
  cuadroW: number;
  cuadroH: number;
}

/**
 * Un sprite animado en pixel art. `escala`: cuántos px de pantalla por pixel de la hoja. `espejo` lo da vuelta (los
 * héroes miran a la izquierda). Si la animación no repite, se queda en el último cuadro; cambiar `vez` la reinicia.
 */
export function Sprite({
  hoja,
  anim,
  escala,
  espejo = false,
  vez = 0,
  className,
  style,
}: {
  hoja: Hoja;
  anim: Anim;
  escala: number;
  espejo?: boolean;
  vez?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [cuadro, setCuadro] = useState(0);
  useEffect(() => {
    setCuadro(0);
    const id = setInterval(
      () => setCuadro((c) => (c + 1 >= anim.frames ? (anim.loop === false ? c : 0) : c + 1)),
      1000 / anim.fps,
    );
    return () => clearInterval(id);
  }, [anim.row, anim.frames, anim.fps, anim.loop, vez]);
  const columnas = Math.max(1, Math.floor(hoja.w / hoja.cuadroW));
  return (
    <div
      className={`sprite ${className ?? ''}`}
      style={{
        width: hoja.cuadroW * escala,
        height: hoja.cuadroH * escala,
        backgroundImage: `url(${hoja.src})`,
        backgroundSize: `${hoja.w * escala}px ${hoja.h * escala}px`,
        // Si la animación tiene más cuadros que la fila, sigue en la fila de abajo (como en las hojas del juego).
        backgroundPosition: `${-(cuadro % columnas) * hoja.cuadroW * escala}px ${-(anim.row + Math.floor(cuadro / columnas)) * hoja.cuadroH * escala}px`,
        transform: espejo ? 'scaleX(-1)' : undefined,
        ...style,
      }}
    />
  );
}
