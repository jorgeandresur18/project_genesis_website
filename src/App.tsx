import { useEffect, useState, type CSSProperties } from 'react';
import { TitleBackground } from './components/TitleBackground';
import { PeleaEnBucle } from './components/PeleaEnBucle';
import { Sprite, type Hoja } from './components/Sprite';
import { Tv } from './components/Tv';
import { DEMO, ENLACES, PAYPAL, PERSONAJES, TEXTOS, type Lang } from './data/textos';

// La animación de reposo de cada uno, recortada de su hoja del juego (public/rpg/<id>.png).
const RPG: Record<string, Hoja & { frames: number; fps: number }> = {
  jair: { src: '/rpg/jair.png', w: 792, h: 116, cuadroW: 132, cuadroH: 116, frames: 6, fps: 6 },
  nikki: { src: '/rpg/nikki.png', w: 3168, h: 116, cuadroW: 132, cuadroH: 116, frames: 24, fps: 12 },
  cami: { src: '/rpg/cami.png', w: 928, h: 118, cuadroW: 116, cuadroH: 118, frames: 8, fps: 8 },
  rikka: { src: '/rpg/rikka.png', w: 792, h: 116, cuadroW: 132, cuadroH: 116, frames: 6, fps: 6 },
};
const CAPTURAS = ['menu', 'novela', 'vs', 'pelea', 'especial_aviso', 'especial_rayo', 'especial_barrido', 'crt'];
// Bootcamp Genesis: el instructor, la inscripción, los niveles, una clase de Jair, tres charlas (Cami y Nikki), el IDE y GENESIS.
const BOOTCAMP = ['bootcamp_intro', 'bootcamp_inicio', 'bootcamp_niveles', 'bootcamp_clase', 'bootcamp_rikka', 'bootcamp_cami', 'bootcamp_nikki', 'bootcamp_ide', 'bootcamp_genesis'];
// El color de dificultad de cada nivel, como en el juego: del verde al rojo.
const NIVEL_COLOR = ['#3ddc84', '#b6e34a', '#ffd23f', '#ff9a3c', '#ff4d5e'];
// Boringram: capturas en vertical, como se ve en un celular.
const BORINGRAM = ['bor_inicio', 'bor_historia', 'bor_perfil', 'bor_chat'];

// Lo mismo que el corte de las capturas tomadas en un celular (max-width: 700px).
const celular = () => window.matchMedia('(max-width: 700px)').matches;

function idiomaInicial(): Lang {
  try {
    const guardado = localStorage.getItem('pg-lang');
    if (guardado === 'es' || guardado === 'en') return guardado;
  } catch {
    /* sin almacenamiento: se usa el del navegador */
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function App() {
  const [lang, setLang] = useState<Lang>(idiomaInicial);
  const [abierta, setAbierta] = useState<{ c: string; alt: string } | null>(null);
  // El botón para volver arriba aparece cuando ya se bajó más de una pantalla.
  const [abajo, setAbajo] = useState(false);
  useEffect(() => {
    const onScroll = () => setAbajo(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const t = TEXTOS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('pg-lang', lang);
    } catch {
      /* nada */
    }
  }, [lang]);
  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAbierta(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierta]);

  return (
    <>
      <div className="fondo">
        <TitleBackground lang={lang} />
      </div>

      <header className="nav">
        <a href="#inicio" className="nav-marca">
          <img src="/marca/icono-256.png" alt="" />
          <span>PROJECT GENESIS</span>
        </a>
        <nav>
          {(['proyecto', 'personajes', 'capturas', 'boringram', 'bootcamp', 'rpg', 'autor', 'apoyar'] as const).map((k) => (
            <a key={k} href={`#${k}`}>
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <button type="button" className="nav-idioma" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
          {t.idioma}
        </button>
      </header>

      <main>
        {/* Portada */}
        <section id="inicio" className="hero">
          <img className="hero-logo" src="/marca/logo.webp" alt="PROJECT GENESIS" />
          <p className="hero-generos">{t.hero.generos}</p>
          <p className="hero-tagline">{t.hero.tagline}</p>
          <div className="hero-botones">
            <a className="boton boton-principal" href={DEMO} target="_blank" rel="noreferrer">
              ▶ {t.hero.jugar}
            </a>
            <a className="boton" href="#proyecto">
              {t.hero.conocer}
            </a>
          </div>
          <p className="hero-nota">{t.hero.gratis}</p>
          <p className="hero-aviso">
            <img src="/marca/emblema_18.webp" alt="+18" /> {t.hero.aviso}
          </p>
        </section>

        {/* El proyecto */}
        <section id="proyecto" className="seccion">
          <h2>{t.proyecto.titulo}</h2>
          {t.proyecto.texto.map((p) => (
            <p key={p} className="seccion-texto">
              {p}
            </p>
          ))}
          <div className="rasgos">
            {t.proyecto.rasgos.map((r) => (
              <article key={r.t} className="rasgo">
                <h3>{r.t}</h3>
                {'dCel' in r ? (
                  <>
                    <p className="solo-pc">{r.d}</p>
                    <p className="solo-cel">{r.dCel}</p>
                  </>
                ) : (
                  <p>{r.d}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Personajes */}
        <section id="personajes" className="seccion">
          <h2>{t.personajes.titulo}</h2>
          <p className="seccion-texto">{t.personajes.sub}</p>
          <div className="personajes">
            {PERSONAJES.map((p) => {
              const r = RPG[p.id];
              const f = t.personajes.fichas[p.id];
              return (
                <article key={p.id} className="personaje" style={{ '--c': p.color } as CSSProperties}>
                  <div className="personaje-arte">
                    <img className="personaje-2d" src={`/sprites/${p.id}.webp`} alt={p.nombre} loading="lazy" />
                    <Sprite className="personaje-rpg" hoja={r} anim={{ row: 0, frames: r.frames, fps: r.fps }} escala={1.1} />
                  </div>
                  <h3>{p.nombre}</h3>
                  <b>{f.titulo}</b>
                  <p>{f.info}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Capturas */}
        <section id="capturas" className="seccion">
          <h2>{t.capturas.titulo}</h2>
          <p className="capturas-pista">{t.capturas.desliza}</p>
          <div className="capturas">
            {CAPTURAS.map((c, i) => (
              <button key={c} type="button" className="captura" onClick={() => setAbierta({ c, alt: celular() ? (t.capturas.itemsCel[c] ?? t.capturas.items[i]) : t.capturas.items[i] })}>
                {/* En pantallas chicas, la versión tomada en un celular (la interfaz se lee mejor). */}
                <picture>
                  <source media="(max-width: 700px)" srcSet={`/capturas/${c}_cel.jpg`} />
                  <img src={`/capturas/${c}.jpg`} alt={t.capturas.items[i]} loading="lazy" />
                </picture>
                {t.capturas.itemsCel[c] ? (
                  <>
                    <span className="solo-pc">{t.capturas.items[i]}</span>
                    <span className="solo-cel">{t.capturas.itemsCel[c]}</span>
                  </>
                ) : (
                  <span>{t.capturas.items[i]}</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Boringram, en vertical */}
        <section id="boringram" className="seccion seccion-bor">
          <div className="bor-texto">
            <img className="bor-logo" src="/marca/boringram.webp" alt="Boringram" />
            {t.boringram.texto.map((p) => (
              <p key={p} className="seccion-texto">
                {p}
              </p>
            ))}
          </div>
          <div className="bor-telefonos">
            {BORINGRAM.map((b, i) => (
              <figure key={b} className="bor-telefono">
                <img src={`/capturas/${b}.jpg`} alt={t.boringram.items[i]} loading="lazy" />
                <figcaption>{t.boringram.items[i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Bootcamp Genesis */}
        <section id="bootcamp" className="seccion">
          <div className="bc">
            <div>
              <img className="bc-logo" src="/marca/bootcamp_logo.webp" alt="Bootcamp Genesis" />
              {t.bootcamp.texto.map((p) => (
                <p key={p} className="seccion-texto">
                  {p}
                </p>
              ))}
              <p className="seccion-texto bc-jugar">{t.bootcamp.jugar}</p>
              <a className="boton boton-principal" href={DEMO} target="_blank" rel="noreferrer">
                ▶ {t.hero.jugar}
              </a>
            </div>
            <div>
              <h3 className="bc-niveles-titulo">{t.bootcamp.nivelesTitulo}</h3>
              <ol className="bc-niveles">
                {t.bootcamp.niveles.map((n, i) => (
                  <li key={n.n} className={i === 0 ? 'abierto' : 'cerrado'} style={{ '--c': NIVEL_COLOR[i] } as CSSProperties}>
                    <small>
                      {lang === 'es' ? 'Nivel' : 'Level'} {i + 1} <em>{i === 0 ? '▶' : '🔒'} {n.e}</em>
                    </small>
                    <b>{n.n}</b>
                    <span>{n.d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="hero-aviso bc-aviso">
            <img src="/marca/emblema_18.webp" alt="+18" /> {t.bootcamp.aviso}
          </p>
          <p className="capturas-pista">{t.capturas.desliza}</p>
          <div className="capturas bc-capturas">
            {BOOTCAMP.map((c, i) => (
              <button key={c} type="button" className="captura" onClick={() => setAbierta({ c, alt: t.bootcamp.items[i] })}>
                <picture>
                  <source media="(max-width: 700px)" srcSet={`/capturas/${c}_cel.jpg`} />
                  <img src={`/capturas/${c}.jpg`} alt={t.bootcamp.items[i]} loading="lazy" />
                </picture>
                <span>{t.bootcamp.items[i]}</span>
              </button>
            ))}
          </div>
        </section>

        {/* El RPG, en el televisor */}
        <section id="rpg" className="seccion seccion-rpg">
          <div className="rpg-texto">
            <h2>{t.rpg.titulo}</h2>
            {t.rpg.texto.map((p) => (
              <p key={p} className="seccion-texto">
                {p}
              </p>
            ))}
            <p className="rpg-pista">{t.rpg.tv}</p>
          </div>
          <Tv>
            <PeleaEnBucle mensajes={t.rpg.mensajes} />
          </Tv>
        </section>

        {/* El autor */}
        <section id="autor" className="seccion">
          <h2>{t.autor.titulo}</h2>
          {t.autor.texto.map((p) => (
            <p key={p} className="seccion-texto">
              {p}
            </p>
          ))}
          <div className="autor-links">
            <a className="boton" href={ENLACES.pagina} target="_blank" rel="noreferrer">
              {t.autor.links.pagina}
            </a>
            <a className="boton" href={ENLACES.github} target="_blank" rel="noreferrer">
              {t.autor.links.github}
            </a>
            <a className="boton" href={ENLACES.linkedin} target="_blank" rel="noreferrer">
              {t.autor.links.linkedin}
            </a>
          </div>
        </section>

        {/* Apoyar: Nikki, como en el easter egg del juego */}
        <section id="apoyar" className="seccion apoyar">
          <h2>{t.apoyar.titulo}</h2>
          <div className="apoyar-escena">
            <img className="apoyar-nikki" src="/sprites/nikki_tierna.webp" alt="Nikki" loading="lazy" />
            <div className="apoyar-globo">
              <b>Nikki</b>
              {t.apoyar.globo.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <a className="boton-paypal" href={PAYPAL} target="_blank" rel="noreferrer">
                {t.apoyar.donar} <img src="/marca/paypal.webp" alt="PayPal" />
              </a>
              <small>{t.apoyar.gracias}</small>
            </div>
          </div>
          <a className="boton boton-principal" href={DEMO} target="_blank" rel="noreferrer">
            ▶ {t.hero.jugar}
          </a>
        </section>
      </main>

      <footer className="pie">
        <img src="/marca/logo.webp" alt="PROJECT GENESIS" />
        <p>
          © 2026 · {t.pie} · +18
        </p>
      </footer>

      <a href="#inicio" className={`arriba ${abajo ? 'visible' : ''}`} aria-label={t.arriba} title={t.arriba} tabIndex={abajo ? 0 : -1}>
        ↑
      </a>

      {abierta !== null && (
        <div className="visor" role="dialog" aria-label={abierta.alt} onClick={() => setAbierta(null)}>
          <picture>
            <source media="(max-width: 700px)" srcSet={`/capturas/${abierta.c}_cel.jpg`} />
            <img src={`/capturas/${abierta.c}.jpg`} alt={abierta.alt} />
          </picture>
          <button type="button" className="boton" onClick={() => setAbierta(null)}>
            {t.capturas.cerrar}
          </button>
        </div>
      )}
    </>
  );
}
