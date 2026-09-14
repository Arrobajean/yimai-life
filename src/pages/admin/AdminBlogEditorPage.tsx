import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TipTapEditor } from '../../components/admin/editor/TipTapEditor';
import { blogService } from '../../services/blogService';
import { BlogPost, PostStatus, EditorTemplate } from '../../types/blog';
import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Upload,
  Globe,
  Tag,
  Folder,
  User,
  Search,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Share2,
  Trash2,
  RotateCcw
} from 'lucide-react';

export default function AdminBlogEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Form State
  const [postId, setPostId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverCaption, setCoverCaption] = useState('');
  const [category, setCategory] = useState('Salud y Bienestar');
  const [tags, setTags] = useState<string[]>(['Terapia Láser', 'Salud']);
  const [newTagInput, setNewTagInput] = useState('');
  const [authorName, setAuthorName] = useState('Equipo Médico Yimai Life');
  const [authorRole, setAuthorRole] = useState('Especialistas en Biofotónica');
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300');
  const [status, setStatus] = useState<PostStatus>('draft');
  const [featured, setFeatured] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string>(new Date().toISOString().slice(0, 16));

  // SEO State
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // UI state
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'meta' | 'seo' | 'cover'>('meta');

  // Load existing post if editing
  useEffect(() => {
    if (id) {
      const post = blogService.getPostById(id);
      if (post) {
        setPostId(post.id);
        setTitle(post.title);
        setSlug(post.slug);
        setIsCustomSlug(true);
        setSubtitle(post.subtitle || '');
        setExcerpt(post.excerpt || '');
        setContent(post.content || '');
        setCoverImage(post.coverImage || '');
        setCoverCaption(post.coverCaption || '');
        setCategory(post.category || 'Salud y Bienestar');
        setTags(post.tags || []);
        setAuthorName(post.author.name);
        setAuthorRole(post.author.role);
        setAuthorAvatar(post.author.avatar || '');
        setStatus(post.status);
        setFeatured(Boolean(post.featured));
        setPublishedAt(new Date(post.publishedAt).toISOString().slice(0, 16));
        setSeoTitle(post.seoTitle || '');
        setSeoDescription(post.seoDescription || '');
      } else {
        navigate('/admin/blog');
      }
    } else {
      // New post - check auto-saved draft
      const draft = blogService.getDraftAuto();
      if (draft && draft.title && window.confirm('Se encontró un borrador guardado automáticamente. ¿Deseas recuperarlo?')) {
        setTitle(draft.title || '');
        setSlug(draft.slug || '');
        setSubtitle(draft.subtitle || '');
        setExcerpt(draft.excerpt || '');
        setContent(draft.content || '');
        setCoverImage(draft.coverImage || '');
        setCoverCaption(draft.coverCaption || '');
        setCategory(draft.category || 'Salud y Bienestar');
        setTags(draft.tags || []);
        if (draft.author) {
          setAuthorName(draft.author.name || 'Equipo Médico Yimai Life');
          setAuthorRole(draft.author.role || 'Especialistas en Biofotónica');
          setAuthorAvatar(draft.author.avatar || '');
        }
      } else {
        setPostId(`post-${Date.now()}`);
      }
    }
  }, [id, navigate]);

  // Auto-generate slug when title changes (if not customized)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isCustomSlug) {
      setSlug(blogService.generateSlug(val));
    }
  };

  // Auto-save draft in background
  useEffect(() => {
    if (!title && !content) return;

    const timer = setTimeout(() => {
      setSaveStatus('saving');
      blogService.saveDraftAuto({
        title,
        slug,
        subtitle,
        excerpt,
        content,
        coverImage,
        coverCaption,
        category,
        tags,
        author: { name: authorName, role: authorRole, avatar: authorAvatar },
        status
      });
      setSaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, slug, subtitle, excerpt, content, coverImage, coverCaption, category, tags, authorName, authorRole, authorAvatar, status]);

  // Save / Publish
  const handleSavePost = (forcedStatus?: PostStatus) => {
    if (!title.trim()) {
      alert('Por favor ingresa un título para el artículo.');
      return;
    }

    const currentStatus = forcedStatus || status;
    const finalSlug = slug.trim() || blogService.generateSlug(title);
    const postToSave: BlogPost = {
      id: postId || `post-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      excerpt: excerpt.trim() || title.trim(),
      content,
      coverImage: coverImage.trim() || undefined,
      coverCaption: coverCaption.trim() || undefined,
      category,
      tags,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
        avatar: authorAvatar.trim() || undefined
      },
      status: currentStatus,
      publishedAt: new Date(publishedAt).toISOString(),
      updatedAt: new Date().toISOString(),
      readingTime: Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200)),
      featured,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || excerpt.trim()
    };

    blogService.savePost(postToSave);
    blogService.clearDraftAuto();
    setSaveStatus('saved');
    alert(currentStatus === 'published' ? '¡Artículo publicado con éxito!' : 'Borrador guardado con éxito.');
    navigate('/admin/blog');
  };

  // Add Tag
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && newTagInput.trim()) {
      e.preventDefault();
      const clean = newTagInput.trim().replace(/^#/, '');
      if (!tags.includes(clean)) {
        setTags([...tags, clean]);
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Cover image upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply template
  const handleApplyTemplate = useCallback((tmpl: EditorTemplate) => {
    if (!title || window.confirm('¿Deseas reemplazar el título y resumen con la plantilla seleccionada?')) {
      setTitle(tmpl.defaultTitle);
      setSlug(blogService.generateSlug(tmpl.defaultTitle));
      setExcerpt(tmpl.defaultExcerpt);
      setCategory(tmpl.defaultCategory);
    }
  }, [title]);

  const categories = blogService.getCategories();

  return (
    <div className="min-h-screen bg-[#F5F4F2] flex flex-col">
      {/* Top Sticky Navigation Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-40 px-4 md:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/blog"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#1E4D2B] bg-gray-100 hover:bg-[#EAF2EC] px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Entradas</span>
            </Link>
            <div className="h-4 w-[1px] bg-gray-300 hidden sm:block" />
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {isEditing ? 'Editando Artículo' : 'Creando Nuevo Artículo'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-save status */}
            <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
              {saveStatus === 'saving' && (
                <span className="text-amber-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Auto-guardando...
                </span>
              )}
              {saveStatus === 'saved' && (
                <span className="text-[#2E7D3E] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Guardado {lastSavedTime ? `a las ${lastSavedTime}` : ''}
                </span>
              )}
            </div>

            {/* Status Selector */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PostStatus)}
              aria-label="Estado de publicación del artículo"
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border focus:outline-none transition-colors cursor-pointer ${
                status === 'published'
                  ? 'bg-green-50 text-[#1E4D2B] border-green-300'
                  : status === 'scheduled'
                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="scheduled">Programado</option>
            </select>

            {/* View live public page if already published */}
            {isEditing && status === 'published' && (
              <Link
                to={`/blog/${slug}`}
                target="_blank"
                className="p-2 text-gray-600 hover:text-[#1E4D2B] bg-gray-100 hover:bg-[#EAF2EC] rounded-lg transition-colors"
                title="Ver artículo en la web pública"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}

            {/* Save / Publish button */}
            <button
              type="button"
              onClick={() => handleSavePost()}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1E4D2B] text-white hover:bg-[#2E7D3E] rounded-lg shadow-sm flex items-center gap-2 transition-all hover:shadow"
            >
              <Save className="w-4 h-4" />
              <span>{status === 'published' ? 'Publicar Entrada' : 'Guardar Borrador'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col lg:flex-row gap-8">
        {/* Left Column: Post Title, Subtitle, Cover & TipTap v3 Editor */}
        <section className="flex-1 flex flex-col space-y-6">
          {/* Post Title & Slug */}
          <div className="bg-white border border-border rounded-xl p-6 shadow-xs space-y-4">
            <div>
              <input
                type="text"
                placeholder="Título del artículo o guía..."
                value={title}
                onChange={handleTitleChange}
                className="w-full text-2xl md:text-3xl font-serif font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none border-none p-0"
              />
            </div>

            {/* Slug URL Bar */}
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <Globe className="w-3.5 h-3.5 text-[#2E7D3E]" />
              <span className="text-gray-400">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(blogService.generateSlug(e.target.value));
                  setIsCustomSlug(true);
                }}
                placeholder="slug-del-articulo"
                className="flex-1 bg-transparent text-gray-700 font-mono focus:outline-none border-none p-0"
              />
              <button
                type="button"
                onClick={() => {
                  setSlug(blogService.generateSlug(title));
                  setIsCustomSlug(false);
                }}
                className="text-[10px] text-[#2E7D3E] hover:underline font-medium"
              >
                Auto-generar
              </button>
            </div>

            {/* Subtitle */}
            <div>
              <input
                type="text"
                placeholder="Subtítulo o bajada explicativa (opcional)..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none border-none p-0"
              />
            </div>
          </div>

          {/* Featured Cover Image Section */}
          <div className="bg-white border border-border rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Imagen Destacada de Portada
              </span>
              {coverImage && (
                <button
                  type="button"
                  onClick={() => setCoverImage('')}
                  className="text-xs text-destructive hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Quitar Imagen</span>
                </button>
              )}
            </div>

            {coverImage ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-border aspect-21/9 bg-gray-100 max-h-72 flex items-center justify-center">
                  <img src={coverImage} alt="Portada" className="w-full h-full object-cover" />
                </div>
                <input
                  type="text"
                  placeholder="Leyenda o pie de foto de la portada (opcional)"
                  value={coverCaption}
                  onChange={(e) => setCoverCaption(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="border-2 border-dashed border-gray-300 hover:border-[#2E7D3E] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-[#EAF2EC]/40 transition-all">
                  <Upload className="w-6 h-6 text-[#2E7D3E] mb-1" />
                  <span className="text-xs font-semibold text-gray-700">Subir imagen desde equipo</span>
                  <span className="text-[10px] text-gray-400">JPG, PNG, WebP</span>
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                </label>

                <div className="flex flex-col justify-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">O ingresa un enlace / URL:</span>
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/portada.jpg"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
                  />
                </div>
              </div>
            )}
          </div>

          {/* TipTap v3 Full Suite Rich Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4541A]" />
                <span>Cuerpo del Artículo (Editor TipTap v3)</span>
              </span>
            </div>
            <TipTapEditor
              value={content}
              onChange={setContent}
              onApplyTemplate={handleApplyTemplate}
              placeholder="Empieza a redactar tu artículo. Utiliza la barra superior o presiona '/' para insertar tablas, imágenes, listas y videos..."
            />
          </div>
        </section>

        {/* Right Sidebar: Settings, Taxonomy, Author, SEO Preview */}
        <aside className="w-full lg:w-80 flex flex-col space-y-6 select-none">
          {/* Tabs for Sidebar */}
          <div className="bg-white border border-border rounded-xl p-1 flex gap-1 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveSidebarTab('meta')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeSidebarTab === 'meta'
                  ? 'bg-[#1E4D2B] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Publicación
            </button>
            <button
              type="button"
              onClick={() => setActiveSidebarTab('seo')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeSidebarTab === 'seo'
                  ? 'bg-[#1E4D2B] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              SEO & Social
            </button>
          </div>

          {/* TAB 1: METADATA & TAXONOMY */}
          {activeSidebarTab === 'meta' && (
            <div className="space-y-6">
              {/* Category */}
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                  <Folder className="w-4 h-4 text-[#1E4D2B]" />
                  <span>Categoría</span>
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Categoría del artículo"
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30 bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                  <Tag className="w-4 h-4 text-[#D4541A]" />
                  <span>Etiquetas / Tags</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 bg-[#EAF2EC] text-[#1E4D2B] text-xs px-2.5 py-1 rounded-full font-medium"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-gray-400 hover:text-red-500 rounded-full"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Escribe un tag y presiona Enter..."
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
                />
              </div>

              {/* Excerpt / Summary */}
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Resumen / Extracto
                  </span>
                  <span className="text-[10px] text-gray-400">{excerpt.length}/200</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Breve descripción que se mostrará en el catálogo y tarjetas de blog..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full p-2.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
                />
              </div>

              {/* Author */}
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                  <User className="w-4 h-4 text-[#1E4D2B]" />
                  <span>Autor</span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nombre del autor"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Cargo o especialidad"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1E4D2B] focus:ring-[#1E4D2B] accent-[#1E4D2B]"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Destacar en Portada</span>
                    <span className="text-[11px] text-gray-500">Aparecerá en el hero principal del blog</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: SEO & SOCIAL PREVIEW */}
          {activeSidebarTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                  <Search className="w-4 h-4 text-[#2E7D3E]" />
                  <span>Configuración SEO</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Meta Título ({seoTitle.length || title.length}/60)
                  </label>
                  <input
                    type="text"
                    placeholder={title || 'Título optimizado para Google'}
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Meta Descripción ({seoDescription.length || excerpt.length}/160)
                  </label>
                  <textarea
                    rows={3}
                    placeholder={excerpt || 'Descripción relevante para buscadores'}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full p-2.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
                  />
                </div>
              </div>

              {/* Live Google Search Preview */}
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Vista Previa en Google
                </span>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-left font-sans">
                  <div className="text-[11px] text-gray-600 flex items-center gap-1 truncate mb-0.5">
                    <span>https://yimailife.com &gt; blog &gt; {slug || 'articulo'}</span>
                  </div>
                  <div className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer truncate">
                    {seoTitle || title || 'Título de tu artículo en Yimai Life'}
                  </div>
                  <div className="text-xs text-[#4d5156] line-clamp-2 mt-1">
                    {seoDescription || excerpt || 'Descubre cómo los tratamientos no invasivos y la fotobiomodulación mejoran la calidad de vida y energía celular.'}
                  </div>
                </div>
              </div>

              {/* Live Social Card Preview */}
              <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Tarjeta para Redes Sociales (OpenGraph)
                </span>
                <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 text-left">
                  {coverImage ? (
                    <img src={coverImage} alt="Social cover" className="w-full h-32 object-cover" />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      Sin imagen de portada
                    </div>
                  )}
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] text-gray-400 font-mono block">YIMAILIFE.COM</span>
                    <div className="text-xs font-bold text-gray-900 line-clamp-1">
                      {seoTitle || title || 'Título del artículo'}
                    </div>
                    <div className="text-[11px] text-gray-600 line-clamp-2">
                      {seoDescription || excerpt || 'Resumen del artículo para compartir en redes.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
