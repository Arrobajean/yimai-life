import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartProvider";
import { Product } from "@/types/product";
import { fadeUp, dividerLine } from "@/lib/motion";
import { MOCK_PRODUCTS } from "@/data/products";

const formatPrice = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: currencyCode }).format(
    parseFloat(amount)
  );

function Toast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="toast"
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

function ImageCarousel({
  images,
  activeIndex,
  onActiveChange,
}: {
  images: { url: string; altText: string }[];
  activeIndex: number;
  onActiveChange: (i: number) => void;
}) {
  const clampedIndex = Math.min(activeIndex, images.length - 1);
  const hasMultiple = images.length > 1;

  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="flex flex-col gap-3"
    >
      {/* Imagen principal */}
      <div className="aspect-square bg-secondary w-full overflow-hidden relative">
        <AnimatePresence mode="wait">
          <m.div
            key={clampedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {images[clampedIndex]?.url ? (
              <img
                src={images[clampedIndex].url}
                alt={images[clampedIndex].altText}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-end p-6">
                <span className="text-[11px] text-muted-foreground/40 uppercase tracking-widest">
                  {images[clampedIndex]?.altText ?? "Imagen no disponible"}
                </span>
              </div>
            )}
          </m.div>
        </AnimatePresence>

        {hasMultiple && (
          <>
            <button
              onClick={() => onActiveChange((clampedIndex - 1 + images.length) % images.length)}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8
                         bg-background/80 backdrop-blur-sm border border-border
                         flex items-center justify-center
                         hover:bg-background transition-colors duration-200 text-xs"
            >
              ←
            </button>
            <button
              onClick={() => onActiveChange((clampedIndex + 1) % images.length)}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8
                         bg-background/80 backdrop-blur-sm border border-border
                         flex items-center justify-center
                         hover:bg-background transition-colors duration-200 text-xs"
            >
              →
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onActiveChange(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden border transition-colors duration-200 ${
                clampedIndex === i ? "border-foreground" : "border-border hover:border-foreground/50"
              }`}
            >
              {img.url ? (
                <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-[9px] text-muted-foreground/40 uppercase tracking-widest text-center px-1">
                    {i + 1}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </m.div>
  );
}

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.handle === handle);

  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    const variantTitle = product.variants?.[selectedVariant] || "Default Title";
    const productId = `${product.handle}-${selectedVariant}`;

    const productItem: Product = {
      id: productId,
      title: product.title,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      description: product.description,
      image: product.images[0]?.url || "",
      category: product.collection,
      inStock: true,
      features: product.features,
      sku: product.sku,
      boxUnits: product.boxUnits,
      variant: {
        id: productId,
        title: variantTitle,
        price: parseFloat(product.priceRange.minVariantPrice.amount),
      },
    };

    addToCart(productItem, qty);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Producto no encontrado
        </p>
        <Link
          to="/catalogo"
          className="text-xs tracking-[0.15em] uppercase border border-foreground px-6 py-2
                     hover:bg-[#1E4D2B] hover:border-[#1E4D2B] hover:text-white transition-colors duration-200"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const price = product.priceRange.minVariantPrice;

  return (
    <LazyMotion features={domAnimation}>
      <Toast visible={toastVisible} />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <m.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="px-6 pt-24 pb-4 max-w-5xl mx-auto"
        >
          <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/catalogo" className="hover:text-[#D4541A] transition-colors duration-200">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </m.section>

        {/* Producto */}
        <section className="px-6 py-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          <ImageCarousel
            images={product.imagesList || []}
            activeIndex={selectedVariant}
            onActiveChange={setSelectedVariant}
          />

          {/* Info */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex flex-col gap-6"
          >
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              {product.collection}
            </p>

            <h1 className="text-3xl md:text-4xl font-light leading-tight tracking-tight">
              {product.title}
            </h1>

            <p className="text-xl font-light">
              {formatPrice(price.amount, price.currencyCode)}
              <span className="ml-2 text-sm text-muted-foreground">/ caja</span>
            </p>

            {(product.sku || product.boxUnits) && (
              <p className="text-xs text-muted-foreground font-mono">
                {product.sku && `REF: ${product.sku}`} {product.sku && product.boxUnits && " | "} {product.boxUnits && `Caja: ${product.boxUnits}`}
              </p>
            )}

            <div className="w-full h-px bg-border" />

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <ul className="flex flex-col gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 rounded-full bg-foreground flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="w-full h-px bg-border" />

            {/* Selector de variante */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Formato
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(i)}
                    className={`text-xs px-3 py-2 border transition-colors duration-200 whitespace-nowrap ${
                      selectedVariant === i
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Cantidad
              </p>
              <div className="inline-flex items-center border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                  className="w-10 h-10 flex items-center justify-center text-lg text-muted-foreground
                             hover:text-foreground hover:bg-secondary transition-colors duration-200"
                >
                  –
                </button>
                <span className="w-12 text-center text-sm tabular-nums select-none">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-9 h-9 flex items-center justify-center text-muted-foreground
                             hover:text-foreground transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 text-xs tracking-[0.15em] uppercase bg-foreground text-background
                           px-8 py-3 hover:bg-[#1E4D2B] transition-colors duration-200"
              >
                Añadir al carrito
              </button>
              <Link
                to="/contacto"
                className="flex-1 text-center text-xs tracking-[0.15em] uppercase border border-border
                           px-8 py-3 hover:border-[#1E4D2B] hover:text-[#1E4D2B] transition-colors duration-200"
              >
                Solicitar presupuesto
              </Link>
            </div>
          </m.div>
        </section>
      </main>
    </LazyMotion>
  );
}
