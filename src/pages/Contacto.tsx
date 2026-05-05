import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { fadeUp, dividerLine } from "@/lib/motion";

const infoBlocks = [
  {
    label: "Email",
    content: "info@yimailife.es",
    href: "mailto:info@yimailife.es",
  },
  {
    label: "Teléfono",
    content: "655 54 15 20",
    href: "tel:+34655541520",
  },
  {
    label: "Horario",
    content: "Lunes – Viernes\n9:00 – 18:00 (CET)",
  },
  {
    label: "Pedidos & envíos",
    content: "Para consultas sobre pedidos incluye tu número de referencia en el mensaje.",
  },
];

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen">

        {/* ── Hero ── */}
        <section className="px-6 pt-40 pb-24 max-w-4xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6"
          >
            Contacto
          </m.p>
          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
          >
            Hablemos.
          </m.h1>
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-sm font-light leading-relaxed text-muted-foreground max-w-lg mx-auto"
          >
            ¿Tienes alguna pregunta sobre un pedido, un producto o simplemente
            quieres saludarnos? Escríbenos y te respondemos en menos de 24 horas.
          </m.p>
        </section>

        <m.div
          variants={dividerLine}
          initial="hidden"
          animate="visible"
          custom={0.45}
          style={{ originX: 0 }}
          className="w-full h-px bg-border"
        />

        {/* ── Info + Formulario ── */}
        <div className="px-6 py-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Bloque de información */}
          <div className="space-y-10">
            {infoBlocks.map((block, i) => (
              <m.div
                key={block.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
              >
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  {block.label}
                </p>
                {block.href ? (
                  <a
                    href={block.href}
                    className="text-sm hover:opacity-70 transition-opacity duration-200"
                  >
                    {block.content}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {block.content}
                  </p>
                )}
              </m.div>
            ))}
          </div>

          {/* Formulario */}
          <div>
            {sent ? (
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="py-12"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Enviado
                </p>
                <p className="text-lg font-light">
                  Gracias por escribirnos.<br />
                  Te respondemos pronto.
                </p>
              </m.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                  { name: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
                ].map((field, i) => (
                  <m.div
                    key={field.name}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.1}
                  >
                    <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full border-b border-border bg-transparent py-2 text-sm outline-none
                                 focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                      placeholder={field.placeholder}
                    />
                  </m.div>
                ))}

                <m.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.2}
                >
                  <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border-b border-border bg-transparent py-2 text-sm outline-none
                               focus:border-foreground transition-colors placeholder:text-muted-foreground/50 resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </m.div>

                <m.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.3}
                >
                  <button
                    type="submit"
                    className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3
                               hover:bg-[#1E4D2B] hover:border-[#1E4D2B] hover:text-white transition-colors duration-200"
                  >
                    Enviar mensaje
                  </button>
                </m.div>
              </form>
            )}
          </div>
        </div>

        <m.div
          variants={dividerLine}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          style={{ originX: 0 }}
          className="w-full h-px bg-border"
        />

        {/* ── Ubicación ── */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-8"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Ubicación
            </p>
            <p className="text-sm text-muted-foreground">
              Calle Industria, 42 · 28001 Madrid, España
            </p>
          </m.div>

          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="w-full overflow-hidden border border-border"
            style={{ height: "380px" }}
          >
            <iframe
              title="Ubicación YIMAILIFE"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.177777564899!2d-3.700346984581842!3d40.41654807936537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228896e72bc45%3A0xedf2c71afc18a02a!2sMadrid%2C%20Spain!5e0!3m2!1sen!2ses!4v1697000000000!5m2!1sen!2ses"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) contrast(0.9) opacity(0.85)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </m.div>
        </section>

      </main>
    </LazyMotion>
  );
}
