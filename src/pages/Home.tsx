import { Link } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "2015", label: "Fundada" },
  { value: "ISO", label: "9001 · 14001 · 45001" },
  { value: "SGS", label: "Certificados" },
];

const pillars = [
  {
    label: "Calidad",
    text: "Sistema de gestión certificado ISO 9001 que garantiza la excelencia en cada producto.",
  },
  {
    label: "Sostenibilidad",
    text: "Productos biodegradables y compostables. Certificación ISO 14001 de gestión ambiental.",
  },
  {
    label: "Seguridad",
    text: "Todos los productos alimentarios certificados para uso en hostelería. ISO 45001.",
  },
  {
    label: "Personalización",
    text: "Soluciones adaptadas a cada cliente, desde el diseño hasta el volumen de pedido.",
  },
];

const categories = [
  { handle: "envases-alimentarios", label: "Envases Alimentarios" },
  { handle: "biodegradables", label: "Biodegradables" },
  { handle: "personalizados", label: "Personalizados" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="min-h-[90vh] flex flex-col justify-center px-6 max-w-5xl mx-auto">
          <m.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8"
          >
            Innovación en envases para alimentos
          </m.p>

          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-10 max-w-3xl"
          >
            Envases que<br />
            <span className="italic">protegen</span> lo que<br />
            más importa.
          </m.h1>

          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="text-muted-foreground leading-relaxed max-w-lg mb-14 text-sm"
          >
            Desde 2015, YIMAILIFE lidera el sector del envasado desechable
            para alimentos con soluciones certificadas, sostenibles y adaptadas
            a cada negocio.
          </m.p>

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/catalogo"
              className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3
                         hover:bg-foreground hover:text-background transition-colors duration-200 inline-block"
            >
              Ver catálogo
            </Link>
            <Link
              to="/contacto"
              className="text-xs tracking-[0.15em] uppercase px-8 py-3 text-muted-foreground
                         hover:text-foreground transition-colors duration-200 inline-block"
            >
              Contactar →
            </Link>
          </m.div>
        </section>

        {/* ── Divider line animated ────────────────────────────────────────── */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          style={{ originX: 0 }}
          className="w-full h-px bg-border"
        />

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="px-6 py-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <m.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
              >
                <p className="text-2xl md:text-3xl font-light tracking-tight mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase">{s.label}</p>
              </m.div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Misión ──────────────────────────────────────────────────────── */}
        <section className="px-6 py-28 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <m.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Nuestra misión
              </p>
              <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight">
                Calidad que<br />cuida el planeta.
              </p>
            </m.div>

            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15}
              className="pt-1"
            >
              <p className="text-muted-foreground leading-relaxed text-sm">
                Proporcionar productos de alta calidad que no solo protejan y
                preserven la frescura de los alimentos, sino que también sean
                respetuosos con el medio ambiente. Lideramos con integridad,
                sostenibilidad y un compromiso inquebrantable con la excelencia
                en cada aspecto de nuestro negocio.
              </p>
            </m.div>
          </div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── 4 pilares ────────────────────────────────────────────────────── */}
        <section className="px-6 py-28 max-w-5xl mx-auto">
          <m.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-16"
          >
            Por qué elegirnos
          </m.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, i) => (
              <m.div
                key={p.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="group"
              >
                {/* número decorativo */}
                <p className="text-[10px] tracking-widest text-muted-foreground/40 mb-4 uppercase">
                  0{i + 1}
                </p>
                <h3 className="text-sm font-medium mb-3">{p.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.text}</p>
              </m.div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Categorías / CTA catálogo ─────────────────────────────────────── */}
        <section className="px-6 py-28 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Nuestro catálogo
              </p>
              <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight mb-10">
                Una solución<br />para cada necesidad.
              </p>
              <Link
                to="/catalogo"
                className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3
                           hover:bg-foreground hover:text-background transition-colors duration-200 inline-block"
              >
                Explorar productos
              </Link>
            </m.div>

            <div className="flex flex-col gap-0">
              {categories.map((cat, i) => (
                <m.div
                  key={cat.handle}
                  variants={slideLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.12}
                >
                  <Link
                    to={`/catalogo`}
                    className="flex items-center justify-between py-5 border-b border-border
                               text-sm text-muted-foreground hover:text-foreground
                               transition-colors duration-200 group"
                  >
                    <span>{cat.label}</span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── CTA final ────────────────────────────────────────────────────── */}
        <section className="px-6 py-36 max-w-5xl mx-auto text-center">
          <m.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8"
          >
            ¿Listo para empezar?
          </m.p>
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-14 max-w-2xl mx-auto"
          >
            Tu socio de confianza en envases para alimentos.
          </m.p>
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/contacto"
              className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3
                         hover:bg-foreground hover:text-background transition-colors duration-200 inline-block"
            >
              Contactar ahora
            </Link>
            <Link
              to="/quienes-somos"
              className="text-xs tracking-[0.15em] uppercase px-8 py-3 text-muted-foreground
                         hover:text-foreground transition-colors duration-200 inline-block"
            >
              Conocer más →
            </Link>
          </m.div>
        </section>

      </main>
    </LazyMotion>
  );
}
