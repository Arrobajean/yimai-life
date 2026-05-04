import { Link } from "react-router-dom";

const navLinks = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/contacto", label: "Contacto" },
];

const legalLinks = [
  { to: "/politica-de-reembolso", label: "Política de reembolso" },
  { to: "/politica-de-privacidad", label: "Política de privacidad" },
  { to: "/terminos-del-servicio", label: "Términos del servicio" },
  { to: "/informacion-de-contacto", label: "Información de contacto" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">

      {/* ── Cuerpo del footer ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Mobile: apilado centrado / Desktop: 3 cols */}
        <div className="grid gap-10 text-center sm:text-left sm:grid-cols-3">

          {/* Col 1 – Marca */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <Link
              to="/"
              className="text-sm font-medium tracking-widest uppercase"
              aria-label="Inicio"
            >
              Yimai Life
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              Tu Socio de Confianza en Envases para Alimentos, Comprometido con
              la Calidad y la Sostenibilidad.
            </p>
          </div>

          {/* Col 2 – Páginas */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Páginas
            </p>
            <nav aria-label="Navegación del pie de página" className="flex flex-col gap-3 items-center sm:items-start">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 – Legal */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Legal
            </p>
            <nav aria-label="Páginas legales" className="flex flex-col gap-3 items-center sm:items-start">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>
      </div>

      {/* ── Barra inferior ── */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Yimai Life. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Sitio desarrollado por{" "}
            <a
              href="https://www.404studios.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors duration-200"
            >
              404studios
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
