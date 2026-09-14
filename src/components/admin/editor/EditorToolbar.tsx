import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Table as TableIcon,
  Image as ImageIcon,
  Youtube,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
  RemoveFormatting,
  Minus,
  Sparkles,
  Maximize2,
  Minimize2,
  Code2,
  Columns,
  ListTree,
  ChevronDown,
  Highlighter,
  Palette,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  showSplitPreview: boolean;
  onToggleSplitPreview: () => void;
  showHtmlSource: boolean;
  onToggleHtmlSource: () => void;
  showTOC: boolean;
  onToggleTOC: () => void;
  onOpenLinkModal: () => void;
  onOpenImageModal: () => void;
  onOpenYoutubeModal: () => void;
  onOpenTableModal: () => void;
  onOpenTemplatesModal: () => void;
}

const TEXT_COLORS = [
  { name: 'Por defecto', color: '#1A1A2A' },
  { name: 'Verde Oscuro', color: '#1E4D2B' },
  { name: 'Verde Yimai', color: '#2E7D3E' },
  { name: 'Naranja Marca', color: '#D4541A' },
  { name: 'Gris Neutro', color: '#64748B' },
  { name: 'Azul Info', color: '#2563EB' },
  { name: 'Rojo Alerta', color: '#DC2626' },
  { name: 'Púrpura', color: '#7C3AED' }
];

const HIGHLIGHT_COLORS = [
  { name: 'Sin resalte', color: '' },
  { name: 'Amarillo', color: '#FEF08A' },
  { name: 'Verde Menta', color: '#BBF7D0' },
  { name: 'Naranja Suave', color: '#FED7AA' },
  { name: 'Azul Claro', color: '#BAE6FD' },
  { name: 'Rosa Suave', color: '#FBCFE8' }
];

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  isFullscreen,
  onToggleFullscreen,
  showSplitPreview,
  onToggleSplitPreview,
  showHtmlSource,
  onToggleHtmlSource,
  showTOC,
  onToggleTOC,
  onOpenLinkModal,
  onOpenImageModal,
  onOpenYoutubeModal,
  onOpenTableModal,
  onOpenTemplatesModal
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showCalloutDropdown, setShowCalloutDropdown] = useState(false);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const highlightPickerRef = useRef<HTMLDivElement>(null);
  const headingDropdownRef = useRef<HTMLDivElement>(null);
  const calloutDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (highlightPickerRef.current && !highlightPickerRef.current.contains(event.target as Node)) {
        setShowHighlightPicker(false);
      }
      if (headingDropdownRef.current && !headingDropdownRef.current.contains(event.target as Node)) {
        setShowHeadingDropdown(false);
      }
      if (calloutDropdownRef.current && !calloutDropdownRef.current.contains(event.target as Node)) {
        setShowCalloutDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const insertCallout = (type: 'info' | 'tip' | 'warning' | 'danger') => {
    const labels = {
      info: 'Información Importante',
      tip: 'Consejo Práctico',
      warning: 'Precaución',
      danger: 'Atención'
    };
    const html = `<div class="editor-callout editor-callout-${type}"><p><strong>${labels[type]}:</strong> Escribe aquí tu nota o recomendación...</p></div>`;
    editor.chain().focus().insertContent(html).run();
    setShowCalloutDropdown(false);
  };

  const currentHeadingLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Título 1 (H1)';
    if (editor.isActive('heading', { level: 2 })) return 'Título 2 (H2)';
    if (editor.isActive('heading', { level: 3 })) return 'Título 3 (H3)';
    if (editor.isActive('heading', { level: 4 })) return 'Título 4 (H4)';
    return 'Párrafo Normal';
  };

  const btnClass = (isActive: boolean) =>
    `p-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center ${
      isActive
        ? 'bg-[#EAF2EC] text-[#1E4D2B] font-semibold'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`;

  return (
    <div className="bg-white border-b border-border p-2 sticky top-0 z-30 flex flex-wrap items-center gap-1 shadow-sm select-none">
      {/* Group: History */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Deshacer (Ctrl+Z)"
          className={`${btnClass(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Rehacer (Ctrl+Y)"
          className={`${btnClass(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Group: Headings / Text style Dropdown */}
      <div className="relative border-r border-border pr-1" ref={headingDropdownRef}>
        <button
          type="button"
          onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
          className="h-8 px-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-1.5 transition-colors border border-border/50"
        >
          <span>{currentHeadingLabel()}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>

        {showHeadingDropdown && (
          <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-lg shadow-xl border border-border py-1 z-50 animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().setParagraph().run();
                setShowHeadingDropdown(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-gray-100 ${
                editor.isActive('paragraph') ? 'text-[#1E4D2B] font-bold bg-[#EAF2EC]' : 'text-gray-700'
              }`}
            >
              <span>Párrafo Normal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                setShowHeadingDropdown(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-100 ${
                editor.isActive('heading', { level: 1 }) ? 'text-[#1E4D2B] font-bold bg-[#EAF2EC]' : 'text-gray-700'
              }`}
            >
              <Heading1 className="w-4 h-4 text-[#1E4D2B]" />
              <span className="font-serif font-bold text-sm">Título 1 (H1)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                setShowHeadingDropdown(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-100 ${
                editor.isActive('heading', { level: 2 }) ? 'text-[#1E4D2B] font-bold bg-[#EAF2EC]' : 'text-gray-700'
              }`}
            >
              <Heading2 className="w-4 h-4 text-[#1E4D2B]" />
              <span className="font-serif font-bold">Título 2 (H2)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                setShowHeadingDropdown(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-100 ${
                editor.isActive('heading', { level: 3 }) ? 'text-[#1E4D2B] font-bold bg-[#EAF2EC]' : 'text-gray-700'
              }`}
            >
              <Heading3 className="w-4 h-4 text-[#2E7D3E]" />
              <span className="font-serif font-medium">Título 3 (H3)</span>
            </button>
          </div>
        )}
      </div>

      {/* Group: Typography Inline */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Negrita (Ctrl+B)"
          className={btnClass(editor.isActive('bold'))}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Cursiva (Ctrl+I)"
          className={btnClass(editor.isActive('italic'))}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Subrayado (Ctrl+U)"
          className={btnClass(editor.isActive('underline'))}
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Tachado"
          className={btnClass(editor.isActive('strike'))}
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Código en línea"
          className={btnClass(editor.isActive('code'))}
        >
          <Code className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          title="Subíndice"
          className={btnClass(editor.isActive('subscript'))}
        >
          <SubscriptIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          title="Superíndice"
          className={btnClass(editor.isActive('superscript'))}
        >
          <SuperscriptIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Group: Colors & Highlight */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        {/* Text Color */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Color de Texto"
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 flex items-center gap-0.5"
          >
            <Palette className="w-4 h-4 text-[#1E4D2B]" />
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
          {showColorPicker && (
            <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-lg shadow-xl border border-border p-2 z-50 animate-in fade-in">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Color de Texto</span>
              <div className="grid grid-cols-4 gap-1.5">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    title={c.name}
                    onClick={() => {
                      editor.chain().focus().setColor(c.color).run();
                      setShowColorPicker(false);
                    }}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                    style={{ backgroundColor: c.color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Highlight */}
        <div className="relative" ref={highlightPickerRef}>
          <button
            type="button"
            onClick={() => setShowHighlightPicker(!showHighlightPicker)}
            title="Resaltador de Fondo"
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 flex items-center gap-0.5"
          >
            <Highlighter className="w-4 h-4 text-[#D4541A]" />
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
          {showHighlightPicker && (
            <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-lg shadow-xl border border-border p-2 z-50 animate-in fade-in">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Color de Resalte</span>
              <div className="grid grid-cols-3 gap-1.5">
                {HIGHLIGHT_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => {
                      if (!c.color) {
                        editor.chain().focus().unsetHighlight().run();
                      } else {
                        editor.chain().focus().toggleHighlight({ color: c.color }).run();
                      }
                      setShowHighlightPicker(false);
                    }}
                    className="h-6 text-[10px] rounded border border-gray-300 flex items-center justify-center font-medium hover:scale-105 transition-transform"
                    style={{ backgroundColor: c.color || '#fff' }}
                  >
                    {c.name === 'Sin resalte' ? 'Quitar' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Group: Alignment */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Alinear a la Izquierda"
          className={btnClass(editor.isActive({ textAlign: 'left' }))}
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Centrar"
          className={btnClass(editor.isActive({ textAlign: 'center' }))}
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Alinear a la Derecha"
          className={btnClass(editor.isActive({ textAlign: 'right' }))}
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          title="Justificar"
          className={btnClass(editor.isActive({ textAlign: 'justify' }))}
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      {/* Group: Lists & Checklists */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Lista con Viñetas"
          className={btnClass(editor.isActive('bulletList'))}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Lista Numerada"
          className={btnClass(editor.isActive('orderedList'))}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          title="Lista de Tareas / Checklist"
          className={btnClass(editor.isActive('taskList'))}
        >
          <ListTodo className="w-4 h-4" />
        </button>
      </div>

      {/* Group: Blocks & Elements */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Cita en Bloque"
          className={btnClass(editor.isActive('blockquote'))}
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Bloque de Código"
          className={btnClass(editor.isActive('codeBlock'))}
        >
          <Code2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Línea Divisoria"
          className={btnClass(false)}
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Callouts Dropdown */}
        <div className="relative" ref={calloutDropdownRef}>
          <button
            type="button"
            onClick={() => setShowCalloutDropdown(!showCalloutDropdown)}
            title="Caja de Aviso / Callout"
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 flex items-center gap-0.5"
          >
            <AlertCircle className="w-4 h-4 text-[#2E7D3E]" />
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
          {showCalloutDropdown && (
            <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-lg shadow-xl border border-border py-1 z-50 animate-in fade-in">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 py-1 block">Cajas Destacadas</span>
              <button
                type="button"
                onClick={() => insertCallout('info')}
                className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-blue-50 text-blue-800"
              >
                <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Info / Dato</span>
              </button>
              <button
                type="button"
                onClick={() => insertCallout('tip')}
                className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-green-50 text-green-800"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span>Consejo / Tip</span>
              </button>
              <button
                type="button"
                onClick={() => insertCallout('warning')}
                className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-amber-50 text-amber-800"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Precaución</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Group: Media & Links */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <button
          type="button"
          onClick={onOpenLinkModal}
          title="Insertar Enlace"
          className={btnClass(editor.isActive('link'))}
        >
          <LinkIcon className="w-4 h-4 text-[#2E7D3E]" />
        </button>
        <button
          type="button"
          onClick={onOpenImageModal}
          title="Insertar Imagen"
          className={btnClass(false)}
        >
          <ImageIcon className="w-4 h-4 text-[#2E7D3E]" />
        </button>
        <button
          type="button"
          onClick={onOpenYoutubeModal}
          title="Incrustar YouTube"
          className={btnClass(false)}
        >
          <Youtube className="w-4 h-4 text-red-600" />
        </button>
        <button
          type="button"
          onClick={onOpenTableModal}
          title="Insertar Tabla"
          className={btnClass(editor.isActive('table'))}
        >
          <TableIcon className="w-4 h-4 text-[#1E4D2B]" />
        </button>
      </div>

      {/* Group: Formatting Clean */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Limpiar Formato"
          className={btnClass(false)}
        >
          <RemoveFormatting className="w-4 h-4 text-gray-500" />
        </button>
        <button
          type="button"
          onClick={onOpenTemplatesModal}
          title="Plantillas de Artículo"
          className="h-8 px-2 text-xs font-semibold text-[#D4541A] bg-[#FBF0EB] hover:bg-[#F0D8CC] rounded-md flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Plantillas</span>
        </button>
      </div>

      {/* Group: View Controls */}
      <div className="flex items-center gap-0.5 ml-auto">
        <button
          type="button"
          onClick={onToggleTOC}
          title={showTOC ? "Ocultar Índice" : "Mostrar Índice de Contenidos"}
          className={btnClass(showTOC)}
        >
          <ListTree className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onToggleSplitPreview}
          title={showSplitPreview ? "Modo Edición Única" : "Vista Previa Dividida"}
          className={btnClass(showSplitPreview)}
        >
          <Columns className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onToggleHtmlSource}
          title={showHtmlSource ? "Volver a Editor Visual" : "Ver Código Fuente HTML"}
          className={btnClass(showHtmlSource)}
        >
          <Code2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa / Modo Zen"}
          className={btnClass(isFullscreen)}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#1E4D2B]" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
