import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { BlogPost, BlogCategory } from '../types/blog';
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
  Tag,
  ShieldCheck,
  Zap,
  HeartPulse
} from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPosts(blogService.getPublishedPosts());
  }, []);

  const categories = blogService.getCategories();

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-[#F5F4F2]">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-b from-[#EAF2EC] to-[#F5F4F2] border-b border-[#C0D8C4]/40 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-[#C0D8C4] text-[#1E4D2B] text-xs font-semibold uppercase tracking-wider shadow-xs">
            <HeartPulse className="w-3.5 h-3.5 text-[#D4541A]" />
            <span>Conocimiento & Bienestar Integral</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Artículos, Guías y Terapias de Salud
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Explora artículos científicos, consejos de aplicación práctica y guías sobre fotobiomodulación, acupuntura y medicina integrativa.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por tema, palabra clave o terapia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C0D8C4] rounded-full text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30 shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <section className="sticky top-14 z-20 bg-white/90 backdrop-blur-md border-b border-border py-3 px-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos los Temas ({posts.length})
          </button>

          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat.name).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat.name
                    ? 'bg-[#1E4D2B] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Main Content Area */}
      <main className="max-w-6xl mx-auto py-12 px-4 md:px-8 space-y-12">
        {/* Featured Post Card (Hero Highlight) */}
        {featuredPost && selectedCategory === 'all' && !searchQuery && (
          <div className="bg-white border border-[#C0D8C4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            <div className="lg:col-span-7 relative overflow-hidden aspect-16/10 lg:aspect-auto">
              <img
                src={featuredPost.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200'}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#D4541A] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  ★ Artículo Destacado
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#2E7D3E] font-semibold bg-[#EAF2EC] px-2.5 py-0.5 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4541A]" />
                    {featuredPost.readingTime || 5} min de lectura
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 group-hover:text-[#1E4D2B] transition-colors leading-snug">
                  <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>

                <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 font-sans">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {featuredPost.author.avatar ? (
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#EAF2EC] text-[#1E4D2B] font-bold flex items-center justify-center text-xs">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">{featuredPost.author.name}</span>
                    <span className="text-[11px] text-gray-500 block">{featuredPost.author.role}</span>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1E4D2B] hover:text-[#2E7D3E] uppercase tracking-wider group-hover:translate-x-1 transition-all"
                >
                  <span>Leer Más</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900">
              {searchQuery ? `Resultados para "${searchQuery}"` : selectedCategory !== 'all' ? selectedCategory : 'Últimos Artículos Publicados'}
            </h3>
            <span className="text-xs text-muted-foreground">{filteredPosts.length} entradas encontradas</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center bg-white border border-border rounded-2xl p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
              <h4 className="text-base font-semibold text-gray-700">No encontramos publicaciones</h4>
              <p className="text-xs text-gray-500">Prueba con otro término de búsqueda o selecciona otra categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery || selectedCategory !== 'all' ? filteredPosts : regularPosts).map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-border hover:border-[#C0D8C4] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover */}
                    <Link to={`/blog/${post.slug}`} className="block relative aspect-16/9 overflow-hidden bg-gray-100">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                          <BookOpen className="w-8 h-8" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1E4D2B] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                        {post.category}
                      </span>
                    </Link>

                    {/* Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#D4541A]" />
                          {post.readingTime || 5} min
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#1E4D2B] transition-colors leading-snug line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>

                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed font-sans">
                        {post.excerpt}
                      </p>

                      {/* Tag badges */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-5 pt-0 mt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-gray-700 truncate max-w-[140px]">
                      {post.author.name}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#1E4D2B] group-hover:text-[#D4541A] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Leer artículo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
