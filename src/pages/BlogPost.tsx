import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { BlogPost as BlogPostType } from '../types/blog';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
  Copy,
  BookOpen,
  Edit3,
  Sparkles,
  ArrowRight,
  ListTree
} from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (slug) {
      const found = blogService.getPostBySlug(slug);
      if (found) {
        setPost(found);
        // Load related posts from same category
        const all = blogService.getPublishedPosts();
        setRelatedPosts(all.filter((p) => p.id !== found.id && p.category === found.category).slice(0, 3));

        // Parse headings from content for TOC
        const parser = new DOMParser();
        const doc = parser.parseFromString(found.content, 'text/html');
        const hElements = doc.querySelectorAll('h1, h2, h3');
        const parsedHeadings: { id: string; text: string; level: number }[] = [];

        hElements.forEach((h, idx) => {
          const text = h.textContent || '';
          if (text.trim()) {
            const level = parseInt(h.tagName.replace('H', ''), 10);
            parsedHeadings.push({
              id: `section-${idx}`,
              text: text.trim(),
              level
            });
          }
        });

        setHeadings(parsedHeadings);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/blog');
      }
    }
  }, [slug, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F4F2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <BookOpen className="w-10 h-10 text-[#1E4D2B] animate-pulse mx-auto" />
          <p className="text-sm text-gray-600 font-medium">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-[#F5F4F2] pb-16">
      {/* 1. Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-border py-3 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-500 overflow-x-auto truncate">
            <Link to="/" className="hover:text-[#1E4D2B]">Inicio</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#1E4D2B]">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{post.category}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/admin/blog/edit/${post.id}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E4D2B] bg-[#EAF2EC] hover:bg-[#C0D8C4]/60 px-2.5 py-1 rounded-md transition-colors"
              title="Editar en panel admin"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden sm:inline">Editar Artículo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Article Header Hero */}
      <header className="max-w-4xl mx-auto px-4 md:px-8 pt-10 pb-6 text-center space-y-5">
        <div className="inline-block">
          <span className="bg-[#EAF2EC] text-[#1E4D2B] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#C0D8C4]">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="text-base md:text-xl text-gray-600 font-sans max-w-3xl mx-auto leading-relaxed">
            {post.subtitle}
          </p>
        )}

        {/* Author Byline & Meta */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4 border-t border-border/80 text-xs text-gray-600">
          <div className="flex items-center gap-2.5">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#C0D8C4]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#EAF2EC] text-[#1E4D2B] font-bold flex items-center justify-center text-sm">
                {post.author.name.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <span className="font-bold text-gray-900 block">{post.author.name}</span>
              <span className="text-[11px] text-gray-500 block">{post.author.role}</span>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-gray-300 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>

          <div className="h-4 w-[1px] bg-gray-300 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D4541A]" />
            <span className="font-semibold text-gray-800">~{post.readingTime || 5} min de lectura</span>
          </div>
        </div>
      </header>

      {/* 3. Featured Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-4 md:px-8 mb-10">
          <div className="rounded-2xl overflow-hidden shadow-md border border-[#C0D8C4]/60 aspect-16/9 bg-gray-100">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
          {post.coverCaption && (
            <p className="text-xs text-center text-gray-500 mt-2 italic">
              {post.coverCaption}
            </p>
          )}
        </div>
      )}

      {/* 4. Article Body with Side TOC */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Rendered */}
        <article className="lg:col-span-8 bg-white border border-border rounded-2xl p-6 md:p-10 shadow-xs">
          <div
            className="article-prose prose prose-slate max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Temas relacionados:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-[#EAF2EC] text-[#1E4D2B] px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Share Bar */}
          <div className="mt-8 p-4 bg-[#F5F4F2] rounded-xl flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#D4541A]" />
              <span>¿Te ha parecido útil? Comparte este artículo</span>
            </span>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                title="Compartir en WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                title="Compartir en X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Compartir en Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-2 text-xs font-semibold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 text-gray-700"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Enlace</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </article>

        {/* Side Column: TOC & Author Bio */}
        <aside className="lg:col-span-4 space-y-6 sticky top-20">
          {/* Table of contents */}
          {headings.length > 0 && (
            <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E4D2B] pb-2 border-b border-border">
                <ListTree className="w-4 h-4" />
                <span>En este artículo</span>
              </div>
              <nav className="space-y-1 text-xs">
                {headings.map((h, i) => (
                  <div
                    key={i}
                    className={`block py-1 text-gray-600 hover:text-[#1E4D2B] transition-colors truncate ${
                      h.level === 1 ? 'font-bold text-gray-900' : h.level === 2 ? 'pl-3' : 'pl-6 text-gray-500'
                    }`}
                  >
                    • {h.text}
                  </div>
                ))}
              </nav>
            </div>
          )}

          {/* Author Card */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-3 text-center">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-[#1E4D2B]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#EAF2EC] text-[#1E4D2B] font-bold flex items-center justify-center text-xl mx-auto">
                {post.author.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-serif font-bold text-base text-gray-900">{post.author.name}</h4>
              <p className="text-xs text-muted-foreground">{post.author.role}</p>
            </div>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Equipo de divulgación científica y terapéutica enfocado en acercar las tecnologías de biofotónica al hogar.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-[#1E4D2B] to-[#2E7D3E] text-white rounded-xl p-6 shadow-sm space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C0D8C4] block">
              Equipamiento Profesional
            </span>
            <h4 className="font-serif font-bold text-lg leading-snug">
              Conoce los Dispositivos Yimai Life
            </h4>
            <p className="text-xs text-gray-200 leading-relaxed font-sans">
              Descubre nuestra gama de relojes láser y aplicadores de fotobiomodulación certificados para el hogar.
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1E4D2B] bg-white px-4 py-2 rounded-lg hover:bg-[#F5F4F2] transition-colors mt-2"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>
      </main>

      {/* 5. Related Articles Grid */}
      {relatedPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 md:px-8 mt-16 space-y-6">
          <div className="border-t border-border pt-10">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-6">
              Artículos Relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  className="bg-white border border-border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <Link to={`/blog/${rPost.slug}`} className="block aspect-16/9 overflow-hidden bg-gray-100">
                    {rPost.coverImage ? (
                      <img
                        src={rPost.coverImage}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    )}
                  </Link>

                  <div className="p-4 space-y-2 flex-1">
                    <span className="text-[10px] font-bold text-[#2E7D3E] uppercase tracking-wider">
                      {rPost.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-gray-900 group-hover:text-[#1E4D2B] transition-colors line-clamp-2">
                      <Link to={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {rPost.excerpt}
                    </p>
                  </div>

                  <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{rPost.readingTime || 5} min lectura</span>
                    <Link
                      to={`/blog/${rPost.slug}`}
                      className="text-[#1E4D2B] font-bold hover:text-[#D4541A] inline-flex items-center gap-0.5"
                    >
                      <span>Leer</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
