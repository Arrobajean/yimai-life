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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditorPage from "./pages/admin/AdminBlogEditorPage";
import NotFound from "./pages/NotFound";

// Demo honesta (D3=A): el panel /admin/blog* es una demo local sin backend
// ni autenticacion. Solo se monta si VITE_ENABLE_ADMIN_DEMO === 'true'
// (desarrollo local). En produccion esas URLs caen al 404.
const ADMIN_DEMO_ENABLED =
  import.meta.env.VITE_ENABLE_ADMIN_DEMO === "true";

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
          <Route path="/nosotros" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas Públicas de Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Rutas de demostracion local del editor (TipTap). Sin backend:
              los posts viven en localStorage del navegador. */}
          {ADMIN_DEMO_ENABLED ? (
            <>
              <Route path="/admin/blog" element={<AdminBlogList />} />
              <Route path="/admin/blog/new" element={<AdminBlogEditorPage />} />
              <Route
                path="/admin/blog/edit/:id"
                element={<AdminBlogEditorPage />}
              />
            </>
          ) : (
            <>
              <Route path="/admin/blog" element={<NotFound />} />
              <Route path="/admin/blog/new" element={<NotFound />} />
              <Route path="/admin/blog/edit/:id" element={<NotFound />} />
            </>
          )}
        </Routes>
      </div>

      {/* Footer – persiste en todas las rutas */}
      <Footer />
    </div>
  );
}
