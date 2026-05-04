import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Catalogo from "./pages/Catalogo";
import Contacto from "./pages/Contacto";
import ProductDetail from "./pages/ProductDetail";
import Carrito from "./pages/Carrito";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Resets scroll on every route change */}
      <ScrollToTop />

      {/* Cookie consent banner */}
      <CookieBanner />

      {/* Header – persiste en todas las rutas */}
      <Nav />

      {/* Contenido de cada página */}
      <div className="flex-1 pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>

      {/* Footer – persiste en todas las rutas */}
      <Footer />
    </div>
  );
}
