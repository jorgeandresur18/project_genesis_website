import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { TitleBackground } from './components/TitleBackground';
import { PeleaEnBucle } from './components/PeleaEnBucle';
import { Sprite, type Hoja } from './components/Sprite';
import { Tv } from './components/Tv';
import { CajaBlanca } from './components/CajaBlanca';
import { CAJA } from './data/caja_blanca';
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

// El enlace de los aspectos técnicos (antes «Caja blanca»).
const TECNICO = 'aspectos-tecnicos';
// La barra: a la vista, lo principal; en «Más», el resto. En el celular, todo en el menú ☰.
const NAV_PRINCIPAL = ['proyecto', 'personajes', 'capturas', 'bootcamp', 'rpg'] as const;
const NAV_MAS = ['boringram', 'caja', 'autor'] as const;
// Las secciones en el orden de la página, para saber cuál se está viendo.
const SECCIONES = ['proyecto', 'personajes', 'capturas', 'boringram', 'bootcamp', 'rpg', 'autor', 'apoyar'];

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
  // La captura abierta en grande. `vertical`: las de Boringram, tomadas en un celular (sin versión _cel).
  const [abierta, setAbierta] = useState<{ c: string; alt: string; vertical?: boolean } | null>(null);
  // El botón para volver arriba aparece cuando ya se bajó más de una pantalla.
  const [abajo, setAbajo] = useState(false);
  useEffect(() => {
    const onScroll = () => setAbajo(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const t = TEXTOS[lang];
  const [menu, setMenu] = useState(false);
  // La advertencia de «El proyecto»: cerrada; se abre sola si se llega desde la línea +18 de la portada.
  const [advertencia, setAdvertencia] = useState(false);
  // La barra: transparente arriba del todo; al bajar se oscurece y se hace más baja.
  const [compacta, setCompacta] = useState(false);
  // La sección que se está viendo (la última cuyo comienzo ya pasó el tercio de arriba de la pantalla).
  const [activa, setActiva] = useState<string | null>(null);
  useEffect(() => {
    let cuadro = 0;
    const medir = () => {
      cuadro = 0;
      setCompacta(window.scrollY > 24);
      let actual: string | null = null;
      for (const id of SECCIONES) {
        const el = document.getElementById(id);
        if (el && el.offsetParent !== null && el.getBoundingClientRect().top <= window.innerHeight * 0.35) actual = id;
      }
      setActiva(actual);
    };
    const onScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(cuadro);
    };
  }, []);
  // «Más»: se abre al pasar el mouse o con un clic (y se cierra al elegir, con Escape o al tocar fuera).
  const [mas, setMas] = useState(false);
  const masRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mas) return;
    const fuera = (e: PointerEvent) => {
      if (!masRef.current?.contains(e.target as Node)) setMas(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMas(false);
    document.addEventListener('pointerdown', fuera);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', fuera);
      window.removeEventListener('keydown', onKey);
    };
  }, [mas]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);
  // Aspectos técnicos: una vista aparte, solo desde su enlace en la barra de arriba (no aparece al recorrer la página).
  const [tecnico, setTecnico] = useState(() => window.location.hash === `#${TECNICO}`);
  useEffect(() => {
    const onHash = () => setTecnico(window.location.hash === `#${TECNICO}`);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  // Al entrar, arriba del todo; al salir por un enlace de la barra, a la sección que pide (ya visible otra vez).
  useEffect(() => {
    if (tecnico) {
      window.scrollTo(0, 0);
      return;
    }
    const destino = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    destino?.scrollIntoView();
  }, [tecnico]);
  // La línea plateada bajo el enlace de la sección que se ve: se desliza de uno a otro.
  const navRef = useRef<HTMLElement>(null);
  const clave = tecnico ? 'mas' : activa && (NAV_MAS as readonly string[]).includes(activa) ? 'mas' : activa;
  const [linea, setLinea] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const medir = () => {
      const el = clave ? navRef.current?.querySelector<HTMLElement>(`[data-k="${clave}"]`) : null;
      const nav = navRef.current;
      if (!el || !nav) return setLinea(null);
      const r = el.getBoundingClientRect();
      setLinea({ left: r.left - nav.getBoundingClientRect().left, width: r.width });
    };
    medir();
    // Otra vez cuando la barra termina de cambiar de alto (al bajar o volver arriba) y cargan las fuentes.
    const otra = window.setTimeout(medir, 350);
    document.fonts?.ready.then(medir);
    window.addEventListener('resize', medir);
    return () => {
      window.clearTimeout(otra);
      window.removeEventListener('resize', medir);
    };
  }, [clave, lang, compacta]);

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

      <header className={`nav ${compacta || menu ? 'compacta' : ''}`}>
        <a href="#inicio" className="nav-marca" aria-label="PROJECT GENESIS" title="PROJECT GENESIS">
          <img src="/marca/icono-256.png" alt="" />
          <i className="nav-marca-brillo" aria-hidden />
        </a>

        {/* En la computadora: lo principal a la vista y el resto en «Más». */}
        <nav className="nav-principal" ref={navRef} aria-label={t.nav.mas}>
          {NAV_PRINCIPAL.map((k) => (
            <a key={k} data-k={k} href={`#${k}`} className={clave === k ? 'activo' : undefined}>
              {t.nav[k]}
            </a>
          ))}
          <div className={`nav-mas ${mas ? 'abierto' : ''}`} ref={masRef}>
            <button
              type="button"
              data-k="mas"
              className={clave === 'mas' ? 'activo' : undefined}
              aria-expanded={mas}
              aria-haspopup="true"
              onClick={() => setMas((m) => !m)}
            >
              {t.nav.mas}
              <svg viewBox="0 0 10 6" aria-hidden>
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            <div className="nav-mas-menu" onClick={() => setMas(false)}>
              {NAV_MAS.map((k) => (
                <a key={k} href={`#${k === 'caja' ? TECNICO : k}`} className={(k === 'caja' ? tecnico : activa === k) ? 'activo' : undefined}>
                  {k === 'caja' ? (
                    <>
                      <img className="nav-tecnico-icono" src="/marca/tecnico_emblema.webp" alt="" /> {CAJA[lang].nav}
                    </>
                  ) : (
                    t.nav[k]
                  )}
                </a>
              ))}
            </div>
          </div>
          {linea && <span className="nav-linea" style={{ transform: `translateX(${linea.left}px)`, width: linea.width }} aria-hidden />}
        </nav>

        <div className="nav-acciones">
          <a className={`nav-jugar ${abajo ? 'visible' : ''}`} href={DEMO} target="_blank" rel="noreferrer" tabIndex={abajo ? 0 : -1}>
            ▶ {t.nav.jugar}
          </a>
          <a className={`nav-apoyar ${!tecnico && activa === 'apoyar' ? 'activo' : ''}`} href="#apoyar">
            ♥ {t.nav.apoyar}
          </a>
          <button type="button" className="nav-idioma" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
            {t.idioma}
          </button>
          {/* En el celular los enlaces van en un menú desplegable. */}
          <button
            type="button"
            className={`nav-hamburguesa ${menu ? 'abierto' : ''}`}
            aria-label={CAJA[lang].menu}
            aria-expanded={menu}
            aria-controls="nav-enlaces"
            onClick={() => setMenu((m) => !m)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>

        {/* El menú del celular: todo, en una lista. */}
        <nav id="nav-enlaces" className={`nav-movil ${menu ? 'abierto' : ''}`} onClick={() => setMenu(false)} aria-label={CAJA[lang].menu}>
          {(['proyecto', 'personajes', 'capturas', 'boringram', 'bootcamp', 'rpg', 'caja', 'autor', 'apoyar'] as const).map((k) => (
            <a key={k} href={`#${k === 'caja' ? TECNICO : k}`} className={(k === 'caja' ? tecnico : !tecnico && activa === k) ? 'activo' : undefined}>
              {k === 'caja' ? CAJA[lang].nav : t.nav[k]}
            </a>
          ))}
          <a className="boton boton-principal nav-movil-jugar" href={DEMO} target="_blank" rel="noreferrer">
            ▶ {t.hero.jugar}
          </a>
        </nav>
      </header>
      {menu && <div className="nav-velo" onClick={() => setMenu(false)} aria-hidden />}

      <main>
        {tecnico && (
          <div className="tecnico">
            <p className="tecnico-barra">
              <a className="boton" href="#inicio">
                ← {CAJA[lang].volver}
              </a>
            </p>
            <CajaBlanca lang={lang} />
          </div>
        )}
        {/* La página. Mientras se ven los aspectos técnicos queda oculta, sin desmontarse (el televisor no se reinicia). */}
        <div hidden={tecnico}>
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
          {/* En la portada, solo una línea neutra; la advertencia está en «El proyecto». */}
          <a className="hero-18" href="#advertencia" onClick={() => setAdvertencia(true)}>
            {t.aviso18.chip}
          </a>
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
          {/* La advertencia del juego, con la historia: visible pero discreta; los temas se abren con un clic. */}
          <details id="advertencia" className="advertencia" open={advertencia} onToggle={(e) => setAdvertencia(e.currentTarget.open)}>
            <summary>
              <img src="/marca/emblema_18.webp" alt="+18" />
              <span>
                <b>{t.aviso18.titulo}</b> {t.aviso18.resumen}
              </span>
              <i aria-hidden>{t.aviso18.ver}</i>
            </summary>
            <p>{t.aviso18.texto}</p>
            <ul>
              {t.aviso18.temas.map((tema) => (
                <li key={tema.t}>
                  <strong>{tema.t}:</strong> {tema.d}
                </li>
              ))}
            </ul>
            <small>{t.aviso18.ficcion}</small>
          </details>
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
                <button type="button" onClick={() => setAbierta({ c: b, alt: t.boringram.items[i], vertical: true })} aria-label={t.boringram.items[i]}>
                  <img src={`/capturas/${b}.jpg`} alt={t.boringram.items[i]} loading="lazy" />
                </button>
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

        {/* Aspectos técnicos: en la página, solo un avance con el botón a la vista aparte. */}
        <section className="seccion tecnico-avance">
          <img className="tecnico-emblema" src="/marca/tecnico_emblema.webp" alt="" />
          <p className="cb-ojo">
            <span>$</span> git clone project_genesis
          </p>
          <h2>{CAJA[lang].avance.titulo}</h2>
          <p className="seccion-texto">{CAJA[lang].avance.texto}</p>
          <a className="boton" href={`#${TECNICO}`}>
            {CAJA[lang].avance.boton} →
          </a>
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
        </div>
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
        <div className={`visor ${abierta.vertical ? 'visor-vertical' : ''}`} role="dialog" aria-label={abierta.alt} onClick={() => setAbierta(null)}>
          <picture>
            {!abierta.vertical && <source media="(max-width: 700px)" srcSet={`/capturas/${abierta.c}_cel.jpg`} />}
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
