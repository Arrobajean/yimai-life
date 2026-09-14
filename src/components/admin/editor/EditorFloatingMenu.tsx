import React from 'react';
import { Editor } from '@tiptap/react';
import { FloatingMenu } from '@tiptap/react/menus';
import {
  Heading1,
  Heading2,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Table as TableIcon,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

interface EditorFloatingMenuProps {
  editor: Editor;
  onOpenImageModal: () => void;
  onOpenTableModal: () => void;
}

export const EditorFloatingMenu: React.FC<EditorFloatingMenuProps> = ({
  editor,
  onOpenImageModal,
  onOpenTableModal
}) => {
  if (!editor) return null;

  const insertCallout = () => {
    const html = `<div class="editor-callout editor-callout-info"><p><strong>Nota Informativa:</strong> Escribe tu contenido destacado aquí...</p></div>`;
    editor.chain().focus().insertContent(html).run();
  };

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100, placement: 'left' }}
      className="bg-white rounded-lg shadow-lg border border-border p-1 flex items-center gap-0.5 animate-in fade-in"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="p-1.5 rounded hover:bg-[#EAF2EC] text-gray-700 hover:text-[#1E4D2B] transition-colors"
        title="Título 1"
      >
        <Heading1 className="w-4 h-4 text-[#1E4D2B]" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="p-1.5 rounded hover:bg-[#EAF2EC] text-gray-700 hover:text-[#1E4D2B] transition-colors"
        title="Título 2"
      >
        <Heading2 className="w-4 h-4 text-[#1E4D2B]" />
      </button>

      <div className="w-[1px] h-4 bg-gray-200 mx-0.5" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
        title="Lista de Viñetas"
      >
        <List className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
        title="Lista Numerada"
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
        title="Lista de Tareas"
      >
        <ListTodo className="w-4 h-4 text-[#2E7D3E]" />
      </button>

      <div className="w-[1px] h-4 bg-gray-200 mx-0.5" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
        title="Cita"
      >
        <Quote className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={insertCallout}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
        title="Caja de Aviso"
      >
        <AlertCircle className="w-4 h-4 text-blue-600" />
      </button>

      <button
        type="button"
        onClick={onOpenTableModal}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
        title="Insertar Tabla"
      >
        <TableIcon className="w-4 h-4 text-[#1E4D2B]" />
      </button>

      <button
        type="button"
        onClick={onOpenImageModal}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
        title="Insertar Imagen"
      >
        <ImageIcon className="w-4 h-4 text-[#2E7D3E]" />
      </button>
    </FloatingMenu>
  );
};
