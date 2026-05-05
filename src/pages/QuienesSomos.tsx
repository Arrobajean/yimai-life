import { LazyMotion, domAnimation, m } from "framer-motion";
import { Leaf, ShieldCheck, Package, Users, Award, BadgeCheck, Palette } from "lucide-react";
import { fadeUp, iconHover } from "@/lib/motion";

const pillars = [
  {
    icon: <Leaf className="w-6 h-6" />,
    label: "Sostenibilidad",
    text: "Comprometidos con el medio ambiente a través de materiales biodegradables y procesos ecológicos.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    label: "Calidad",
    text: "Garantía de excelencia y seguridad alimentaria en cada uno de nuestros productos certificados.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: "Soluciones Profesionales",
    text: "Servicio experto y amplia variedad de productos diseñados para las necesidades de tu negocio.",
  },
  {
    icon: <Package className="w-6 h-6" />,
    label: "Personalización",
    text: "Soluciones a medida adaptadas a las necesidades específicas de cada uno de nuestros clientes.",
  },
];

const compromisos = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Con Nuestros Clientes",
    body: "Aportar soluciones óptimas a sus necesidades de envasado desechable, protegiendo su producto y realzando las propiedades e imagen del mismo.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Con la Calidad",
    body: "Nuestro sistema de gestión de calidad está certificado con la ISO 9001.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Con la Salud y la Seguridad",
    body: "Todos los productos destinados a hostelería están certificados para su uso alimentario. En lo relativo a los procesos, la empresa está certificada con la ISO 45001.",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Con el Medio Ambiente",
    body: "La inmensa mayoría de nuestros productos son reciclables. También ofrecemos una amplia gama de artículos biodegradables y/o compostables.",
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: "Productos Certificados",
    body: "Nuestros productos han sido sometidos a pruebas de calidad conforme a los estándares de SGS y otras entidades internacionales.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Personalización",
    body: "Adaptamos nuestros envases a la identidad de tu marca. Desde el diseño gráfico hasta el acabado final, creamos soluciones de packaging que refuerzan tu imagen y conectan con tus clientes.",
  },
];

export default function QuienesSomos() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen">

        {/* ── Hero ── */}
        <section className="px-6 pt-32 pb-24 max-w-3xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8"
          >
            Nosotros
          </m.p>
          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-5xl md:text-6xl font-light leading-[1.1] tracking-tight mb-10"
          >
            Sobre Nosotros
          </m.h1>
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-sm font-light leading-relaxed text-muted-foreground max-w-xl mx-auto"
          >
            Fundada en 2019, nuestra empresa se ha consolidado como un referente
            en el sector de envases para alimentos, ofreciendo soluciones
            innovadoras y sostenibles adaptadas a las necesidades del mercado actual.
          </m.p>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Por qué elegirnos ── */}
        <section className="px-6 py-28 max-w-5xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-16"
          >
            ¿Por qué elegirnos?
          </m.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {pillars.map((p, i) => (
              <m.div
                key={p.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="flex flex-col items-center"
              >
                <m.div
                  {...iconHover}
                  className="mb-6 text-foreground/80 cursor-default"
                >
                  {p.icon}
                </m.div>
                <h3 className="text-sm font-medium mb-3 uppercase tracking-wider">{p.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{p.text}</p>
              </m.div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Misión ── */}
        <section className="px-6 py-28 max-w-3xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8"
          >
            Nuestra misión
          </m.p>
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-2xl md:text-3xl font-light leading-relaxed"
          >
            Nuestra misión es proporcionar productos de alta calidad que
            garanticen la conservación y seguridad de los alimentos, al mismo
            tiempo que contribuimos a la protección del medio ambiente.
          </m.p>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Innovación ── */}
        <section className="px-6 py-28 max-w-3xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8"
          >
            Innovación y Sostenibilidad
          </m.p>
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-2xl md:text-3xl font-light leading-relaxed"
          >
            Apostamos por la innovación constante y el desarrollo de envases más
            eficientes, funcionales y ecológicos, manteniendo siempre un firme
            compromiso con la calidad y la satisfacción de nuestros clientes.
          </m.p>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Compromisos ── */}
        <section className="px-6 py-28 max-w-5xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-16"
          >
            Nuestro Compromiso
          </m.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {compromisos.map((c, i) => (
              <m.div
                key={c.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="flex flex-col items-center"
              >
                <m.div
                  {...iconHover}
                  className="mb-6 text-foreground/80 cursor-default"
                >
                  {c.icon}
                </m.div>
                <h3 className="text-sm font-medium mb-4">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">{c.body}</p>
              </m.div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Tagline Final ── */}
        <section className="px-6 py-32 max-w-3xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xl font-light leading-relaxed text-muted-foreground"
          >
            Tu Socio de Confianza en Envases para Alimentos,<br />
            Comprometido con la Calidad y la Sostenibilidad.
          </m.p>
        </section>

      </main>
    </LazyMotion>
  );
}
