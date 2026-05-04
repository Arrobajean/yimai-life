import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartProvider";

const navLinks = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/contacto", label: "Contacto" },
];

// Icono carrito SVG
function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">

        {/* ── Desktop layout ──────────────────────────────────────────────────────
            [Logo izq] ────── [links centrados] ────── [carrito der]             */}
        <div className="hidden md:grid grid-cols-3 items-center max-w-6xl mx-auto px-6 h-14">
          {/* Col 1 – Logo a la izquierda */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-sm font-medium tracking-widest uppercase"
              aria-label="Ir a la página principal de Yimai Life"
            >
              Yimai Life
            </Link>
          </div>

          {/* Col 2 – Links centrados */}
          <nav aria-label="Navegación principal" className="flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={pathname === link.to ? "page" : undefined}
                className={`text-xs tracking-[0.12em] uppercase transition-colors duration-200 ${
                  pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Col 3 – Carrito a la derecha */}
          <div className="flex items-center justify-end">
            <Link
              to="/carrito"
              aria-label={`Carrito${itemCount > 0 ? `, ${itemCount} artículos` : ""}`}
              className="relative flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <CartIcon />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge-desktop"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground text-background
                               flex items-center justify-center text-[9px] font-medium tabular-nums leading-none"
                    aria-hidden="true"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>

        {/* ── Mobile layout ───────────────────────────────────────────────────────
            [carrito izq] ── [logo centrado] ── [hamburguesa der]               */}
        <div className="md:hidden flex items-center justify-between px-6 h-14">
          {/* Izquierda – Carrito */}
          <Link
            to="/carrito"
            aria-label={`Carrito${itemCount > 0 ? `, ${itemCount} artículos` : ""}`}
            className="relative flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <CartIcon />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key="badge-mobile"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground text-background
                             flex items-center justify-center text-[9px] font-medium tabular-nums leading-none"
                  aria-hidden="true"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Centro – Logo */}
          <Link
            to="/"
            className="text-sm font-medium tracking-widest uppercase absolute left-1/2 -translate-x-1/2"
            aria-label="Ir a la página principal"
          >
            Yimai Life
          </Link>

          {/* Derecha – Hamburguesa */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative w-8 h-8 flex items-center justify-center"
          >
            <span className="sr-only">{open ? "Cerrar" : "Menú"}</span>
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-[5px]">
              <motion.span
                animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="block h-px w-5 bg-foreground"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-px w-5 bg-foreground"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="block h-px w-5 bg-foreground"
              />
            </span>
          </button>
        </div>

        {/* Mobile menu desplegable */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              key="mobile-menu"
              aria-label="Menú móvil"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border bg-background"
            >
              <div className="flex flex-col items-center px-6 py-5 gap-5 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={pathname === link.to ? "page" : undefined}
                    className={`text-xs tracking-[0.12em] uppercase transition-colors duration-200 ${
                      pathname === link.to ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
