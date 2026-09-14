import React from 'react';
import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Highlighter,
  Heading2,
  Heading3
} from 'lucide-react';

interface EditorBubbleMenuProps {
  editor: Editor;
  onOpenLinkModal: () => void;
}

export const EditorBubbleMenu: React.FC<EditorBubbleMenuProps> = ({ editor, onOpenLinkModal }) => {
  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    `p-1.5 rounded-md text-xs transition-colors flex items-center justify-center ${
      isActive
        ? 'bg-[#EAF2EC] text-[#1E4D2B] font-bold'
        : 'text-gray-200 hover:text-white hover:bg-white/10'
    }`;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, placement: 'top' }}
      className="bg-[#1A1A2A] text-white rounded-lg shadow-xl p-1 flex items-center gap-1 border border-gray-700 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive('bold'))}
        title="Negrita (Ctrl+B)"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive('italic'))}
        title="Cursiva (Ctrl+I)"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btnClass(editor.isActive('underline'))}
        title="Subrayado"
      >
        <UnderlineIcon className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive('strike'))}
        title="Tachado"
      >
        <Strikethrough className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={btnClass(editor.isActive('code'))}
        title="Código"
      >
        <Code className="w-3.5 h-3.5" />
      </button>

      <div className="w-[1px] h-4 bg-gray-700 mx-0.5" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive('heading', { level: 2 }))}
        title="Título H2"
      >
        <Heading2 className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btnClass(editor.isActive('heading', { level: 3 }))}
        title="Título H3"
      >
        <Heading3 className="w-3.5 h-3.5" />
      </button>

      <div className="w-[1px] h-4 bg-gray-700 mx-0.5" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#FEF08A' }).run()}
        className={btnClass(editor.isActive('highlight'))}
        title="Resaltar Texto"
      >
        <Highlighter className="w-3.5 h-3.5 text-yellow-300" />
      </button>

      <button
        type="button"
        onClick={onOpenLinkModal}
        className={btnClass(editor.isActive('link'))}
        title="Insertar/Editar Enlace"
      >
        <LinkIcon className="w-3.5 h-3.5 text-[#2E7D3E]" />
      </button>
    </BubbleMenu>
  );
};
