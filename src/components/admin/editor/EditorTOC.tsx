import React, { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import { ListTree, X } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
  pos: number;
}

interface EditorTOCProps {
  editor: Editor;
  onClose: () => void;
}

export const EditorTOC: React.FC<EditorTOCProps> = ({ editor, onClose }) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    if (!editor) return;

    const updateHeadings = () => {
      const items: HeadingItem[] = [];
      const { doc } = editor.state;

      doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const text = node.textContent;
          if (text.trim()) {
            items.push({
              id: `heading-${pos}`,
              text,
              level: node.attrs.level,
              pos
            });
          }
        }
      });

      setHeadings(items);
    };

    updateHeadings();
    editor.on('update', updateHeadings);

    return () => {
      editor.off('update', updateHeadings);
    };
  }, [editor]);

  const scrollToHeading = (pos: number) => {
    editor.chain().focus().setTextSelection(pos).run();
  };

  return (
    <aside className="w-64 border-l border-border bg-gray-50/70 p-4 flex flex-col h-full select-none overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
          <ListTree className="w-4 h-4 text-[#1E4D2B]" />
          <span>Índice del Artículo</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-200/60"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {headings.length === 0 ? (
        <div className="text-xs text-gray-400 italic py-6 text-center">
          No hay títulos o encabezados (H1, H2, H3) en el documento todavía.
        </div>
      ) : (
        <nav className="space-y-1">
          {headings.map((item, idx) => (
            <button
              key={`${item.pos}-${idx}`}
              type="button"
              onClick={() => scrollToHeading(item.pos)}
              className={`w-full text-left rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-[#EAF2EC] hover:text-[#1E4D2B] block truncate ${
                item.level === 1
                  ? 'font-bold text-gray-900'
                  : item.level === 2
                  ? 'pl-4 text-gray-700 font-medium'
                  : 'pl-6 text-gray-500'
              }`}
              title={item.text}
            >
              {item.text}
            </button>
          ))}
        </nav>
      )}

      <div className="mt-auto pt-4 border-t border-border text-[11px] text-gray-400">
        Haz clic en cualquier sección para saltar directamente en el editor.
      </div>
    </aside>
  );
};
