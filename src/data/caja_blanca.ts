// «Caja blanca»: el juego visto por dentro (la demo del Capítulo 1). Las cifras salen del repositorio del juego
// (6 de noviembre de 2026) y el código es real, recortado: src/data/chapters/cap01.json, src/engine/logic.ts,
// src/engine/batalla.ts y tests/routes.test.ts.
import type { Lang } from './textos';

export const CODIGO = {
  escena: `{
  "scene_id": "cap01_019",
  "background": "fondos/dulce_frio_fachada.webp",
  "characters": [
    { "id": "jair",  "sprite": "sprites/jair/base.webp", "pos": "izquierda" },
    { "id": "nikki", "sprite": "sprites/nikki/trabajo_cansada.webp", "pos": "derecha" }
  ],
  "dialogue": {
    "speaker": "Nikki",
    "text": "Oye. Hoy fue un día de mierda. Vamos por una cerveza. Una sola. Lo juro por mi delantal."
  },
  "choices": [
    { "text": "Aceptar", "next": "cap01_020a" },
    { "text": "Decir que estás cansado", "next": "cap01_020b", "set": { "noche": "sin_bar" } }
  ]
}`,
  eleccion: `// Elegir una opción no toca la pantalla: devuelve variables nuevas.
export function applyChoice(choice: Choice, vars: Vars): Vars {
  const out = { ...vars, ...choice.set };
  for (const [k, n] of Object.entries(choice.add ?? {})) {
    out[k] = ((out[k] as number) ?? 0) + n;
  }
  if (choice.equipo) cambiarRopa(out, choice.equipo);
  return out;
}`,
  dano: `// Daño: el ataque contra la defensa, con un poco de azar y a veces un crítico.
export function dano(atacante: Luchador, defensor: Luchador, poder: number,
                     azar: () => number = Math.random) {
  const base = ((atacante.atq + atacante.extra) * poder) / 10
             - (defensor.def + defensor.extraDef) / 2;
  const critico = azar() < 0.08 + esenciaDe(atacante, 'punteria');
  // Quemado: pega a la mitad.
  const n = Math.max(1, Math.round(base * (0.9 + azar() * 0.2)
          * (critico ? 1.5 : 1) * (atacante.quemado > 0 ? 0.5 : 1)));
  return { n, critico };
}`,
  rutas: `const report = validateStory(storyFiles, variables, endings, config,
  (ref) => existsSync(\`public/\${ref}\`));

it('no hay escenas rotas, variables sin declarar ni finales inalcanzables', () => {
  console.info(\`\${report.states} estados recorridos,
    \${report.reachedEndings.size} finales alcanzados\`);
  expect(report.errors).toEqual([]);
});`,
};

const es = {
  nav: 'Caja blanca',
  titulo: 'Caja blanca: cómo está hecho',
  sub: 'Lo que juegas en la demo del Capítulo 1, abierto por dentro. Para quien quiera saber cómo funciona, o conocer a quien lo hizo.',
  cifras: [
    { n: '1.390', d: 'escenas en el Capítulo 1' },
    { n: '21', d: 'decisiones y 13 finales en el Capítulo 1' },
    { n: '55.089', d: 'estados que recorre la prueba de rutas' },
    { n: '+300', d: 'pruebas automáticas' },
    { n: '24.700', d: 'líneas de TypeScript' },
    { n: '556', d: 'commits desde el 25 de octubre de 2026' },
  ],
  bloques: {
    arquitectura: {
      t: 'La historia vive en datos; el motor, en código',
      p: [
        'Ninguna línea de diálogo está escrita dentro de React. Cada escena es un objeto JSON con su fondo, sus personajes, su diálogo y sus opciones. El motor, en TypeScript sin dibujo, lee esos datos y decide qué sigue; la interfaz solo dibuja lo que el motor le dice.',
        'Así se puede escribir un capítulo entero sin tocar el código, traducirlo al inglés en un archivo aparte y probar todas las rutas sin abrir un navegador.',
      ],
      diagrama: {
        datos: 'Datos (JSON)',
        datosItems: ['Capítulos y escenas', 'Inglés', 'Peleas y personajes', 'Boringram'],
        motor: 'Motor (TypeScript)',
        motorItems: ['Avance de escenas', 'Variables y condiciones', 'Turnos del RPG', 'Guardado'],
        ui: 'Interfaz (React)',
        uiItems: ['Escenario y diálogo', 'Decisiones', 'Peleas', 'Celular de Jair'],
        estado: 'Estado global (Zustand) ↔ guardado en el navegador',
        pruebas: 'Las pruebas leen los mismos datos',
      },
    },
    escena: {
      t: 'Una escena, por dentro',
      p: ['Esta es la escena de la heladería donde Nikki invita a una cerveza. La segunda opción guarda una variable que lleva al final temprano «Una noche normal».'],
      pie: 'src/data/chapters/cap01.json',
    },
    flujo: {
      t: 'Cómo avanza la historia',
      p: ['Cada vez que el jugador pasa de escena, el motor sigue los mismos pasos. Elegir una opción es una función pura: recibe las variables y devuelve unas nuevas, sin efectos escondidos. Por eso se puede retroceder, saltar a la próxima decisión o volver a la anterior sin que nada se rompa.'],
      pasos: ['Entrar a la escena', '¿Cumple sus condiciones?', 'Fondo, personajes y diálogo', '¿Hay opciones?', 'Aplicar la elección', 'Siguiente escena, pelea o final'],
      no: 'no: se salta',
      si: 'sí',
      pie: 'src/engine/logic.ts',
    },
    mapa: {
      t: 'El mapa del Capítulo 1',
      p: ['Una vista simplificada de las rutas. Cada rombo es una decisión; las salidas en gris son finales tempranos (la historia termina antes de empezar) y las rojas, bad ends con humor. El juego tiene su propio mapa de decisiones que se va revelando mientras juegas.'],
      nodos: {
        oficina: 'La oficina',
        heladeria: 'La heladería',
        cerveza: '¿Una cerveza?',
        bar: 'La Lechuza',
        beso: 'El beso',
        pelea: 'Pelea con Nikki',
        casa: 'El departamento',
        correo: 'El correo de GRAVITY',
        juego: 'Despierta en el juego',
        cami: 'Cami y el monstruo',
        bastion: 'El Bastión',
        grieta: 'La Grieta',
        invierno: 'El invierno',
        rikka: 'Rikka',
        fin: 'Fin del Capítulo 1',
      },
      salidas: {
        sinBar: 'Una noche normal',
        rechazo: 'La única vez que dijo que no',
        nikki: 'Cachetadas infinitas',
        correo: 'Spam',
      },
      bads: 'y 8 bad ends más en el camino',
      leyenda: ['decisión', 'final temprano', 'bad end', 'pelea'],
    },
    rpg: {
      t: 'El RPG: la lógica separada del dibujo',
      p: [
        'Las peleas corren en un módulo sin interfaz: el orden del turno por velocidad, el daño, los críticos, los especiales y los estados (dormido, congelado, paralizado, confundido, envenenado, quemado; uno a la vez). La pantalla de la pelea solo anima lo que ese módulo decide.',
        'Gracias a eso, un simulador juega miles de peleas con semillas fijas para ajustar la dificultad, y las pruebas fallan si una pelea se vuelve imposible o demasiado fácil.',
      ],
      ciclo: ['Ordenar por velocidad', 'Elegir acción', 'Daño y estados', '¿Alguien cae?', '¿Gana, pierde o sigue?'],
      pie: 'src/engine/batalla.ts',
    },
    calidad: {
      t: 'Cada cambio pasa por pruebas',
      p: ['Antes de cada commit corre la prueba de rutas: recorre todos los estados posibles de la historia y falla si hay una escena rota, una variable sin declarar, una imagen que no existe o un final al que no se puede llegar. Después vienen las pruebas unitarias, las de navegador (Playwright juega peleas como una persona) y la revisión de tipos.'],
      pasos: ['Editar JSON o código', 'Prueba de rutas', 'Pruebas unitarias', 'Navegador (Playwright)', 'Tipos y lint', 'Rama de desarrollo', 'Demo publicada'],
      pie: 'tests/routes.test.ts',
    },
    herramientas: {
      t: 'Herramientas hechas para el juego',
      p: [
        'Un editor de diálogos en vivo, solo en desarrollo: el autor corrige una línea mientras juega, se guarda en un archivo con el original y el texto nuevo, y después se pasa a la historia con su traducción.',
        'Los sprites salen directo de los archivos de Photoshop con scripts de Node y Python: se recortan, se iguala el color de la piel entre expresiones y se generan las hojas de animación del RPG.',
      ],
      editor: 'El editor en vivo: corregir una línea sin salir del juego',
      arte: ['PSD del autor', 'Recorte por capas', 'Igualar la piel', 'Sprites y hojas', 'Juego'],
    },
  },
  personajes: {
    t: 'Los personajes, por dentro',
    p: 'Lo que hay detrás de cada uno en el Capítulo 1: cuánto habla, cuántas expresiones tiene y cómo pelea.',
    lineas: 'líneas en el Capítulo 1',
    expresiones: 'sprites de la novela',
    stats: { ps: 'Vida', atq: 'Ataque', def: 'Defensa', vel: 'Velocidad' },
    especial: 'Especial',
    ataques: 'Ataques',
    fichas: {
      jair: { rol: 'El protagonista', nota: 'Habla casi en cada escena; la mitad, en pensamientos entre paréntesis. En el RPG pega una sola vez por turno, pero siempre puede actuar.', captura: 'En la oficina: la cuenta de todo lo que sabe hacer' },
      nikki: { rol: 'Rival en el bar', nota: 'En el Capítulo 1 no pelea a tu lado: es la rival si Jair se propasa. Está ebria, así que es más lenta y Jair actúa primero.', captura: 'La pelea del bar' },
      cami: { rol: 'Aliada desde el primer día', nota: 'La segunda que más habla del capítulo. En el RPG actúa un turno sí y uno no, y su especial dispara a todos los enemigos.', captura: 'El encuentro con Cami en la dimensión espacial' },
      rikka: { rol: 'Llega al final', nota: 'Aparece en las últimas escenas del capítulo. Pelea desde el Capítulo 2: su espada y una curación para el grupo.', captura: 'Rikka se presenta' },
    } as Record<string, { rol: string; nota: string; captura: string }>,
  },
  repo: 'Ver el código en GitHub',
};

const en: typeof es = {
  nav: 'White box',
  titulo: 'White box: how it’s made',
  sub: 'What you play in the Chapter 1 demo, opened up. For anyone who wants to know how it works, or meet the person who made it.',
  cifras: [
    { n: '1,390', d: 'scenes in Chapter 1' },
    { n: '21', d: 'choices and 13 endings in Chapter 1' },
    { n: '55,089', d: 'states walked by the route test' },
    { n: '300+', d: 'automated tests' },
    { n: '24,700', d: 'lines of TypeScript' },
    { n: '556', d: 'commits since October 25, 2026' },
  ],
  bloques: {
    arquitectura: {
      t: 'The story lives in data; the engine, in code',
      p: [
        'Not a single line of dialogue is written inside React. Every scene is a JSON object with its background, characters, dialogue and choices. The engine, plain TypeScript with no drawing, reads that data and decides what comes next; the interface only draws what the engine tells it to.',
        'That way a whole chapter can be written without touching the code, translated to English in a separate file, and every route can be tested without opening a browser.',
      ],
      diagrama: {
        datos: 'Data (JSON)',
        datosItems: ['Chapters and scenes', 'English', 'Battles and characters', 'Boringram'],
        motor: 'Engine (TypeScript)',
        motorItems: ['Scene flow', 'Variables and conditions', 'RPG turns', 'Saving'],
        ui: 'Interface (React)',
        uiItems: ['Stage and dialogue', 'Choices', 'Battles', 'Jair’s phone'],
        estado: 'Global state (Zustand) ↔ saved in the browser',
        pruebas: 'Tests read the same data',
      },
    },
    escena: {
      t: 'A scene, inside',
      p: ['This is the ice cream shop scene where Nikki asks Jair out for a beer. The second choice stores a variable that leads to the early ending “A Normal Night”. (The data is in Spanish; the English lives in its own file.)'],
      pie: 'src/data/chapters/cap01.json',
    },
    flujo: {
      t: 'How the story moves',
      p: ['Every time the player moves to a scene, the engine follows the same steps. Picking a choice is a pure function: it takes the variables and returns new ones, with no hidden side effects. That’s why you can rewind, skip to the next choice or go back to the last one without breaking anything.'],
      pasos: ['Enter the scene', 'Are its conditions met?', 'Background, characters, dialogue', 'Any choices?', 'Apply the choice', 'Next scene, battle or ending'],
      no: 'no: skip it',
      si: 'yes',
      pie: 'src/engine/logic.ts',
    },
    mapa: {
      t: 'The Chapter 1 map',
      p: ['A simplified view of the routes. Each diamond is a choice; grey exits are early endings (the story ends before it begins) and red ones are funny bad ends. The game has its own decision map that reveals itself as you play.'],
      nodos: {
        oficina: 'The office',
        heladeria: 'The ice cream shop',
        cerveza: 'One beer?',
        bar: 'The Owl bar',
        beso: 'The kiss',
        pelea: 'Fight with Nikki',
        casa: 'The apartment',
        correo: 'The GRAVITY email',
        juego: 'Wakes up in the game',
        cami: 'Cami and the monster',
        bastion: 'The Bastion',
        grieta: 'The Rift',
        invierno: 'The winter',
        rikka: 'Rikka',
        fin: 'End of Chapter 1',
      },
      salidas: {
        sinBar: 'A Normal Night',
        rechazo: 'The Only Time He Said No',
        nikki: 'Infinite Slaps',
        correo: 'Spam',
      },
      bads: 'and 8 more bad ends along the way',
      leyenda: ['choice', 'early ending', 'bad end', 'battle'],
    },
    rpg: {
      t: 'The RPG: logic apart from drawing',
      p: [
        'Battles run in a module with no interface: turn order by speed, damage, critical hits, specials and status effects (asleep, frozen, paralyzed, confused, poisoned, burned; one at a time). The battle screen only animates what that module decides.',
        'Because of that, a simulator plays thousands of battles with fixed seeds to tune the difficulty, and the tests fail if a battle becomes impossible or too easy.',
      ],
      ciclo: ['Sort by speed', 'Pick an action', 'Damage and status', 'Did anyone fall?', 'Win, lose or go on?'],
      pie: 'src/engine/batalla.ts',
    },
    calidad: {
      t: 'Every change goes through tests',
      p: ['Before every commit the route test runs: it walks every possible state of the story and fails on a broken scene, an undeclared variable, a missing image or an ending nobody can reach. Then come the unit tests, the browser tests (Playwright plays battles like a person would) and the type check.'],
      pasos: ['Edit JSON or code', 'Route test', 'Unit tests', 'Browser (Playwright)', 'Types and lint', 'Development branch', 'Published demo'],
      pie: 'tests/routes.test.ts',
    },
    herramientas: {
      t: 'Tools built for the game',
      p: [
        'A live dialogue editor, only in development: the author fixes a line while playing, it’s saved to a file with the original and the new text, and later it goes into the story with its translation.',
        'The sprites come straight from the Photoshop files through Node and Python scripts: they’re cut out, the skin color is matched across expressions and the RPG animation sheets are generated.',
      ],
      editor: 'The live editor: fixing a line without leaving the game',
      arte: ['Author’s PSD', 'Cut by layers', 'Match the skin', 'Sprites and sheets', 'Game'],
    },
  },
  personajes: {
    t: 'The characters, inside',
    p: 'What’s behind each of them in Chapter 1: how much they talk, how many expressions they have and how they fight.',
    lineas: 'lines in Chapter 1',
    expresiones: 'novel sprites',
    stats: { ps: 'HP', atq: 'Attack', def: 'Defense', vel: 'Speed' },
    especial: 'Special',
    ataques: 'Attacks',
    fichas: {
      jair: { rol: 'The protagonist', nota: 'He talks in almost every scene; half of it in thoughts between parentheses. In the RPG he hits once per turn, but he can always act.', captura: 'At the office: the list of everything he can do' },
      nikki: { rol: 'Rival at the bar', nota: 'In Chapter 1 she doesn’t fight by your side: she’s the rival if Jair crosses the line. She’s drunk, so she’s slower and Jair goes first.', captura: 'The bar fight' },
      cami: { rol: 'Ally from day one', nota: 'The second most talkative in the chapter. In the RPG she acts every other turn, and her special shoots every enemy.', captura: 'Meeting Cami in the space dimension' },
      rikka: { rol: 'Arrives at the end', nota: 'She shows up in the last scenes of the chapter. She fights from Chapter 2 on: her sword and a heal for the party.', captura: 'Rikka introduces herself' },
    },
  },
  repo: 'See the code on GitHub',
};

export const CAJA: Record<Lang, typeof es> = { es, en };

// Los datos de cada personaje en el juego: líneas en el Capítulo 1, sprites de la novela y su ficha del RPG
// (src/data/rpg/personajes.json; Nikki, la del bar, con la velocidad bajada por estar ebria).
export const FICHAS = [
  { id: 'jair', lineas: 460, sprites: 11, stats: { ps: 30, atq: 5, def: 3, vel: 8 }, ataques: { es: ['Puñetazo'], en: ['Punch'] }, especial: { es: 'Ráfaga de puños (6 golpes)', en: 'Fist Flurry (6 hits)' } },
  { id: 'nikki', lineas: 104, sprites: 24, stats: { ps: 30, atq: 5, def: 2, vel: 4 }, ataques: { es: ['Cachetada', 'Cachetada de revés', 'Beso confusión'], en: ['Slap', 'Backhand Slap', 'Confusion Kiss'] }, especial: { es: 'Ráfaga de cachetadas infinitas', en: 'Infinite Slap Barrage' } },
  { id: 'cami', lineas: 245, sprites: 32, stats: { ps: 34, atq: 6, def: 4, vel: 12 }, ataques: { es: ['Blaster'], en: ['Blaster'] }, especial: { es: 'Lluvia de plasma (8 golpes, a todos)', en: 'Plasma Rain (8 hits, all enemies)' } },
  { id: 'rikka', lineas: 23, sprites: 32, stats: { ps: 32, atq: 6, def: 4, vel: 10 }, ataques: { es: ['Espada', 'Curación'], en: ['Sword', 'Heal'] }, especial: { es: 'Tajo de primavera (3 golpes)', en: 'Spring Slash (3 hits)' } },
] as const;
