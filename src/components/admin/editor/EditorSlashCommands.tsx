import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tiptap/react';
import {
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
  Code2,
  Minus,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface EditorSlashCommandsProps {
  editor: Editor;
  onOpenImageModal: () => void;
  onOpenYoutubeModal: () => void;
  onOpenTableModal: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: (editor: Editor) => void;
}

export const EditorSlashCommands: React.FC<EditorSlashCommandsProps> = ({
  editor,
  onOpenImageModal,
  onOpenYoutubeModal,
  onOpenTableModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    {
      id: 'h1',
      title: 'Título 1 (H1)',
      subtitle: 'Encabezado principal de sección',
      icon: <Heading1 className="w-4 h-4 text-[#1E4D2B]" />,
      action: (ed) => ed.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      id: 'h2',
      title: 'Título 2 (H2)',
      subtitle: 'Subtítulo o sección secundaria',
      icon: <Heading2 className="w-4 h-4 text-[#1E4D2B]" />,
      action: (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run()
    },
    {
      id: 'h3',
      title: 'Título 3 (H3)',
      subtitle: 'Subsección o apartado',
      icon: <Heading3 className="w-4 h-4 text-[#2E7D3E]" />,
      action: (ed) => ed.chain().focus().toggleHeading({ level: 3 }).run()
    },
    {
      id: 'bullet-list',
      title: 'Lista con Viñetas',
      subtitle: 'Lista estándar con puntos',
      icon: <List className="w-4 h-4 text-gray-700" />,
      action: (ed) => ed.chain().focus().toggleBulletList().run()
    },
    {
      id: 'ordered-list',
      title: 'Lista Numerada',
      subtitle: 'Lista secuencial con números',
      icon: <ListOrdered className="w-4 h-4 text-gray-700" />,
      action: (ed) => ed.chain().focus().toggleOrderedList().run()
    },
    {
      id: 'task-list',
      title: 'Lista de Tareas / Checklist',
      subtitle: 'Casillas de verificación interactivas',
      icon: <ListTodo className="w-4 h-4 text-[#2E7D3E]" />,
      action: (ed) => ed.chain().focus().toggleTaskList().run()
    },
    {
      id: 'blockquote',
      title: 'Cita en Bloque',
      subtitle: 'Destacar frases o testimonios',
      icon: <Quote className="w-4 h-4 text-[#1E4D2B]" />,
      action: (ed) => ed.chain().focus().toggleBlockquote().run()
    },
    {
      id: 'callout-info',
      title: 'Caja Informativa',
      subtitle: 'Cuadro azul para datos y notas',
      icon: <AlertCircle className="w-4 h-4 text-blue-600" />,
      action: (ed) =>
        ed
          .chain()
          .focus()
          .insertContent('<div class="editor-callout editor-callout-info"><p><strong>Nota Informativa:</strong> Escribe tu mensaje aquí...</p></div>')
          .run()
    },
    {
      id: 'callout-tip',
      title: 'Caja de Consejo / Tip',
      subtitle: 'Cuadro verde para recomendaciones',
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
      action: (ed) =>
        ed
          .chain()
          .focus()
          .insertContent('<div class="editor-callout editor-callout-tip"><p><strong>Consejo de Uso:</strong> Escribe aquí una buena práctica...</p></div>')
          .run()
    },
    {
      id: 'callout-warning',
      title: 'Caja de Precaución',
      subtitle: 'Cuadro ámbar para advertencias',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      action: (ed) =>
        ed
          .chain()
          .focus()
          .insertContent('<div class="editor-callout editor-callout-warning"><p><strong>Precaución:</strong> Escribe aquí la advertencia...</p></div>')
          .run()
    },
    {
      id: 'table',
      title: 'Tabla',
      subtitle: 'Crear tabla de filas y columnas',
      icon: <TableIcon className="w-4 h-4 text-[#1E4D2B]" />,
      action: () => onOpenTableModal()
    },
    {
      id: 'image',
      title: 'Imagen',
      subtitle: 'Subir archivo o pegar URL',
      icon: <ImageIcon className="w-4 h-4 text-[#2E7D3E]" />,
      action: () => onOpenImageModal()
    },
    {
      id: 'youtube',
      title: 'Video de YouTube',
      subtitle: 'Incrustar video con reproductor',
      icon: <Youtube className="w-4 h-4 text-red-600" />,
      action: () => onOpenYoutubeModal()
    },
    {
      id: 'code-block',
      title: 'Bloque de Código',
      subtitle: 'Bloque con fondo oscuro y monoespaciado',
      icon: <Code2 className="w-4 h-4 text-gray-700" />,
      action: (ed) => ed.chain().focus().toggleCodeBlock().run()
    },
    {
      id: 'divider',
      title: 'Línea Divisoria',
      subtitle: 'Separador visual horizontal',
      icon: <Minus className="w-4 h-4 text-gray-700" />,
      action: (ed) => ed.chain().focus().setHorizontalRule().run()
    }
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (view: any, event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
          return true;
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
          return true;
        }
        if (event.key === 'Enter') {
          event.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          return true;
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          setIsOpen(false);
          return true;
        }
      }
      return false;
    };

    const handleUpdate = () => {
      const { selection } = editor.state;
      const { $from } = selection;
      const currentLineText = $from.parent.textContent;

      // Check if user just typed `/`
      if (currentLineText.startsWith('/')) {
        const queryText = currentLineText.slice(1);
        setQuery(queryText);
        setSelectedIndex(0);

        try {
          // Get cursor DOM coords
          const coords = editor.view.coordsAtPos($from.pos);
          setPosition({
            top: coords.bottom + window.scrollY + 6,
            left: coords.left + window.scrollX
          });
          setIsOpen(true);
        } catch {
          setIsOpen(false);
        }
      } else {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
    };
  }, [editor, isOpen, filteredCommands, selectedIndex]);

  const executeCommand = (cmd: CommandItem) => {
    // Delete the `/query` text
    const { selection } = editor.state;
    const { $from } = selection;
    const currentLineText = $from.parent.textContent;
    
    if (currentLineText.startsWith('/')) {
      const startPos = $from.start();
      const endPos = $from.pos;
      editor.chain().focus().deleteRange({ from: startPos, to: endPos }).run();
    }

    cmd.action(editor);
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen || filteredCommands.length === 0) return null;

  return (
    <div
      ref={menuRef}
      style={{
        top: `${position.top}px`,
        left: `${Math.min(position.left, window.innerWidth - 300)}px`
      }}
      className="fixed z-50 w-72 bg-white rounded-xl shadow-2xl border border-border p-1.5 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95"
    >
      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-border mb-1">
        Comandos Rápidos ({filteredCommands.length})
      </div>
      <div className="space-y-0.5">
        {filteredCommands.map((cmd, idx) => (
          <button
            key={cmd.id}
            type="button"
            onClick={() => executeCommand(cmd)}
            onMouseEnter={() => setSelectedIndex(idx)}
            className={`w-full text-left p-2 rounded-lg flex items-center gap-3 transition-colors ${
              idx === selectedIndex
                ? 'bg-[#EAF2EC] text-[#1E4D2B]'
                : 'hover:bg-gray-100 text-gray-800'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
              {cmd.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold truncate">{cmd.title}</div>
              <div className="text-[11px] text-gray-500 truncate">{cmd.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
