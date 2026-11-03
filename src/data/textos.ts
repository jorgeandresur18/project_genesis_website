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
  nav: { proyecto: 'El proyecto', personajes: 'Personajes', capturas: 'Capturas', boringram: 'Boringram', bootcamp: 'Bootcamp', rpg: 'El RPG', autor: 'El autor', apoyar: 'Apoyar' },
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
      { t: 'Modo Retro CRT', d: 'Juega dentro de un televisor de tubo, en 4:3, con botones que funcionan: prende, apaga, sube el volumen y cambia de canal.', dCel: 'En el celular, la pantalla en 4:3 con el efecto de tubo: líneas de barrido, un leve desenfoque y parpadeo. El televisor con sus botones está en la computadora.' },
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
      rikka: { titulo: 'Sacerdotisa de la Primavera', info: 'Sacerdotisa y guardiana del puente al reino de la Primavera. Más de quinientos años en el puesto y nadie le ha pagado nunca. Jair siente que por fin encontró a su gente.' },
    } as Record<string, { titulo: string; info: string }>,
  },
  capturas: { titulo: 'Capturas', cerrar: 'Cerrar', desliza: 'Desliza para ver más →', items: ['El menú de inicio', 'La noche del bar', 'Antes de pelear', 'La pelea', 'Un especial: Cañón de blaster', 'El rayo del cañón', 'El barrido del cañón', 'Modo Retro CRT: la novela en el televisor del cuarto de Jair'], itemsCel: { crt: 'Modo Retro CRT en el celular: 4:3 con el efecto de tubo' } as Record<string, string> },
  boringram: {
    texto: ['El celular de Jair. Su red social, sus chats y sus pensamientos avanzan con la historia y siguen la hora del mundo real: mientras él vive días dentro del juego, allá pasan minutos.', 'Dale me gusta, comenta, mira las historias de Nikki o enciende la linterna. Nadie le da me gusta a Jair, pero tú puedes.'],
    items: ['El inicio', 'La historia de Nikki', 'El perfil de Jair', 'Los chats'],
  },
  bootcamp: {
    texto: [
      'Un extra dentro del juego: una parodia de los bootcamps de programación. Entras sin saber nada y sales como «desarrollador explotado, con sobrepeso y propenso a diabetes tipo 2».',
      'Jair es el instructor y enseña Coffee, el lenguaje de GENESIS (un JavaScript con otro nombre). Cada clase tiene una charla en el aula, un ejercicio en el IDE, con huecos que llenar y una terminal que se burla de ti, y estrellas según cuántas veces no compiló. Los ejercicios son de verdad: lo que aprendes sirve fuera del juego.',
      'Rikka explica con metáforas de su reino, Nikki pone el humor negro y la crítica laboral, y Cami… Cami no se calla. GENESIS tiene su botón en el IDE, pero se quedó sin tokens haciendo este bootcamp.',
      'Cada nivel se abre al terminar el capítulo de la historia que le toca y acaba con un diploma con tu nombre, sin validez académica, legal ni emocional, que puedes descargar y compartir.',
    ],
    jugar: 'Ya está en la demo: termina el Capítulo 1 y entra desde el botón <Bootcamp> Genesis del menú principal. El nivel Trainee te espera.',
    nivelesTitulo: 'Los niveles',
    niveles: [
      { n: 'Trainee', d: '9 clases: variables, funciones, bucles, listas, objetos y tu primer bug ajeno.', e: 'Disponible en la demo' },
      { n: 'Junior', d: 'Clases, herencia y async. Responsabilidades de senior, sueldo de trainee. Se abre con el Capítulo 2.', e: 'Próximamente' },
      { n: 'Semi-senior', d: 'Estructuras de datos y algoritmos. Se abre con el Capítulo 3.', e: 'Próximamente' },
      { n: 'Senior', d: 'Frameworks y arquitectura. Se abre con el Capítulo 4.', e: 'Próximamente' },
      { n: 'Desarrollador explotado', d: 'La graduación. Con foto. Se abre con el Capítulo 5.', e: 'Próximamente' },
    ],
    aviso: 'Ojo: las clases traen chistes subidos de tono. Dobles sentidos, groserías y bromas sobre el cuerpo (casi siempre de Cami, y casi siempre sobre el trasero de Rikka). Nada explícito, pero mejor no lo abras en la oficina… aunque la oficina sea justo de lo que se burla.',
    items: ['El instructor, con el sueldo atrasado', 'La inscripción: tu nombre, para el diploma', 'Los niveles: de Trainee a explotado', 'Clase 1: Jair y la pizarra', 'Clase 1: variables (y dobles sentidos)', 'Clase 3: condicionales, según Cami', 'Clase 7: listas, según Nikki', 'El IDE: no compila', 'GENESIS, sin tokens'],
  },
  rpg: {
    titulo: 'El RPG',
    texto: [
      'Una mala decisión en el bar y la novela se vuelve una pelea por turnos. Atacar, hablar, esquivar, usar objetos… o pedir perdón.',
      'Cada personaje tiene su repertorio, sus especiales y sus estados: confusión, veneno, parálisis. Y los rivales también saben jugar sucio.',
    ],
    tv: 'Prueba los botones del televisor. Y sí: los cables se desenchufan.',
    mensajes: { turno: '¿Qué hace Jair?', jair: 'Jair usa Puñetazo.', nikki: 'Nikki usa Cachetada.', esquiva: 'Jair esquiva de un salto.', cura: 'Nikki pide otra cerveza y recupera fuerzas.', comandos: ['Atacar', 'Hablar', 'Esquivar', 'Objetos', 'Huir'], desc: 'Elige uno de tus ataques y a quién. Puede fallar: a veces el rival esquiva.' },
  },
  autor: {
    titulo: 'El autor',
    texto: [
      'PROJECT GENESIS es un proyecto indie hecho por una sola persona: Jorge Andrés Urgilés Ruiz, ingeniero de software. La historia, la dirección, el diseño y la programación salieron de una sola cabeza. Nació en octubre de 2026, de noche, después del trabajo, como desahogo.',
      'Lo técnico: la historia vive en datos y el motor en código. Una novela visual y un RPG por turnos que corren en el navegador, sin instalar nada, con un celular que sigue la hora del mundo real y cada ruta y cada final comprobados automáticamente. Desarrollo web llevado hasta donde no debería llegar.',
      'Lo artístico: una voz antes que una estética. Humor negro que incomoda en vez de premiar, el contraste entre una fantasía brillante y una vida real sudada, y los juegos y la música de los 80, los 90 y los 2000 como forma de hablar de la soledad.',
      'Lo filosófico: una pregunta de fondo. ¿Qué le debe un creador a lo que creó? Una vida en bucle, como la de Sísifo; criaturas que descubren que su dios es solo un hombre; y la libertad que se teme justo cuando por fin se tiene.',
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
  arriba: 'Volver arriba',
  idioma: 'EN',
};

const en: typeof es = {
  nav: { proyecto: 'The project', personajes: 'Characters', capturas: 'Screenshots', boringram: 'Boringram', bootcamp: 'Bootcamp', rpg: 'The RPG', autor: 'The author', apoyar: 'Support' },
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
      { t: 'Retro CRT mode', d: 'Play inside a tube TV, in 4:3, with buttons that work: power, volume and channels.', dCel: 'On your phone, the screen in 4:3 with the tube effect: scanlines, a slight blur and flicker. The TV with its buttons is on desktop.' },
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
      rikka: { titulo: 'Priestess of Spring', info: "Priestess and guardian of the bridge to the kingdom of Spring. More than five hundred years on the job and nobody has ever paid her. Jair feels he's finally found his people." },
    },
  },
  capturas: { titulo: 'Screenshots', cerrar: 'Close', desliza: 'Swipe to see more →', items: ['The title screen', 'The night at the bar', 'Before the fight', 'The fight', 'A special: Blaster Cannon', 'The cannon beam', 'The cannon sweep', "Retro CRT mode: the novel on the TV in Jair's room"], itemsCel: { crt: 'Retro CRT mode on mobile: 4:3 with the tube effect' } },
  boringram: {
    texto: ["Jair's phone. His social network, chats and thoughts move along with the story and follow real-world time: while he lives days inside the game, only minutes pass out there.", "Like posts, comment, watch Nikki's stories or turn on the flashlight. Nobody likes Jair's posts, but you can."],
    items: ['The feed', "Nikki's story", "Jair's profile", 'The chats'],
  },
  bootcamp: {
    texto: [
      "An extra inside the game: a parody of coding bootcamps. You go in knowing nothing and come out as an “overworked developer, overweight and prone to type 2 diabetes.”",
      "Jair is the instructor and teaches Coffee, the language of GENESIS (JavaScript under another name). Every class has a talk in the classroom, an exercise in the IDE, with blanks to fill and a terminal that makes fun of you, and stars based on how many times it didn't compile. The exercises are real: what you learn works outside the game.",
      "Rikka explains with metaphors from her kingdom, Nikki brings the dark humor and the jabs at work life, and Cami… Cami won't shut up. GENESIS has its own button in the IDE, but it ran out of tokens making this bootcamp.",
      'Each level unlocks when you finish its chapter of the story and ends with a diploma with your name on it, with no academic, legal or emotional value, that you can download and share.',
    ],
    jugar: "It's already in the demo: finish Chapter 1 and open it from the <Bootcamp> Genesis button on the main menu. The Trainee level is waiting.",
    nivelesTitulo: 'The levels',
    niveles: [
      { n: 'Trainee', d: '9 classes: variables, functions, loops, lists, objects and your first inherited bug.', e: 'Available in the demo' },
      { n: 'Junior', d: 'Classes, inheritance and async. Senior responsibilities, trainee salary. Unlocks with Chapter 2.', e: 'Coming soon' },
      { n: 'Semi-senior', d: 'Data structures and algorithms. Unlocks with Chapter 3.', e: 'Coming soon' },
      { n: 'Senior', d: 'Frameworks and architecture. Unlocks with Chapter 4.', e: 'Coming soon' },
      { n: 'Overworked developer', d: 'Graduation. With a photo. Unlocks with Chapter 5.', e: 'Coming soon' },
    ],
    aviso: "Heads up: the classes come with raunchy jokes. Double meanings, swearing and jokes about bodies (mostly from Cami, and mostly about Rikka's butt). Nothing explicit, but maybe don't open it at the office… even if the office is exactly what it makes fun of.",
    items: ['The instructor, with his overdue paycheck', 'Sign-up: your name, for the diploma', 'The levels: from Trainee to overworked', 'Class 1: Jair at the whiteboard', 'Class 1: variables (and double meanings)', "Class 3: conditionals, according to Cami", "Class 7: lists, according to Nikki", "The IDE: it doesn't compile", 'GENESIS, out of tokens'],
  },
  rpg: {
    titulo: 'The RPG',
    texto: [
      'One bad choice at the bar and the novel turns into a turn-based battle. Attack, talk, dodge, use items… or say sorry.',
      'Every character has their own moves, specials and status effects: confusion, poison, paralysis. And the rivals know how to fight dirty too.',
    ],
    tv: 'Try the TV buttons. And yes: you can unplug the cables.',
    mensajes: { turno: 'What will Jair do?', jair: 'Jair uses Punch.', nikki: 'Nikki uses Slap.', esquiva: 'Jair jumps out of the way.', cura: 'Nikki orders another beer and gets her strength back.', comandos: ['Attack', 'Talk', 'Dodge', 'Items', 'Run'], desc: 'Pick one of your attacks and a target. It can miss: sometimes the rival dodges.' },
  },
  autor: {
    titulo: 'The author',
    texto: [
      'PROJECT GENESIS is an indie project made by one person: Jorge Andrés Urgilés Ruiz, software engineer. The story, direction, design and code all came out of a single head. It was born in October 2026, at night, after work, as a way to let off steam.',
      'The technical side: the story lives in data and the engine in code. A visual novel and a turn-based RPG that run in the browser, nothing to install, with a phone that follows real-world time and every route and ending checked automatically. Web development taken where it was never meant to go.',
      'The artistic side: a voice before a style. Dark humor that makes you uncomfortable instead of rewarding you, the contrast between a shiny fantasy and a sweaty real life, and the games and music of the 80s, 90s and 2000s as a way of talking about loneliness.',
      'The philosophical side: one question underneath it all. What does a creator owe to what they created? A life on loop, like Sisyphus; creatures who find out their god is just a man; and the freedom you fear right when you finally have it.',
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
  arriba: 'Back to top',
  idioma: 'ES',
};

export const TEXTOS = { es, en };
