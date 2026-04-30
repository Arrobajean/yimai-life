import { useState } from "react"

export default function Contacto() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: conectar con tu servicio de email (EmailJS, Resend, etc.)
    setSent(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="px-6 pt-32 pb-16 max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Contacto
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">
          Hablemos.
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          ¿Tienes alguna pregunta sobre un pedido, un producto o simplemente
          quieres saludarnos? Escríbenos y te respondemos en menos de 24 horas.
        </p>
      </section>

      {/* Separador */}
      <div className="w-full h-px bg-border" />

      <div className="px-6 py-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div className="space-y-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Email
            </p>
            <p className="text-sm">hola@yimailife.com</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Horario
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lunes – Viernes<br />
              9:00 – 18:00 (CET)
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Pedidos & envíos
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Para consultas sobre pedidos incluye tu número de referencia en el mensaje.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div>
          {sent ? (
            <div className="py-12">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Enviado
              </p>
              <p className="text-lg font-light">
                Gracias por escribirnos.<br />
                Te respondemos pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50 resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
