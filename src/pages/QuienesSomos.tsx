export default function QuienesSomos() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="px-6 pt-32 pb-24 max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Quiénes somos
        </p>
        <h1 className="text-4xl md:text-5xl font-light leading-tight tracking-tight mb-8">
          Vivir bien<br />con lo que importa.
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Yimai Life nació de una idea simple: que los productos que usamos
          cada día deberían ser buenos — para nosotros y para el mundo.
        </p>
      </section>

      {/* Separador */}
      <div className="w-full h-px bg-border" />

      {/* Misión */}
      <section className="px-6 py-24 max-w-2xl mx-auto">
        <div className="grid gap-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Nuestra misión
            </p>
            <p className="text-lg font-light leading-relaxed">
              Seleccionamos productos con criterio. Cada artículo que encontrarás
              en Yimai Life ha pasado por nuestra revisión: calidad real,
              materiales honestos, precios justos.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Nuestra visión
            </p>
            <p className="text-lg font-light leading-relaxed">
              Un lugar donde comprar no es un acto de impulso, sino de
              confianza. Menos ruido, mejores elecciones.
            </p>
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="w-full h-px bg-border" />

      {/* Valores */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12">
          Lo que nos define
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Honestidad",
              description:
                "Describimos lo que vendemos tal como es. Sin exageraciones, sin letra pequeña.",
            },
            {
              title: "Selección",
              description:
                "Preferimos tener menos productos y que cada uno valga la pena.",
            },
            {
              title: "Cercanía",
              description:
                "Somos un equipo pequeño. Cada pedido, cada consulta, tiene respuesta real.",
            },
          ].map((value) => (
            <div key={value.title}>
              <h3 className="text-sm font-medium mb-3">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
