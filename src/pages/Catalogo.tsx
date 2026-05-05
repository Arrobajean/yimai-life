import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ProductCard } from "@/components/shopify/cards/ProductCard";
import { useCart } from "@/providers/CartProvider";
import { Product } from "@/types/product";
import { fadeUp, dividerLine } from "@/lib/motion";
import { MOCK_PRODUCTS, MOCK_COLLECTIONS } from "@/data/products";

// Grid container: fades in and staggers child cards on collection switch
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, staggerChildren: 0.06, delayChildren: 0.05 },
  },
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
      sku: raw.sku,
      boxUnits: raw.boxUnits,
    };

    addToCart(product, 1);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <LazyMotion features={domAnimation}>
      <Toast visible={toastVisible} />

      <main className="min-h-screen">
        <section className="px-6 pt-40 pb-20 max-w-7xl mx-auto text-center">
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6"
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
        <section className="px-6 pb-12 max-w-7xl mx-auto">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              onClick={() => setActiveCollection(null)}
              className={`text-[10px] tracking-[0.15em] uppercase px-6 py-2.5 border transition-all duration-200 ${
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
                className={`text-[10px] tracking-[0.15em] uppercase px-6 py-2.5 border transition-all duration-200 ${
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

        <m.div
          variants={dividerLine}
          initial="hidden"
          animate="visible"
          custom={0.45}
          style={{ originX: 0 }}
          className="w-full h-px bg-border"
        />

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
