import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

const infoBlocks = [
  {
    label: "Email",
    content: "hola@yimailife.com",
    href: "mailto:hola@yimailife.com",
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
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="px-6 pt-32 pb-16 max-w-2xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6"
        >
          Contacto
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6"
        >
          Hablemos.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-muted-foreground leading-relaxed"
        >
          ¿Tienes alguna pregunta sobre un pedido, un producto o simplemente
          quieres saludarnos? Escríbenos y te respondemos en menos de 24 horas.
        </motion.p>
      </section>

      <div className="w-full h-px bg-border" />

      {/* ── Info + Formulario ── */}
      <div className="px-6 py-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-16">

        {/* Bloque de información */}
        <div className="space-y-10">
          {infoBlocks.map((block, i) => (
            <motion.div
              key={block.label}
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
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
            </motion.div>
          ))}
        </div>

        {/* Formulario */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="py-12"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Enviado
              </p>
              <p className="text-lg font-light">
                Gracias por escribirnos.<br />
                Te respondemos pronto.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                { name: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
              ].map((field, i) => (
                <motion.div
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
                </motion.div>
              ))}

              <motion.div
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
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3}
              >
                <button
                  type="submit"
                  className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3
                             hover:bg-foreground hover:text-background transition-colors duration-200"
                >
                  Enviar mensaje
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>

      <div className="w-full h-px bg-border" />

      {/* ── Mapa (mock Google Maps embed) ── */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Ubicación
          </p>
          <p className="text-sm text-muted-foreground">
            Calle Industria, 42 · 28001 Madrid, España
          </p>
        </motion.div>

        <motion.div
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
        </motion.div>
      </section>

    </main>
  );
}
