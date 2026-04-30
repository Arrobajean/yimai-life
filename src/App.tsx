import { Routes, Route, Link, useLocation } from "react-router-dom"
import QuienesSomos from "./pages/QuienesSomos"
import Catalogo from "./pages/Catalogo"
import Contacto from "./pages/Contacto"

function Nav() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/catalogo", label: "Catálogo" },
    { to: "/quienes-somos", label: "Quiénes somos" },
    { to: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-sm font-medium tracking-widest uppercase">
          Yimai Life
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs tracking-[0.12em] uppercase transition-colors ${
                pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Bienvenido
        </p>
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-8">
          Yimai Life
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Productos seleccionados con criterio.
        </p>
        <Link
          to="/catalogo"
          className="text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors inline-block"
        >
          Ver catálogo
        </Link>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  )
}
