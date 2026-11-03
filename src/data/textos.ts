// Los textos de la página, en español e inglés. Los de los personajes salen de las fichas de la galería del juego.
export type Lang = 'es' | 'en';

export const DEMO = 'https://project-genesis-yeah.vercel.app/';
export const PAYPAL = 'https://paypal.me/jorgeandresur';
export const ENLACES = {
  pagina: 'https://jorge-urgiles-ruiz.vercel.app/',
  github: 'https://github.com/jorgeandresur18/project_genesis',
  linkedin: 'https://www.linkedin.com/in/jorge-andres-urgiles-ruiz/',
};

export const PERSONAJES = [
  { id: 'jair', nombre: 'Jair', color: '#f0b54a' },
  { id: 'nikki', nombre: 'Nikki', color: '#ff6fa5' },
  { id: 'cami', nombre: 'Cami', color: '#5ea8ff' },
  { id: 'rikka', nombre: 'Rikka', color: '#ef4f5c' },
] as const;

const es = {
  nav: { proyecto: 'El proyecto', personajes: 'Personajes', capturas: 'Capturas', rpg: 'El RPG', autor: 'El autor', apoyar: 'Apoyar' },
  hero: {
    generos: 'Novela visual · Peleas por turnos · Comedia negra',
    tagline:
      'Un programador quemado se queda dormido frente a la computadora y despierta dentro del videojuego que una inteligencia artificial terminó por él. Lo que viene después no es un isekai. O sí, pero de los que pasan factura.',
    jugar: 'Jugar la demo del Capítulo 1',
    conocer: 'Conocer el proyecto',
    gratis: 'Gratis, en el navegador, en español e inglés.',
    aviso: 'Contenido para adultos (+18): humor negro, groserías e insinuación sexual (siempre con censura).',
  },
  proyecto: {
    titulo: 'Una vida en bucle',
    texto: [
      'PROJECT GENESIS es una novela visual de ciencia ficción psicológica, comedia negra y meta-horror. Jair tiene treinta años, un trabajo que no le alcanza y una relación de ocho años con Nikki que no termina de ser nada. Una noche descubre GENESIS, una IA que completa sola el juego que él nunca terminó… y despierta adentro.',
      'Es una historia sobre crear algo y no hacerse cargo. Con chistes, peleas y decisiones que importan.',
    ],
    rasgos: [
      { t: 'Novela visual', d: 'Decisiones que cambian la historia, varios finales (y muchos bad ends con humor), un mapa de decisiones y guardado en cualquier momento.' },
      { t: 'Peleas por turnos', d: 'Un JRPG dentro de la novela: estados, especiales, objetos y jefes. Un homenaje a los clásicos de los 90.' },
      { t: 'Boringram', d: 'El celular de Jair: su red social, sus chats y sus pensamientos, que avanzan con la historia y siguen la hora del mundo real.' },
      { t: 'Modo Retro CRT', d: 'Juega dentro de un televisor de tubo, en 4:3, con botones que funcionan: prende, apaga, sube el volumen y cambia de canal.' },
      { t: 'Bootcamp Genesis', d: 'Un extra para aprender a programar en Coffee, el lenguaje de GENESIS, con un profe que tiene más café que paciencia.' },
    ],
  },
  personajes: {
    titulo: 'Los personajes',
    sub: 'En la novela y en la pelea.',
    fichas: {
      jair: { titulo: 'Modo ahorro de energía', info: 'Treinta años en versión beta y nadie ha reportado el bug. Sin sueldo completo, sin sueño y sin expectativas.' },
      nikki: { titulo: 'Fuera de servicio', info: 'Trabaja en la heladería Dulce Frío. Sin uniforme y sin sonrisa obligatoria: así es cuando nadie le paga por ser amable.' },
      cami: { titulo: 'Piloto sin flota', info: 'Huérfana, rebelde, sin nave y con un tobillo roto. Aun así, la persona más estable de esta historia.' },
      rikka: { titulo: 'Guardiana del puente (sin sueldo)', info: 'Más de quinientos años cuidando un puente y nadie le ha pagado nunca. Jair siente que por fin encontró a su gente.' },
    } as Record<string, { titulo: string; info: string }>,
  },
  capturas: { titulo: 'Capturas', cerrar: 'Cerrar', desliza: 'Desliza para ver más →', items: ['El menú de inicio', 'La noche del bar', 'Antes de pelear', 'La pelea', 'Bootcamp Genesis: el instructor', 'Bootcamp Genesis: los cursos', 'Bootcamp Genesis: la inscripción'] },
  rpg: {
    titulo: 'El RPG',
    texto: [
      'Una mala decisión en el bar y la novela se vuelve una pelea por turnos. Atacar, hablar, esquivar, usar objetos… o pedir perdón.',
      'Cada personaje tiene su repertorio, sus especiales y sus estados: confusión, veneno, parálisis. Y los rivales también saben jugar sucio.',
    ],
    tv: 'Prueba los botones del televisor.',
    mensajes: { turno: '¿Qué hace Jair?', jair: 'Jair usa Puñetazo.', nikki: 'Nikki usa Cachetada.', esquiva: 'Jair esquiva de un salto.', cura: 'Nikki pide otra cerveza y recupera fuerzas.' },
  },
  autor: {
    titulo: 'El autor',
    texto: [
      'PROJECT GENESIS es un proyecto indie hecho por una sola persona: Jorge Andrés Urgilés Ruiz, ingeniero de software. La historia, la dirección, el diseño y la programación salieron de una sola cabeza.',
      'Nació en octubre de 2026, de noche, después del trabajo, como desahogo. Es, a propósito, una historia sobre un hombre que usa una IA para crear personajes, hecha con ayuda de IA: para programar el motor, redactar borradores y generar el arte, mientras llega el día en que artistas lo redibujen.',
    ],
    links: { pagina: 'Mi página', github: 'El juego en GitHub', linkedin: 'LinkedIn' },
  },
  apoyar: {
    titulo: 'Apoya el proyecto',
    globo: [
      'Oye… ¿llegaste hasta aquí abajo?',
      'El presupuesto de este juego no dio ni para el huevo de pascua.',
      'Si te gustó y quieres que el próximo capítulo traiga algo más, puedes apoyarlo con una donación.',
    ],
    donar: 'Donar con',
    gracias: 'Lo que sea ayuda. Y si no, juégalo y cuéntaselo a alguien: eso también.',
  },
  pie: 'Un juego de Jorge Andrés Urgilés Ruiz.',
  idioma: 'EN',
};

const en: typeof es = {
  nav: { proyecto: 'The project', personajes: 'Characters', capturas: 'Screenshots', rpg: 'The RPG', autor: 'The author', apoyar: 'Support' },
  hero: {
    generos: 'Visual novel · Turn-based battles · Dark comedy',
    tagline:
      "A burned-out programmer falls asleep at his computer and wakes up inside the video game an artificial intelligence finished for him. What comes next isn't an isekai. Or it is, but the kind that sends you the bill.",
    jugar: 'Play the Chapter 1 demo',
    conocer: 'About the project',
    gratis: 'Free, in your browser, in Spanish and English.',
    aviso: 'Adult content (18+): dark humor, swearing and sexual innuendo (always censored).',
  },
  proyecto: {
    titulo: 'A Life on Loop',
    texto: [
      "PROJECT GENESIS is a visual novel of psychological sci-fi, dark comedy and meta-horror. Jair is thirty, has a job that doesn't pay enough and an eight-year relationship with Nikki that never quite becomes anything. One night he finds GENESIS, an AI that finishes on its own the game he never did… and he wakes up inside it.",
      "It's a story about creating something and not taking responsibility for it. With jokes, battles and choices that matter.",
    ],
    rasgos: [
      { t: 'Visual novel', d: 'Choices that change the story, several endings (and plenty of funny bad ends), a decision map and saving at any moment.' },
      { t: 'Turn-based battles', d: 'A JRPG inside the novel: status effects, specials, items and bosses. A tribute to the 90s classics.' },
      { t: 'Boringram', d: "Jair's phone: his social network, chats and thoughts, which move along with the story and follow real-world time." },
      { t: 'Retro CRT mode', d: 'Play inside a tube TV, in 4:3, with buttons that work: power, volume and channels.' },
      { t: 'Bootcamp Genesis', d: 'An extra to learn to code in Coffee, the language of GENESIS, with a teacher who has more coffee than patience.' },
    ],
  },
  personajes: {
    titulo: 'The characters',
    sub: 'In the novel and in battle.',
    fichas: {
      jair: { titulo: 'Power-saving mode', info: "Thirty years old, still in beta, and nobody has reported the bug. No full paycheck, no sleep and no expectations." },
      nikki: { titulo: 'Out of service', info: "Works at the Sweet Chill ice cream shop. No uniform and no mandatory smile: this is her when nobody pays her to be nice." },
      cami: { titulo: 'Pilot without a fleet', info: 'Orphan, rebel, no ship and a broken ankle. Still, the most stable person in this story.' },
      rikka: { titulo: 'Guardian of the bridge (unpaid)', info: "More than five hundred years guarding a bridge and nobody has ever paid her. Jair feels he's finally found his people." },
    },
  },
  capturas: { titulo: 'Screenshots', cerrar: 'Close', desliza: 'Swipe to see more →', items: ['The title screen', 'The night at the bar', 'Before the fight', 'The fight', 'Bootcamp Genesis: the instructor', 'Bootcamp Genesis: the courses', 'Bootcamp Genesis: sign-up'] },
  rpg: {
    titulo: 'The RPG',
    texto: [
      'One bad choice at the bar and the novel turns into a turn-based battle. Attack, talk, dodge, use items… or say sorry.',
      'Every character has their own moves, specials and status effects: confusion, poison, paralysis. And the rivals know how to fight dirty too.',
    ],
    tv: 'Try the TV buttons.',
    mensajes: { turno: 'What will Jair do?', jair: 'Jair uses Punch.', nikki: 'Nikki uses Slap.', esquiva: 'Jair jumps out of the way.', cura: 'Nikki orders another beer and gets her strength back.' },
  },
  autor: {
    titulo: 'The author',
    texto: [
      'PROJECT GENESIS is an indie project made by one person: Jorge Andrés Urgilés Ruiz, software engineer. The story, direction, design and code all came out of a single head.',
      "It was born in October 2026, at night, after work, as a way to let off steam. On purpose, it's a story about a man who uses an AI to create characters, made with the help of AI: to code the engine, draft texts and generate the art, until the day artists redraw it.",
    ],
    links: { pagina: 'My website', github: 'The game on GitHub', linkedin: 'LinkedIn' },
  },
  apoyar: {
    titulo: 'Support the project',
    globo: [
      'Hey… you made it all the way down here?',
      "This game's budget didn't even cover the Easter egg.",
      'If you liked it and want the next chapter to bring something more, you can support it with a donation.',
    ],
    donar: 'Donate with',
    gracias: "Anything helps. And if not, play it and tell someone about it: that helps too.",
  },
  pie: 'A game by Jorge Andrés Urgilés Ruiz.',
  idioma: 'ES',
};

export const TEXTOS = { es, en };
