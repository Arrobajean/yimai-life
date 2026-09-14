import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Youtube, 
  Table as TableIcon, 
  X, 
  Upload, 
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-react';
import { EDITOR_TEMPLATES } from '../../../services/blogService';
import { EditorTemplate } from '../../../types/blog';

// --- LINK MODAL ---
interface LinkModalProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export const LinkModal: React.FC<LinkModalProps> = ({ editor, isOpen, onClose }) => {
  const previousUrl = editor.getAttributes('link').href || '';
  const [url, setUrl] = useState(previousUrl);
  const [targetBlank, setTargetBlank] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url.trim(), target: targetBlank ? '_blank' : null })
        .run();
    }
    onClose();
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-border p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <LinkIcon className="w-5 h-5 text-[#2E7D3E]" />
            <span>Insertar o Editar Enlace</span>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              URL de Destino
            </label>
            <input
              type="url"
              placeholder="https://ejemplo.com/articulo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30 focus:border-[#2E7D3E]"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={targetBlank}
              onChange={(e) => setTargetBlank(e.target.checked)}
              className="w-4 h-4 rounded text-[#2E7D3E] focus:ring-[#2E7D3E] accent-[#2E7D3E]"
            />
            <span>Abrir en una nueva pestaña (recomendado)</span>
          </label>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          {previousUrl ? (
            <button
              type="button"
              onClick={handleUnlink}
              className="text-xs font-medium text-destructive hover:underline"
            >
              Quitar Enlace
            </button>
          ) : <div />}
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium border rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-medium bg-[#1E4D2B] text-white rounded-lg hover:bg-[#2E7D3E] transition-colors"
            >
              Guardar Enlace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- IMAGE MODAL ---
interface ImageModalProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ editor, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [titleText, setTitleText] = useState('');

  if (!isOpen) return null;

  const handleInsert = () => {
    if (!imageUrl.trim()) return;
    editor
      .chain()
      .focus()
      .setImage({
        src: imageUrl.trim(),
        alt: altText.trim() || undefined,
        title: titleText.trim() || undefined
      })
      .run();
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
          if (!altText) {
            setAltText(file.name.replace(/\.[^/.]+$/, ""));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-border p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <ImageIcon className="w-5 h-5 text-[#2E7D3E]" />
            <span>Insertar Imagen</span>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 border-b border-border my-4">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'url' ? 'border-[#2E7D3E] text-[#1E4D2B]' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Enlace Web / URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'upload' ? 'border-[#2E7D3E] text-[#1E4D2B]' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Subir Archivo Local
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'url' ? (
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                URL de la Imagen
              </label>
              <input
                type="url"
                placeholder="https://ejemplo.com/foto.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30 focus:border-[#2E7D3E]"
                autoFocus
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Seleccionar Imagen
              </label>
              <label className="border-2 border-dashed border-gray-300 hover:border-[#2E7D3E] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-[#EAF2EC]/40 transition-all">
                <Upload className="w-8 h-8 text-[#2E7D3E] mb-2" />
                <span className="text-sm font-medium text-gray-700">Haz clic para subir o arrastra una imagen</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG, WebP o GIF</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {imageUrl && (
            <div className="relative rounded-lg overflow-hidden border border-border max-h-48 flex items-center justify-center bg-gray-50">
              <img src={imageUrl} alt="Vista previa" className="max-h-44 object-contain" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Texto Alternativo (Alt / SEO)
              </label>
              <input
                type="text"
                placeholder="Descripción de la imagen"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30 focus:border-[#2E7D3E]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Leyenda / Título
              </label>
              <input
                type="text"
                placeholder="Leyenda visible (opcional)"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30 focus:border-[#2E7D3E]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-5 border-t border-border mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!imageUrl}
            onClick={handleInsert}
            className="px-4 py-2 text-xs font-medium bg-[#1E4D2B] text-white rounded-lg hover:bg-[#2E7D3E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insertar Imagen
          </button>
        </div>
      </div>
    </div>
  );
};

// --- YOUTUBE MODAL ---
interface YoutubeModalProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export const YoutubeModal: React.FC<YoutubeModalProps> = ({ editor, isOpen, onClose }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [width, setWidth] = useState('640');
  const [height, setHeight] = useState('360');

  if (!isOpen) return null;

  const handleInsert = () => {
    if (!videoUrl.trim()) return;
    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: videoUrl.trim(),
        width: Math.max(320, parseInt(width, 10) || 640),
        height: Math.max(180, parseInt(height, 10) || 360)
      })
      .run();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-border p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Youtube className="w-5 h-5 text-red-600" />
            <span>Incrustar Video de YouTube</span>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              URL del Video de YouTube
            </label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30 focus:border-[#2E7D3E]"
              autoFocus
            />
            <span className="text-xs text-gray-500 mt-1 block">
              Admite formatos youtube.com/watch?v=... y youtu.be/...
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!videoUrl.trim()}
            onClick={handleInsert}
            className="px-4 py-2 text-xs font-medium bg-[#1E4D2B] text-white rounded-lg hover:bg-[#2E7D3E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Incrustar Video
          </button>
        </div>
      </div>
    </div>
  );
};

// --- TABLE MODAL ---
interface TableModalProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export const TableModal: React.FC<TableModalProps> = ({ editor, isOpen, onClose }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [withHeader, setWithHeader] = useState(true);

  if (!isOpen) return null;

  const handleInsert = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: withHeader })
      .run();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-border p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <TableIcon className="w-5 h-5 text-[#2E7D3E]" />
            <span>Insertar Tabla</span>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Filas
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Columnas
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={cols}
                onChange={(e) => setCols(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]/30"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={withHeader}
              onChange={(e) => setWithHeader(e.target.checked)}
              className="w-4 h-4 rounded text-[#2E7D3E] focus:ring-[#2E7D3E] accent-[#2E7D3E]"
            />
            <span>Incluir fila de encabezados</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleInsert}
            className="px-4 py-2 text-xs font-medium bg-[#1E4D2B] text-white rounded-lg hover:bg-[#2E7D3E] transition-colors"
          >
            Crear Tabla
          </button>
        </div>
      </div>
    </div>
  );
};

// --- TEMPLATES MODAL ---
interface TemplatesModalProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: EditorTemplate) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({ isOpen, onClose, onApplyTemplate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-border p-6 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Sparkles className="w-5 h-5 text-[#D4541A]" />
            <span>Elegir una Plantilla de Artículo</span>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 my-3">
          Comienza rápidamente con una estructura profesional para tu artículo o página. Reemplaza el contenido actual.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 overflow-y-auto pr-1 flex-1">
          {EDITOR_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => {
                onApplyTemplate(tmpl);
                onClose();
              }}
              className="border border-border rounded-xl p-4 hover:border-[#2E7D3E] hover:shadow-md cursor-pointer transition-all bg-card flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF2EC] text-[#1E4D2B] flex items-center justify-center group-hover:bg-[#1E4D2B] group-hover:text-white transition-colors">
                    {tmpl.id === 'guia-salud' && <BookOpen className="w-4 h-4" />}
                    {tmpl.id === 'tutorial-dispositivo' && <Layers className="w-4 h-4" />}
                    {tmpl.id === 'articulo-noticia' && <Sparkles className="w-4 h-4" />}
                  </div>
                  <h4 className="font-semibold text-sm text-foreground">{tmpl.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#2E7D3E] bg-[#EAF2EC] px-2 py-0.5 rounded-full">
                  {tmpl.defaultCategory}
                </span>
                <span className="text-xs font-semibold text-[#1E4D2B] group-hover:translate-x-1 transition-transform">
                  Aplicar &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-border mt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
