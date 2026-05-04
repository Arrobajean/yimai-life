import { LazyMotion, domAnimation, m } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
  }),
};

const compromisos = [
  {
    title: "Con Nuestros Clientes",
    body: "Aportar soluciones óptimas a sus necesidades de envasado desechable, protegiendo su producto y realzando las propiedades e imagen del mismo.",
  },
  {
    title: "Con la Calidad",
    body: "Nuestro sistema de gestión de calidad está certificado con la ISO 9001.",
  },
  {
    title: "Con la Salud y la Seguridad",
    body: "Todos los productos destinados a hostelería están certificados para su uso alimentario. En lo relativo a los procesos, la empresa está certificada con la ISO 45001, el estándar de prevención de riesgos laborales más alto que existe.",
  },
  {
    title: "Con el Medio Ambiente",
    body: "La inmensa mayoría de nuestros productos son reciclables. También ofrecemos una amplia gama de artículos biodegradables y/o compostables. Contamos con la certificación de gestión ambiental ISO 14001.",
  },
  {
    title: "Productos Certificados",
    body: "Nuestros productos han sido sometidos a pruebas de calidad conforme a los estándares de SGS y otras entidades internacionales, garantizando su seguridad y cumplimiento normativo.",
  },
];

const valores = [
  {
    title: "Cliente en el centro",
    body: "Con el fin de ofrecerle el mejor servicio en estos tiempos de incertidumbre.",
  },
  {
    title: "Innovación constante",
    body: "Para aportar nuevas soluciones y procesos al mercado.",
  },
  {
    title: "Asesoramiento experto",
    body: "Con el objetivo de cubrir las necesidades y requerimientos de negocio de nuestros clientes.",
  },
  {
    title: "Desarrollo sostenible",
    body: "Tanto de productos como de prácticas que tengan un impacto positivo en la sociedad.",
  },
  {
    title: "Personalización",
    body: "Como valor diferencial frente a la competencia.",
  },
];

const productos = [
  "Cajas para alimentos",
  "Contenedores herméticos",
  "Envases biodegradables y compostables",
  "Soluciones de envasado personalizadas",
];

export default function QuienesSomos() {
  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="px-6 pt-32 pb-24 max-w-2xl mx-auto">
        <m.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6"
        >
          Sobre nosotros
        </m.p>
        <m.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl md:text-5xl font-light leading-tight tracking-tight mb-8"
        >
          Innovación en Envases<br />para Alimentos
        </m.h1>
        <m.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-muted-foreground leading-relaxed"
        >
          Fundada en 2015, YIMAILIFE se ha establecido como un líder destacado
          en la industria de envases para alimentos. Desde nuestros inicios,
          hemos dedicado nuestros esfuerzos a ofrecer soluciones innovadoras y
          sostenibles para el envasado de alimentos, satisfaciendo las
          necesidades de nuestros clientes en un mercado en constante evolución.
        </m.p>
      </section>

      <div className="w-full h-px bg-border" />

      {/* ── Misión ── */}
      <section className="px-6 py-24 max-w-2xl mx-auto">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Nuestra misión
          </p>
          <p className="text-lg font-light leading-relaxed">
            Proporcionar productos de alta calidad que no solo protejan y
            preserven la frescura de los alimentos, sino que también sean
            respetuosos con el medio ambiente. Lideramos con integridad,
            sostenibilidad y un compromiso inquebrantable con la excelencia en
            cada aspecto de nuestro negocio.
          </p>
        </m.div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* ── Productos ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Productos y Soluciones
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Ofrecemos una amplia gama de envases para alimentos diseñados para
            diferentes necesidades y aplicaciones. Nuestros productos están
            diseñados para mantener la calidad y seguridad de los alimentos,
            garantizando una experiencia satisfactoria para el consumidor final.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {productos.map((item, i) => (
            <m.div
              key={item}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              className="border border-border px-6 py-5"
            >
              <p className="text-sm font-light">{item}</p>
            </m.div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* ── Innovación y Sostenibilidad ── */}
      <section className="px-6 py-24 max-w-2xl mx-auto">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Innovación y Sostenibilidad
          </p>
          <p className="text-lg font-light leading-relaxed">
            La innovación es el corazón de YIMAILIFE. Continuamente invertimos
            en investigación y desarrollo para crear envases más eficientes,
            funcionales y ecológicos. Nos comprometemos a reducir nuestro
            impacto ambiental mediante el uso de materiales reciclables y el
            desarrollo de soluciones de envasado biodegradables.
          </p>
        </m.div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* ── Compromisos ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12"
        >
          Nuestro Compromiso
        </m.p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {compromisos.map((c, i) => (
            <m.div
              key={c.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.08}
            >
              <h3 className="text-sm font-medium mb-3">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.body}
              </p>
            </m.div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* ── Valores ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12"
        >
          Nuestros Valores
        </m.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-10">
          {valores.map((v, i) => (
            <m.div
              key={v.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.08}
            >
              <h3 className="text-sm font-medium mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {v.body}
              </p>
            </m.div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* ── Tagline ── */}
      <section className="px-6 py-24 max-w-2xl mx-auto text-center">
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg font-light leading-relaxed text-muted-foreground"
        >
          Tu Socio de Confianza en Envases para Alimentos,<br />
          Comprometido con la Calidad y la Sostenibilidad.
        </m.p>
      </section>

    </main>
    </LazyMotion>
  );
}
