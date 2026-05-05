import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ProductCard } from "@/components/shopify/cards/ProductCard";
import { useCart } from "@/providers/CartProvider";
import { Product } from "@/types/product";
import { fadeUp } from "@/lib/motion";

const MOCK_COLLECTIONS = [
  { handle: "kraft-takeaway",    title: "Kraft & Takeaway" },
  { handle: "sushi-catering",    title: "Sushi & Catering" },
  { handle: "plastico-aluminio", title: "Plástico & Aluminio" },
  { handle: "accesorios",        title: "Accesorios" },
  { handle: "personalizacion",   title: "Personalización" },
];

const MOCK_PRODUCTS = [
  {
    handle: "caja-kraft-biodegradable",
    title: "Caja Kraft Biodegradable",
    collection: "kraft-takeaway",
    images: { edges: [{ node: { url: "", altText: "Caja Kraft" } }] },
    priceRange: { minVariantPrice: { amount: "0.45", currencyCode: "EUR" } },
  },
  {
    handle: "contenedor-hermetico-500ml",
    title: "Contenedor Hermético 500 ml",
    collection: "plastico-aluminio",
    images: { edges: [{ node: { url: "", altText: "Contenedor hermético" } }] },
    priceRange: { minVariantPrice: { amount: "0.89", currencyCode: "EUR" } },
  },
  {
    handle: "bandeja-compostable-l",
    title: "Bandeja Compostable L",
    collection: "sushi-catering",
    images: { edges: [{ node: { url: "", altText: "Bandeja compostable" } }] },
    priceRange: { minVariantPrice: { amount: "0.62", currencyCode: "EUR" } },
  },
  {
    handle: "vaso-papel-250ml",
    title: "Vaso de Papel 250 ml",
    collection: "accesorios",
    images: { edges: [{ node: { url: "", altText: "Vaso de papel" } }] },
    priceRange: { minVariantPrice: { amount: "0.18", currencyCode: "EUR" } },
  },
  {
    handle: "caja-personalizada-logo",
    title: "Caja con Logo Personalizado",
    collection: "personalizacion",
    images: { edges: [{ node: { url: "", altText: "Caja personalizada" } }] },
    priceRange: { minVariantPrice: { amount: "1.20", currencyCode: "EUR" } },
  },
  {
    handle: "tapa-transparente-universal",
    title: "Tapa Transparente Universal",
    collection: "plastico-aluminio",
    images: { edges: [{ node: { url: "", altText: "Tapa transparente" } }] },
    priceRange: { minVariantPrice: { amount: "0.22", currencyCode: "EUR" } },
  },
  {
    handle: "bolsa-papel-asas",
    title: "Bolsa de Papel con Asas",
    collection: "personalizacion",
    images: { edges: [{ node: { url: "", altText: "Bolsa de papel" } }] },
    priceRange: { minVariantPrice: { amount: "0.35", currencyCode: "EUR" } },
  },
  {
    handle: "contenedor-kraft-750ml",
    title: "Contenedor Kraft 750 ml",
    collection: "kraft-takeaway",
    images: { edges: [{ node: { url: "", altText: "Contenedor kraft" } }] },
    priceRange: { minVariantPrice: { amount: "0.78", currencyCode: "EUR" } },
  },
  {
    handle: "bandeja-aluminio-rectangular",
    title: "Bandeja Aluminio Rectangular",
    collection: "plastico-aluminio",
    images: { edges: [{ node: { url: "", altText: "Bandeja aluminio" } }] },
    priceRange: { minVariantPrice: { amount: "0.55", currencyCode: "EUR" } },
  },
  {
    handle: "etiqueta-personalizada",
    title: "Etiqueta Personalizada",
    collection: "personalizacion",
    images: { edges: [{ node: { url: "", altText: "Etiqueta personalizada" } }] },
    priceRange: { minVariantPrice: { amount: "0.08", currencyCode: "EUR" } },
  },
  {
    handle: "vaso-biodegradable-cafe",
    title: "Vaso Biodegradable para Café",
    collection: "accesorios",
    images: { edges: [{ node: { url: "", altText: "Vaso biodegradable" } }] },
    priceRange: { minVariantPrice: { amount: "0.24", currencyCode: "EUR" } },
  },
  {
    handle: "caja-pizza-kraft",
    title: "Caja Pizza Kraft",
    collection: "kraft-takeaway",
    images: { edges: [{ node: { url: "", altText: "Caja pizza kraft" } }] },
    priceRange: { minVariantPrice: { amount: "0.95", currencyCode: "EUR" } },
  },
];

// Fade for the grid container on collection switch
const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

function Toast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="toast-catalogo"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background
                     text-xs tracking-[0.1em] uppercase px-6 py-3 whitespace-nowrap"
        >
          Añadido al carrito ✓
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default function Catalogo() {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [activeCollection, setActiveCollection] = useState<string | null>(
    searchParams.get("collection")
  );
  const [toastVisible, setToastVisible] = useState(false);

  const filteredProducts = activeCollection
    ? MOCK_PRODUCTS.filter((p) => p.collection === activeCollection)
    : MOCK_PRODUCTS;

  const handleAddToCart = (handle: string) => {
    const raw = MOCK_PRODUCTS.find((p) => p.handle === handle);
    if (!raw) return;

    const product: Product = {
      id: raw.handle,
      title: raw.title,
      price: parseFloat(raw.priceRange.minVariantPrice.amount),
      description: "",
      image: raw.images.edges[0]?.node.url || "",
      category: raw.collection,
      inStock: true,
    };

    addToCart(product, 1);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <LazyMotion features={domAnimation}>
      <Toast visible={toastVisible} />

      <main className="min-h-screen">
        <section className="px-6 pt-32 pb-10 max-w-7xl mx-auto">
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4"
          >
            Catálogo
          </m.p>
          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            Todos los productos
          </m.h1>
        </section>

        {/* Filtros por colección */}
        <section className="px-6 pb-8 max-w-7xl mx-auto">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex flex-wrap gap-2"
          >
            <button
              onClick={() => setActiveCollection(null)}
              className={`text-xs tracking-[0.1em] uppercase px-4 py-2 border transition-colors duration-200 ${
                activeCollection === null
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              Todo
            </button>

            {MOCK_COLLECTIONS.map((col) => (
              <button
                key={col.handle}
                onClick={() => setActiveCollection(col.handle)}
                className={`text-xs tracking-[0.1em] uppercase px-4 py-2 border transition-colors duration-200 ${
                  activeCollection === col.handle
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {col.title}
              </button>
            ))}
          </m.div>
        </section>

        <div className="w-full h-px bg-border" />

        {/* Grid de productos */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <m.div
              key={activeCollection ?? "all"}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10"
            >
              {filteredProducts.map((product) => {
                const image = product.images.edges[0]?.node;
                return (
                  <ProductCard
                    key={product.handle}
                    handle={product.handle}
                    title={product.title}
                    imageUrl={image?.url || undefined}
                    imageAlt={image?.altText ?? undefined}
                    price={product.priceRange.minVariantPrice}
                    onAddToCart={handleAddToCart}
                  />
                );
              })}
            </m.div>
          </AnimatePresence>
        </section>
      </main>
    </LazyMotion>
  );
}
