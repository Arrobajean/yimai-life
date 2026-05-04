import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "yimailife_cookie_consent";

type ConsentValue = "accepted" | "rejected" | null;

function getStoredConsent(): ConsentValue {
  try {
    const v = localStorage.getItem(COOKIE_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    // ignore
  }
  return null;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentValue>(() => getStoredConsent());
  const [visible, setVisible] = useState(false);

  // Pequeño delay para que el banner no aparezca antes de que cargue la página
  useEffect(() => {
    if (consent === null) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [consent]);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible && (
          <m.div
            key="cookie-banner"
            role="dialog"
            aria-live="polite"
            aria-label="Banner de cookies"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border"
          >
            {/* Contenedor interior centrado y achatado */}
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">

              {/* Texto */}
              <p className="flex-1 text-xs text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium tracking-[0.1em] uppercase mr-2">
                  Cookies.
                </span>
                Usamos cookies para mejorar tu experiencia y analizar el tráfico.{" "}
                <a
                  href="/politica-de-cookies"
                  className="underline underline-offset-2 hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                >
                  Más información
                </a>
                .
              </p>

              {/* Botones */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={reject}
                  className="text-xs tracking-[0.12em] uppercase border border-border
                             text-muted-foreground px-5 py-2
                             hover:border-foreground hover:text-foreground
                             transition-colors duration-200 whitespace-nowrap"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={accept}
                  className="text-xs tracking-[0.12em] uppercase
                             bg-foreground text-background px-5 py-2
                             hover:opacity-80 transition-opacity duration-200 whitespace-nowrap"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
