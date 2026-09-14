import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Youtube } from '@tiptap/extension-youtube';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import { TextAlign } from '@tiptap/extension-text-align';
import { Highlight } from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Placeholder } from '@tiptap/extension-placeholder';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Typography } from '@tiptap/extension-typography';

import { EditorToolbar } from './EditorToolbar';
import { EditorBubbleMenu } from './EditorBubbleMenu';
import { EditorFloatingMenu } from './EditorFloatingMenu';
import { EditorSlashCommands } from './EditorSlashCommands';
import { EditorTableControls } from './EditorTableControls';
import { EditorTOC } from './EditorTOC';
import {
  LinkModal,
  ImageModal,
  YoutubeModal,
  TableModal,
  TemplatesModal
} from './EditorModals';
import { EditorTemplate } from '../../../types/blog';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  Clock, 
  FileText, 
  Check, 
  Sparkles 
} from 'lucide-react';

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  onApplyTemplate?: (template: EditorTemplate) => void;
  placeholder?: string;
  className?: string;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  onApplyTemplate,
  placeholder = 'Comienza a redactar tu artículo o escribe "/" para ver opciones...',
  className = ''
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSplitPreview, setShowSplitPreview] = useState(false);
  const [showHtmlSource, setShowHtmlSource] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);
  const [showTOC, setShowTOC] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Modals state
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        },
        codeBlock: true,
        dropcursor: {
          color: '#1E4D2B',
          width: 2
        }
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: 'text-[#2E7D3E] underline font-medium hover:text-[#1E4D2B]'
        }
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
        HTMLAttributes: {
          class: 'rounded-xl shadow-md my-4 max-w-full'
        }
      }),
      Youtube.configure({
        inline: false,
        controls: true,
        nocookie: true,
        HTMLAttributes: {
          class: 'rounded-xl overflow-hidden shadow-md my-6 w-full aspect-video'
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse w-full my-4'
        }
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image']
      }),
      Highlight.configure({
        multicolor: true
      }),
      TextStyle,
      Color,
      Subscript,
      Superscript,
      TaskList.configure({
        HTMLAttributes: {
          class: 'not-prose pl-0'
        }
      }),
      TaskItem.configure({
        nested: true
      }),
      Placeholder.configure({
        placeholder
      }),
      CharacterCount.configure(),
      Typography
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlContent(html);
      onChange(html);
    }
  });

  // Sync external value changes if editor content is different
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
      setHtmlContent(value);
    }
  }, [value, editor]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleHtmlSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtmlContent(newHtml);
    onChange(newHtml);
    if (editor) {
      editor.commands.setContent(newHtml);
    }
  };

  const handleTemplateApply = useCallback(
    (tmpl: EditorTemplate) => {
      if (editor) {
        editor.commands.setContent(tmpl.content);
        setHtmlContent(tmpl.content);
        onChange(tmpl.content);
      }
      if (onApplyTemplate) {
        onApplyTemplate(tmpl);
      }
    },
    [editor, onChange, onApplyTemplate]
  );

  if (!editor) {
    return (
      <div className="border border-border rounded-xl p-12 bg-white flex items-center justify-center text-muted-foreground text-sm">
        <Sparkles className="w-5 h-5 animate-spin mr-2 text-[#2E7D3E]" />
        <span>Cargando Editor TipTap v3...</span>
      </div>
    );
  }

  const wordCount = editor.storage.characterCount.words();
  const charCount = editor.storage.characterCount.characters();
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const deviceWidthClass = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] mx-auto shadow-xl border-x',
    mobile: 'max-w-[390px] mx-auto shadow-xl border-x'
  }[previewDevice];

  return (
    <div
      className={`tiptap-editor-container bg-white border border-border rounded-xl shadow-sm flex flex-col overflow-hidden transition-all duration-200 ${
        isFullscreen ? 'editor-fullscreen-active' : ''
      } ${className}`}
    >
      {/* 1. Main Rich Toolbar */}
      <EditorToolbar
        editor={editor}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        showSplitPreview={showSplitPreview}
        onToggleSplitPreview={() => setShowSplitPreview(!showSplitPreview)}
        showHtmlSource={showHtmlSource}
        onToggleHtmlSource={() => setShowHtmlSource(!showHtmlSource)}
        showTOC={showTOC}
        onToggleTOC={() => setShowTOC(!showTOC)}
        onOpenLinkModal={() => setIsLinkModalOpen(true)}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        onOpenYoutubeModal={() => setIsYoutubeModalOpen(true)}
        onOpenTableModal={() => setIsTableModalOpen(true)}
        onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
      />

      {/* 2. Floating Sub-menus */}
      <EditorBubbleMenu editor={editor} onOpenLinkModal={() => setIsLinkModalOpen(true)} />
      <EditorFloatingMenu
        editor={editor}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        onOpenTableModal={() => setIsTableModalOpen(true)}
      />
      <EditorSlashCommands
        editor={editor}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        onOpenYoutubeModal={() => setIsYoutubeModalOpen(true)}
        onOpenTableModal={() => setIsTableModalOpen(true)}
      />

      {/* 3. Main Editor Work Area with optional Split Preview & TOC */}
      <div className="flex-1 flex flex-row overflow-hidden relative min-h-[440px]">
        {/* Editor Main Canvas */}
        <div className={`flex-1 flex flex-col overflow-y-auto ${showSplitPreview ? 'border-r border-border' : ''}`}>
          {/* Context Table Toolbar if cursor inside table */}
          <div className="px-6 pt-4">
            <EditorTableControls editor={editor} />
          </div>

          {showHtmlSource ? (
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Código Fuente HTML</span>
                <span className="text-[11px] text-[#2E7D3E]">Edición en vivo</span>
              </div>
              <textarea
                value={htmlContent}
                onChange={handleHtmlSourceChange}
                className="w-full flex-1 min-h-[360px] p-4 font-mono text-xs bg-gray-900 text-green-400 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E7D3E]"
                spellCheck={false}
              />
            </div>
          ) : (
            <div className="p-6 md:p-8 flex-1">
              <EditorContent editor={editor} className="tiptap prose prose-slate max-w-none focus:outline-none" />
            </div>
          )}
        </div>

        {/* Live Split Preview Panel (Optional) */}
        {showSplitPreview && (
          <div className="flex-1 bg-gray-50/70 flex flex-col overflow-y-auto">
            <div className="p-3 border-b border-border bg-white flex items-center justify-between sticky top-0 z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Vista Previa en Vivo
              </span>
              <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-white shadow-xs text-[#1E4D2B]' : 'text-gray-500'}`}
                  title="Vista Escritorio"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-1 rounded ${previewDevice === 'tablet' ? 'bg-white shadow-xs text-[#1E4D2B]' : 'text-gray-500'}`}
                  title="Vista Tablet"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-white shadow-xs text-[#1E4D2B]' : 'text-gray-500'}`}
                  title="Vista Móvil"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className={`bg-white p-6 rounded-xl transition-all duration-200 ${deviceWidthClass}`}>
                <div
                  className="article-prose prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: htmlContent || '<p class="text-gray-400 italic">No hay contenido aún...</p>' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TOC Outline Sidebar (Optional) */}
        {showTOC && <EditorTOC editor={editor} onClose={() => setShowTOC(false)} />}
      </div>

      {/* 4. Real-time Status and Metrics Footer */}
      <div className="bg-gray-50 px-4 py-2 border-t border-border flex flex-wrap items-center justify-between text-xs text-gray-500 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <FileText className="w-3.5 h-3.5 text-[#1E4D2B]" />
            <span>{wordCount} palabras</span>
          </span>
          <span className="hidden sm:inline-block text-gray-300">|</span>
          <span className="hidden sm:inline-block">
            {charCount} caracteres
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1 text-gray-600">
            <Clock className="w-3.5 h-3.5 text-[#D4541A]" />
            <span>~{readingTime} min de lectura</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400 hidden md:inline">
            Escribe <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono text-[10px] text-gray-600 shadow-xs">/</kbd> para insertar bloques
          </span>
          <span className="flex items-center gap-1 text-[#2E7D3E] font-medium text-[11px] bg-[#EAF2EC] px-2 py-0.5 rounded-full">
            <Check className="w-3 h-3" />
            <span>TipTap v3 Activo</span>
          </span>
        </div>
      </div>

      {/* 5. Modals */}
      <LinkModal
        editor={editor}
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
      />
      <ImageModal
        editor={editor}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
      <YoutubeModal
        editor={editor}
        isOpen={isYoutubeModalOpen}
        onClose={() => setIsYoutubeModalOpen(false)}
      />
      <TableModal
        editor={editor}
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
      />
      <TemplatesModal
        editor={editor}
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onApplyTemplate={handleTemplateApply}
      />
    </div>
  );
};
