import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { BlogPost, PostStatus } from '../../types/blog';
import {
  Plus,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  Clock,
  Edit3,
  Trash2,
  ExternalLink,
  Copy,
  Sparkles,
  BookOpen,
  Eye,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export default function AdminBlogList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const loadPosts = () => {
    setPosts(blogService.getPosts());
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el artículo "${title}"?`)) {
      blogService.deletePost(id);
      loadPosts();
    }
  };

  const handleDuplicate = (post: BlogPost) => {
    const duplicated: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      title: `${post.title} (Copia)`,
      slug: `${post.slug}-copia`,
      status: 'draft',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    blogService.savePost(duplicated);
    loadPosts();
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Deseas restaurar los artículos de ejemplo de Yimai Life?')) {
      blogService.resetDefaults();
      loadPosts();
    }
  };

  const categories = blogService.getCategories();

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // KPI calculations
  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;
  const avgReadingTime = totalPosts
    ? Math.round(posts.reduce((acc, p) => acc + (p.readingTime || 1), 0) / totalPosts)
    : 0;

  return (
    <div className="min-h-screen bg-[#F5F4F2] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B] bg-[#EAF2EC] px-2.5 py-0.5 rounded-full">
                Panel de Administración
              </span>
              <span className="text-xs text-muted-foreground">• TipTap v3 Pro Editor</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
              Gestión de Blog y Artículos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Crea y edita contenidos largos, guías de salud y artículos dinámicos con formato enriquecido.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-border rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              title="Restaurar artículos de prueba"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Ejemplos</span>
            </button>

            <Link
              to="/blog"
              target="_blank"
              className="px-3.5 py-2 text-xs font-semibold text-[#1E4D2B] bg-[#EAF2EC] hover:bg-[#C0D8C4]/50 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Blog Público</span>
            </Link>

            <Link
              to="/admin/blog/new"
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#1E4D2B] hover:bg-[#2E7D3E] text-white rounded-lg shadow-sm flex items-center gap-2 transition-all hover:shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Entrada</span>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EAF2EC] text-[#1E4D2B] flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 block">{totalPosts}</span>
              <span className="text-xs text-muted-foreground">Total Entradas</span>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-green-800 block">{publishedCount}</span>
              <span className="text-xs text-muted-foreground">Publicados</span>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-amber-800 block">{draftCount}</span>
              <span className="text-xs text-muted-foreground">Borradores</span>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBF0EB] text-[#D4541A] flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 block">~{avgReadingTime} min</span>
              <span className="text-xs text-muted-foreground">Lectura Promedio</span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título, contenido o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filtrar por estado de publicación"
              className="px-3 py-2 text-xs border rounded-lg focus:outline-none bg-white text-gray-700 font-medium"
            >
              <option value="all">Todos los Estados</option>
              <option value="published">Publicados</option>
              <option value="draft">Borradores</option>
              <option value="scheduled">Programados</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filtrar por categoría"
              className="px-3 py-2 text-xs border rounded-lg focus:outline-none bg-white text-gray-700 font-medium"
            >
              <option value="all">Todas las Categorías</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles List / Table */}
        <div className="bg-white border border-border rounded-xl shadow-xs overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-base font-semibold text-gray-700">No se encontraron artículos</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No hay entradas que coincidan con los filtros seleccionados o aún no has creado ninguna.
              </p>
              <Link
                to="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#1E4D2B] text-white rounded-lg hover:bg-[#2E7D3E] transition-colors mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Primer Artículo</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors group"
                >
                  {/* Left: Cover thumbnail + info */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-20 h-16 md:w-24 md:h-18 rounded-lg object-cover border border-border shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-16 md:w-24 md:h-18 rounded-lg bg-gray-100 border border-border flex items-center justify-center text-gray-400 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : post.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {post.status === 'published' ? 'Publicado' : post.status === 'scheduled' ? 'Programado' : 'Borrador'}
                        </span>
                        <span className="text-[11px] font-medium text-[#2E7D3E] bg-[#EAF2EC] px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="text-[10px] font-bold text-[#D4541A] bg-[#FBF0EB] px-2 py-0.5 rounded-full">
                            ★ Destacado
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#1E4D2B] transition-colors truncate">
                        {post.title}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                        <span>Por {post.author.name}</span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>~{post.readingTime || 1} min lectura</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1 self-end md:self-center shrink-0">
                    {post.status === 'published' && (
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-gray-500 hover:text-[#1E4D2B] hover:bg-[#EAF2EC] rounded-lg transition-colors"
                        title="Ver en web pública"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDuplicate(post)}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Duplicar entrada"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <Link
                      to={`/admin/blog/edit/${post.id}`}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#1E4D2B] text-white hover:bg-[#2E7D3E] rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar entrada"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
