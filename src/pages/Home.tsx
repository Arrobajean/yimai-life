import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Leaf, ShieldCheck, Package, Users, Tags, Truck, Boxes, UserCheck } from "lucide-react";
import { fadeUp, iconHover, dividerLine } from "@/lib/motion";

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

const faqs = [
  {
    q: "¿Existe un pedido mínimo?",
    a: "No para la mayoría de referencias estándar. En productos de personalización el mínimo varía según el tipo de acabado; siempre lo indicamos en la ficha del producto.",
  },
  {
    q: "¿Cuáles son los plazos de entrega?",
    a: "Los pedidos estándar se entregan en 24–48 h en la Península. Para Canarias, Ceuta, Melilla e Islas Baleares consulta disponibilidad con nuestro equipo.",
  },
  {
    q: "¿Puedo personalizar los envases con mi marca?",
    a: "Sí. Ofrecemos personalización con impresión digital o serigrafía a partir de ciertos volúmenes. Escríbenos y te enviamos una propuesta sin compromiso.",
  },
  {
    q: "¿Los productos están certificados para uso alimentario?",
    a: "Todos los artículos de hostelería cuentan con certificación de contacto alimentario conforme a la normativa europea vigente. Además disponemos de certificación ISO 9001, ISO 14001 e ISO 45001.",
  },
  {
    q: "¿Es posible solicitar muestras antes de comprar?",
    a: "Por supuesto. Contáctanos indicando las referencias que te interesan y te las hacemos llegar antes de formalizar cualquier pedido.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="min-h-[92vh] flex flex-col justify-center px-6 md:px-10 max-w-5xl mx-auto pt-24 md:pt-0 text-center md:text-left">


          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight leading-[1.04] mb-8 md:mb-10 max-w-3xl"
          >
            Envases ecológicos para hostelería y alimentación
          </m.h1>

          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-lg mb-14 md:mb-16"
          >
            Soluciones sostenibles, resistentes y diseñadas para tu negocio
          </m.p>

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <Link
              to="/catalogo"
              className="text-xs tracking-[0.18em] uppercase px-10 py-4 
                         bg-[#1E4D2B] border border-[#1E4D2B] text-white
                         md:bg-transparent md:border-foreground md:text-foreground
                         md:hover:bg-[#1E4D2B] md:hover:border-[#1E4D2B] md:hover:text-white 
                         transition-colors duration-200 w-[200px] md:w-auto text-center inline-block"
            >
              Ver catálogo
            </Link>
            <Link
              to="/contacto"
              className="text-xs tracking-[0.18em] uppercase px-10 py-4 
                         bg-[#D4541A] border border-[#D4541A] text-white
                         md:bg-transparent md:border-foreground md:text-foreground
                         md:hover:bg-[#D4541A] md:hover:border-[#D4541A] md:hover:text-white 
                         transition-colors duration-200 w-[200px] md:w-auto text-center inline-block"
            >
              Contactar →
            </Link>
          </m.div>
        </section>

        {/* ── Por qué elegirnos ────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-28 max-w-5xl mx-auto">
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
                ¿Por qué elegirnos?
              </p>
              <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
                La elección de los<br />profesionales.
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
                Más de cinco años acompañando a restaurantes, caterings y distribuidores con envases que combinan funcionalidad, sostenibilidad y precio competitivo.
              </p>
            </m.div>

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

        {/* ── Categorías / CTA catálogo ─────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-28 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-center md:text-left"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Nuestro catálogo
              </p>
              <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight mb-10">
                Una solución<br />para cada necesidad.
              </p>
              <Link
                to="/catalogo"
                className="text-xs tracking-[0.18em] uppercase border border-foreground px-10 py-4
                           hover:bg-[#1E4D2B] hover:border-[#1E4D2B] hover:text-white transition-colors duration-200 inline-block"
              >
                Ver catálogo
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
                               text-sm text-muted-foreground hover:text-[#D4541A]
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

        {/* ── Ventajas para profesionales ───────────────────────────────────── */}
        <section className="px-6 md:px-10 py-28 max-w-5xl mx-auto">
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

        {/* ── Stats / Certificaciones ────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <m.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="text-center md:text-left"
              >
                <p className="text-2xl md:text-3xl font-light tracking-tight mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase">{s.label}</p>
              </m.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <m.div
          variants={dividerLine}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          style={{ originX: 0 }}
          className="w-full h-px bg-border"
        />

        <section className="px-6 md:px-10 py-28 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Encabezado */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-center md:text-left md:sticky md:top-32"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Preguntas frecuentes
              </p>
              <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight mb-6">
                Todo lo que<br />necesitas saber.
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
                Si no encuentras respuesta a tu pregunta, escríbenos directamente.
              </p>
            </m.div>

            {/* Acordeón */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
            >
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="border-b border-border">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between py-6 text-left gap-6 group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-light group-hover:opacity-70 transition-opacity duration-200">
                        {faq.q}
                      </span>
                      <m.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xl leading-none text-muted-foreground flex-shrink-0 select-none"
                        aria-hidden="true"
                      >
                        +
                      </m.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm font-light text-muted-foreground leading-relaxed pb-6 max-w-md">
                            {faq.a}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </m.div>

          </div>
        </section>

        <m.div
          variants={dividerLine}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          style={{ originX: 0 }}
          className="w-full h-px bg-border"
        />

        {/* ── CTA final — fondo naranja pálido ─────────────────────────────── */}
        <section className="section-cta">
          <div className="px-6 md:px-10 py-36 md:py-52 max-w-5xl mx-auto text-center">
            <m.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground mb-10 md:mb-12"
            >
              ¿Listo para empezar?
            </m.p>
            <m.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15}
              className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.07] mb-10 md:mb-12 max-w-3xl mx-auto"
            >
              Tu socio de confianza en envases para alimentos.
            </m.p>
            <m.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.3}
              className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-xl mx-auto mb-16 md:mb-20"
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
                to="/nosotros"
                className="text-xs tracking-[0.18em] uppercase px-10 py-4 
                           bg-[#1E4D2B] border border-[#1E4D2B] text-white
                           md:bg-transparent md:border-foreground md:text-foreground
                           md:hover:bg-[#1E4D2B] md:hover:border-[#1E4D2B] md:hover:text-white 
                           transition-colors duration-200 w-[200px] md:w-auto text-center inline-block"
              >
                Conocer más
              </Link>
              <Link
                to="/contacto"
                className="text-xs tracking-[0.18em] uppercase px-10 py-4 
                           bg-[#D4541A] border border-[#D4541A] text-white
                           md:bg-transparent md:border-foreground md:text-foreground
                           md:hover:bg-[#D4541A] md:hover:border-[#D4541A] md:hover:text-white 
                           transition-colors duration-200 w-[200px] md:w-auto text-center inline-block"
              >
                Contactar ahora →
              </Link>
            </m.div>
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
