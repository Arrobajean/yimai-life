import { Link } from "react-router-dom";
import { LazyMotion, domAnimation, m, AnimatePresence, Variants } from "framer-motion";
import { useCart } from "@/providers/CartProvider";
import { fadeUp, dividerLine } from "@/lib/motion";

const formatPrice = (amount: number, currency = "EUR") =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(amount);

// Keeps exit animation — enter/visible aligned with fadeUp timing
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.06 },
  }),
  exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
};

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const isEmpty = cart.items.length === 0;

  const handleCheckout = () => {
    alert("Checkout con Shopify — configura VITE_SHOPIFY_STORE_DOMAIN para activarlo.");
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen">

        {/* Cabecera */}
        <section className="px-6 pt-28 pb-8 max-w-6xl mx-auto">
          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3"
          >
            Mi pedido
          </m.p>
          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-3xl md:text-4xl font-light tracking-tight"
          >
            Carrito de compra
          </m.h1>
        </section>

        <m.div
          variants={dividerLine}
          initial="hidden"
          animate="visible"
          custom={0.3}
          style={{ originX: 0 }}
          className="w-full h-px bg-border"
        />

        {isEmpty ? (
          /* ── Carrito vacío ── */
          <section className="px-6 py-24 max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <p className="text-5xl mb-6">🛒</p>
              <p className="text-lg font-light text-muted-foreground mb-8">
                Tu carrito está vacío.
              </p>
              <Link
                to="/catalogo"
                className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3
                           hover:bg-[#1E4D2B] hover:border-[#1E4D2B] hover:text-white transition-colors duration-200 inline-block"
              >
                Explorar catálogo
              </Link>
            </m.div>
          </section>
        ) : (
          /* ── Layout principal: lista + resumen ── */
          <section className="px-6 py-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">

            {/* ── Lista de productos ── */}
            <div>
              <AnimatePresence mode="popLayout">
                {cart.items.map((item, i) => (
                  <m.article
                    key={item.product.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={i}
                    className="flex gap-4 sm:gap-6 py-6 border-b border-border last:border-b-0"
                  >
                    {/* Imagen */}
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-muted overflow-hidden block"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary" />
                      )}
                    </Link>

                    {/* Info + controles */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-sm font-medium hover:opacity-70 transition-opacity duration-200 line-clamp-2 block"
                        >
                          {item.product.title}
                        </Link>
                        {item.product.variant?.title &&
                          item.product.variant.title !== "Default Title" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.product.variant.title}
                            </p>
                          )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatPrice(item.product.price)} / ud.
                        </p>
                      </div>

                      {/* Cantidad + subtotal + eliminar */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Reducir cantidad"
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground
                                       hover:text-foreground transition-colors duration-200"
                          >
                            –
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Aumentar cantidad"
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground
                                       hover:text-foreground transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-medium w-16 text-right tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={`Eliminar ${item.product.title}`}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </m.article>
                ))}
              </AnimatePresence>

              <div className="pt-8">
                <Link
                  to="/catalogo"
                  className="text-xs tracking-[0.12em] uppercase text-muted-foreground
                             hover:text-[#D4541A] transition-colors duration-200"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </div>

            {/* ── Resumen del pedido ── */}
            <m.aside
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="lg:sticky lg:top-24 border border-border p-6 flex flex-col gap-5"
            >
              <p className="text-xs tracking-[0.2em] uppercase">Resumen del pedido</p>

              <div className="w-full h-px bg-border" />

              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Subtotal&nbsp;
                    <span className="tabular-nums">
                      ({cart.totalItems} {cart.totalItems === 1 ? "artículo" : "artículos"})
                    </span>
                  </dt>
                  <dd className="tabular-nums">{formatPrice(cart.totalPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Envío</dt>
                  <dd className="text-muted-foreground text-xs">Calculado en checkout</dd>
                </div>
              </dl>

              <div className="w-full h-px bg-border" />

              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium">Total estimado</span>
                <span className="text-lg font-light tabular-nums">
                  {formatPrice(cart.totalPrice)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full text-xs tracking-[0.15em] uppercase bg-foreground text-background
                           py-3 hover:bg-[#1E4D2B] transition-colors duration-200"
              >
                Ir al checkout →
              </button>

              <div className="flex flex-col gap-2 pt-1">
                {["Pago 100 % seguro", "Envío a toda España", "ISO 9001 · ISO 14001"].map((b) => (
                  <p key={b} className="text-[10px] text-muted-foreground flex items-center gap-2">
                    <span>✓</span>
                    {b}
                  </p>
                ))}
              </div>
            </m.aside>
          </section>
        )}
      </main>
    </LazyMotion>
  );
}
