import { useState } from "react"
import { useShopifyProductsList } from "@/components/shopify/hooks/useShopifyProductsList"
import { useShopifyCollections } from "@/components/shopify/hooks/useShopifyCollections"
import { Link } from "react-router-dom"

export default function Catalogo() {
  const [activeCollection, setActiveCollection] = useState<string | null>(null)

  const { collections, loading: loadingCollections } = useShopifyCollections({ first: 10 })
  const { products, loading: loadingProducts } = useShopifyProductsList({
    first: 24,
    collectionHandle: activeCollection || undefined,
  })

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="px-6 pt-32 pb-12 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Catálogo
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          Todos los productos
        </h1>
      </section>

      {/* Filtros por colección */}
      <section className="px-6 pb-10 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCollection(null)}
            className={`text-xs tracking-[0.12em] uppercase px-4 py-2 border transition-colors ${
              activeCollection === null
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            Todo
          </button>
          {!loadingCollections &&
            collections?.map((col: { handle: string; title: string }) => (
              <button
                key={col.handle}
                onClick={() => setActiveCollection(col.handle)}
                className={`text-xs tracking-[0.12em] uppercase px-4 py-2 border transition-colors ${
                  activeCollection === col.handle
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {col.title}
              </button>
            ))}
        </div>
      </section>

      {/* Separador */}
      <div className="w-full h-px bg-border" />

      {/* Grid de productos */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        {loadingProducts ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-muted animate-pulse" />
                <div className="h-3 bg-muted animate-pulse w-3/4" />
                <div className="h-3 bg-muted animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: {
              handle: string;
              images: { edges: Array<{ node: { url: string; altText: string | null } }> };
              title: string;
              priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
            }) => {
              const image = product.images.edges[0]?.node
              const price = product.priceRange.minVariantPrice
              const formatted = new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: price.currencyCode,
              }).format(parseFloat(price.amount))

              return (
                <Link
                  key={product.handle}
                  to={`/product/${product.handle}`}
                  className="group block"
                >
                  <div className="aspect-square overflow-hidden bg-secondary mb-3">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <p className="text-sm font-medium truncate">{product.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{formatted}</p>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-sm">No hay productos disponibles.</p>
          </div>
        )}
      </section>
    </main>
  )
}
