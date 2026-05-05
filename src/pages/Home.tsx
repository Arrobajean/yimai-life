import { Link } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Leaf, ShieldCheck, Package, Users, Tags, Truck, Boxes, UserCheck } from "lucide-react";
import { fadeUp, iconHover } from "@/lib/motion";

const stats = [
  { value: "2019", label: "Fundada" },
  { value: "ISO", label: "9001 · 14001 · 45001" },
  { value: "SGS", label: "Certificados" },
];

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

const categories = [
  { handle: "kraft-takeaway",    label: "Kraft & Takeaway" },
  { handle: "sushi-catering",    label: "Sushi & Catering" },
  { handle: "plastico-aluminio", label: "Plástico & Aluminio" },
  { handle: "accesorios",        label: "Accesorios" },
  { handle: "personalizacion",   label: "Personalización" },
];

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="min-h-[90vh] flex flex-col justify-center px-6 max-w-5xl mx-auto">
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8"
          >
            Innovación en envases para alimentos
          </m.p>

          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-10 max-w-3xl"
          >
            Envases ecológicos para hostelería y alimentación
          </m.h1>

          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-sm font-light leading-relaxed text-muted-foreground max-w-lg mb-14"
          >
            Soluciones sostenibles, resistentes y diseñadas para tu negocio
          </m.p>

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/catalogo"
              className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3
                         hover:bg-foreground hover:text-background transition-colors duration-200 inline-block"
            >
              Ver productos
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

        {/* ── Por qué elegirnos ────────────────────────────────────────────── */}
        <section className="px-6 py-28 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Encabezado */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-center md:text-left"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                ¿Por qué elegirnos?
              </p>
              <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
                La elección de los<br />profesionales.
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
                Más de cinco años acompañando a restaurantes, caterings y distribuidores con envases que combinan funcionalidad, sostenibilidad y precio competitivo.
              </p>
            </m.div>

            {/* Grid 2×2 — se mantiene en móvil y escritorio */}
            <div className="grid grid-cols-2 gap-8">
              {pillars.map((p, i) => (
                <m.div
                  key={p.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="flex flex-col items-center text-center"
                >
                  <m.div {...iconHover} className="mb-4 text-foreground/80 cursor-default">{p.icon}</m.div>
                  <h3 className="text-sm font-medium mb-2 uppercase tracking-wider">{p.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.text}</p>
                </m.div>
              ))}
            </div>

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
              custom={0}
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
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                >
                  <Link
                    to={`/catalogo?collection=${cat.handle}`}
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

        {/* ── Ventajas para profesionales ───────────────────────────────────── */}
        <section className="px-6 py-28 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-center md:text-left"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Ventajas para profesionales
              </p>
              <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
                Tu socio estratégico<br />en hostelería y alimentación.
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
                Acompañamos el crecimiento de tu negocio con soluciones de envasado 
                que cumplen los más altos estándares de calidad y sostenibilidad, 
                garantizando la seguridad de tus productos y una logística impecable.
              </p>
            </m.div>

            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              className="pt-1"
            >
              <ul className="space-y-12">
                {[
                  { 
                    icon: <Tags className="w-6 h-6" />,
                    title: "Precios por volumen", 
                    desc: "Tarifas competitivas diseñadas para consumos industriales y grandes pedidos." 
                  },
                  { 
                    icon: <Truck className="w-6 h-6" />,
                    title: "Envíos 24/48h", 
                    desc: "Logística ágil y eficiente para que tu negocio nunca se detenga." 
                  },
                  { 
                    icon: <Boxes className="w-6 h-6" />,
                    title: "Stock permanente", 
                    desc: "Disponibilidad garantizada en nuestros productos estrella durante todo el año." 
                  },
                  { 
                    icon: <UserCheck className="w-6 h-6" />,
                    title: "Asesoramiento experto", 
                    desc: "Te ayudamos a elegir el envase perfecto según el tipo de alimento y servicio." 
                  }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-6">
                    <m.div {...iconHover} className="text-foreground/80 shrink-0 cursor-default">
                      {item.icon}
                    </m.div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium uppercase tracking-wider">{item.title}</span>
                      <span className="text-sm font-light text-muted-foreground leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* ── Stats / Certificaciones ────────────────────────────────────────── */}
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

        {/* ── CTA final ────────────────────────────────────────────────────── */}
        <section className="px-6 py-36 max-w-5xl mx-auto text-center">
          <m.p
            variants={fadeUp}
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
            custom={0.15}
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8 max-w-2xl mx-auto"
          >
            Tu socio de confianza en envases para alimentos.
          </m.p>
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            className="text-sm font-light leading-relaxed text-muted-foreground max-w-xl mx-auto mb-14"
          >
            Trabajamos para ofrecer soluciones innovadoras que protejan tus productos y mejoren la experiencia de tus clientes.
          </m.p>
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.45}
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
              to="/nosotros"
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
