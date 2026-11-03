# PROJECT GENESIS — sitio web

La página de presentación de **PROJECT GENESIS**, una novela visual con peleas por turnos (+18).
El juego: https://project-genesis-yeah.vercel.app/ · Repositorio del juego: https://github.com/jorgeandresur18/project_genesis

Hecha con React + Vite + TypeScript, en español e inglés (según el navegador, con un botón para cambiar).

## Secciones
- **Portada:** el logo, de qué trata y el botón a la demo del Capítulo 1.
- **El proyecto:** la premisa y lo que tiene (novela visual, RPG, Boringram, modo Retro CRT, Bootcamp Genesis).
- **Personajes:** Jair, Nikki, Cami y Rikka, con su sprite de la novela y su sprite animado del RPG.
- **Capturas:** del juego y del Bootcamp; en el celular, un carrusel con capturas tomadas en un celular.
- **El RPG:** una pelea en bucle (Jair contra Nikki en el bar) dentro del televisor del modo Retro CRT, con POWER y CH que funcionan.
- **El autor** y **Apoyar:** Nikki con su globo, como en el easter egg del juego, y el botón de PayPal.

El fondo es el mismo del menú de inicio del juego (`src/components/TitleBackground.tsx`).

## Comandos
```
npm install
npm run dev      # en local
npm run build    # la versión para publicar, en dist/
```

En Vercel: importar el repositorio; el framework se detecta solo (Vite).

Los assets (`public/`) salen del juego: los sprites, las hojas del RPG, el fondo del bar, los logos y las capturas.
