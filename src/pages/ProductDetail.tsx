import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartProvider";
import { Product } from "@/types/product";
import { fadeUp } from "@/lib/motion";

const MOCK_PRODUCTS = [
  {
    handle: "caja-kraft-biodegradable",
    title: "Caja Kraft Biodegradable",
    collection: "Kraft & Takeaway",
    description:
      "Fabricada con fibra de kraft 100 % reciclada, esta caja es ideal para llevar alimentos calientes. Resistente a la grasa y a la humedad, mantiene la estructura incluso a temperaturas elevadas. Certificada para uso alimentario.",
    features: ["100 % reciclable", "Resistente a grasa y humedad", "Apta para microondas"],
    images: [
      { url: "", altText: "Caja Kraft Biodegradable – Vista frontal" },
      { url: "", altText: "Caja Kraft Biodegradable – Vista lateral" },
      { url: "", altText: "Caja Kraft Biodegradable – Interior" },
    ],
    priceRange: { minVariantPrice: { amount: "0.45", currencyCode: "EUR" } },
    variants: ["Pequeña (18×12 cm)", "Mediana (22×16 cm)", "Grande (28×20 cm)"],
  },
  {
    handle: "contenedor-hermetico-500ml",
    title: "Contenedor Hermético 500 ml",
    collection: "Plástico & Aluminio",
    description:
      "Contenedor hermético de 500 ml con cierre de clip. Perfecto para ensaladas, sopas y platos fríos. Apto para lavavajillas y microondas. Fabricado en plástico reciclado libre de BPA.",
    features: ["Libre de BPA", "Apto para lavavajillas", "Cierre hermético de 4 clips"],
    images: [
      { url: "", altText: "Contenedor Hermético 500 ml" },
      { url: "", altText: "Contenedor Hermético 500 ml – Detalle cierre" },
    ],
    priceRange: { minVariantPrice: { amount: "0.89", currencyCode: "EUR" } },
    variants: ["500 ml", "750 ml", "1 000 ml"],
  },
  {
    handle: "bandeja-compostable-l",
    title: "Bandeja Compostable L",
    collection: "Sushi & Catering",
    description:
      "Bandeja de almidón de maíz compostable certificada según EN 13432. Se descompone en menos de 90 días en compostaje industrial. Ideal para supermercados y restaurantes que priorizan la sostenibilidad.",
    features: ["Compostable EN 13432", "Sin plásticos", "Apta para contacto con alimentos frescos"],
    images: [{ url: "", altText: "Bandeja Compostable L" }],
    priceRange: { minVariantPrice: { amount: "0.62", currencyCode: "EUR" } },
    variants: ["Tamaño M", "Tamaño L", "Tamaño XL"],
  },
  {
    handle: "vaso-papel-250ml",
    title: "Vaso de Papel 250 ml",
    collection: "Accesorios",
    description:
      "Vaso de papel con recubrimiento interior de PE para bebidas calientes. Doble pared para mayor aislamiento térmico. Disponible sin impresión o con impresión personalizada a partir de 5 000 uds.",
    features: ["Doble pared aislante", "Compatible con tapas estándar", "Personalizable"],
    images: [{ url: "", altText: "Vaso de Papel 250 ml" }],
    priceRange: { minVariantPrice: { amount: "0.18", currencyCode: "EUR" } },
    variants: ["250 ml", "350 ml", "500 ml"],
  },
  {
    handle: "caja-personalizada-logo",
    title: "Caja con Logo Personalizado",
    collection: "Personalización",
    description:
      "Caja de cartón microcorrugado con impresión digital de alta resolución. Mínimo 500 unidades. Posibilidad de acabados satinados, mate o con barniz selectivo. Entrega en 10 días hábiles.",
    features: ["Impresión digital 4+0", "Mínimo 500 uds.", "Acabados premium"],
    images: [
      { url: "", altText: "Caja con Logo Personalizado – Frontal" },
      { url: "", altText: "Caja con Logo Personalizado – Detalle impresión" },
      { url: "", altText: "Caja con Logo Personalizado – Acabado mate" },
    ],
    priceRange: { minVariantPrice: { amount: "1.20", currencyCode: "EUR" } },
    variants: ["Pequeña", "Mediana", "Grande", "A medida"],
  },
  {
    handle: "tapa-transparente-universal",
    title: "Tapa Transparente Universal",
    collection: "Plástico & Aluminio",
    description:
      "Tapa de PET transparente compatible con la mayoría de contenedores redondos estándar del mercado. Permite ver el contenido del envase sin abrirlo. Apta para presentación en lineales de supermercado.",
    features: ["Compatible con envases estándar", "PET reciclado", "Cierre de presión"],
    images: [{ url: "", altText: "Tapa Transparente Universal" }],
    priceRange: { minVariantPrice: { amount: "0.22", currencyCode: "EUR" } },
    variants: ["Ø 95 mm", "Ø 110 mm", "Ø 135 mm"],
  },
  {
    handle: "bolsa-papel-asas",
    title: "Bolsa de Papel con Asas",
    collection: "Personalización",
    description:
      "Bolsa de papel kraft con asas retorcidas de papel. Fondo reforzado para cargas de hasta 5 kg. Disponible natural o con impresión 1 tinta. Ideal para panadería, delicatessen y take-away.",
    features: ["Fondo reforzado", "Asas retorcidas resistentes", "Impresión opcional"],
    images: [{ url: "", altText: "Bolsa de Papel con Asas" }],
    priceRange: { minVariantPrice: { amount: "0.35", currencyCode: "EUR" } },
    variants: ["S (18×22 cm)", "M (24×28 cm)", "L (32×36 cm)"],
  },
  {
    handle: "contenedor-kraft-750ml",
    title: "Contenedor Kraft 750 ml",
    collection: "Kraft & Takeaway",
    description:
      "Contenedor de fibra de kraft prensado. Sin plásticos en su composición. Apto para alimentos húmedos y grasos. Se puede introducir en el horno hasta 180 °C durante 20 minutos.",
    features: ["Sin plásticos", "Apto horno hasta 180 °C", "Biodegradable"],
    images: [{ url: "", altText: "Contenedor Kraft 750 ml" }],
    priceRange: { minVariantPrice: { amount: "0.78", currencyCode: "EUR" } },
    variants: ["500 ml", "750 ml", "1 000 ml"],
  },
  {
    handle: "bandeja-aluminio-rectangular",
    title: "Bandeja Aluminio Rectangular",
    collection: "Plástico & Aluminio",
    description:
      "Bandeja de aluminio de calibre grueso, reutilizable hasta 3 veces si se lava correctamente. Excelente conductor del calor para cocción uniforme. Apta para congelador, horno y vitrocerámica.",
    features: ["Apta para congelador y horno", "Reutilizable", "Reciclable 100 %"],
    images: [{ url: "", altText: "Bandeja Aluminio Rectangular" }],
    priceRange: { minVariantPrice: { amount: "0.55", currencyCode: "EUR" } },
    variants: ["Pequeña", "Mediana", "Grande", "Familiar"],
  },
  {
    handle: "etiqueta-personalizada",
    title: "Etiqueta Personalizada",
    collection: "Personalización",
    description:
      "Etiqueta autoadhesiva impresa en papel o material sintético. Acabados gloss, mate o kraft. Apta para superficies irregulares y ambientes de humedad moderada. Adhesivo de calidad alimentaria.",
    features: ["Adhesivo apto alimentario", "Personalización total", "Mínimo 1 000 uds."],
    images: [{ url: "", altText: "Etiqueta Personalizada" }],
    priceRange: { minVariantPrice: { amount: "0.08", currencyCode: "EUR" } },
    variants: ["Redonda", "Rectangular", "Ovalada", "Forma personalizada"],
  },
  {
    handle: "vaso-biodegradable-cafe",
    title: "Vaso Biodegradable para Café",
    collection: "Accesorios",
    description:
      "Vaso elaborado con papel certificado FSC y recubrimiento de PLA (ácido poliláctico) de origen vegetal. Compostable en planta de compostaje industrial. Resistente hasta 95 °C.",
    features: ["Certificado FSC", "Recubrimiento PLA vegetal", "Resistente a 95 °C"],
    images: [{ url: "", altText: "Vaso Biodegradable para Café" }],
    priceRange: { minVariantPrice: { amount: "0.24", currencyCode: "EUR" } },
    variants: ["150 ml", "250 ml", "350 ml"],
  },
  {
    handle: "caja-pizza-kraft",
    title: "Caja Pizza Kraft",
    collection: "Kraft & Takeaway",
    description:
      "Caja de pizza de cartón kraft ondulado. Canales de ventilación en la tapa para evitar condensación. Impresión 1 tinta incluida. La referencia del sector para pizzerías con consciencia ambiental.",
    features: ["Canales de ventilación", "Cartón ondulado resistente", "Impresión incluida"],
    images: [
      { url: "", altText: "Caja Pizza Kraft – Cerrada" },
      { url: "", altText: "Caja Pizza Kraft – Abierta" },
    ],
    priceRange: { minVariantPrice: { amount: "0.95", currencyCode: "EUR" } },
    variants: ['24 cm (9")', '30 cm (12")', '36 cm (14")', '40 cm (16")'],
  },
];

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

function ImageCarousel({ images }: { images: { url: string; altText: string }[] }) {
  const [active, setActive] = useState(0);
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
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {images[active]?.url ? (
              <img
                src={images[active].url}
                alt={images[active].altText}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-end p-6">
                <span className="text-[11px] text-muted-foreground/40 uppercase tracking-widest">
                  {images[active]?.altText ?? "Imagen no disponible"}
                </span>
              </div>
            )}
          </m.div>
        </AnimatePresence>

        {hasMultiple && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8
                         bg-background/80 backdrop-blur-sm border border-border
                         flex items-center justify-center
                         hover:bg-background transition-colors duration-200 text-xs"
            >
              ←
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % images.length)}
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
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden border transition-colors duration-200 ${
                active === i ? "border-foreground" : "border-border hover:border-foreground/50"
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
                     hover:bg-foreground hover:text-background transition-colors duration-200"
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
        <section className="px-6 pt-24 pb-4 max-w-5xl mx-auto">
          <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/catalogo" className="hover:text-foreground transition-colors duration-200">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </section>

        {/* Producto */}
        <section className="px-6 py-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          <ImageCarousel images={product.images} />

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
              <span className="ml-2 text-sm text-muted-foreground">/ ud.</span>
            </p>

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
                           px-8 py-3 hover:opacity-80 transition-opacity duration-200"
              >
                Añadir al carrito
              </button>
              <Link
                to="/contacto"
                className="flex-1 text-center text-xs tracking-[0.15em] uppercase border border-border
                           px-8 py-3 hover:border-foreground hover:text-foreground transition-colors duration-200"
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
