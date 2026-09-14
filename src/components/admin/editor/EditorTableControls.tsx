import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Plus,
  Trash2,
  Table as TableIcon,
  BetweenVerticalEnd,
  BetweenHorizontalEnd,
  Split,
  Combine
} from 'lucide-react';

interface EditorTableControlsProps {
  editor: Editor;
}

export const EditorTableControls: React.FC<EditorTableControlsProps> = ({ editor }) => {
  if (!editor || !editor.isActive('table')) return null;

  return (
    <div className="bg-[#1A1A2A] text-white px-3 py-1.5 rounded-lg shadow-xl mb-3 flex flex-wrap items-center gap-1 text-xs border border-gray-700 animate-in fade-in slide-in-from-top-1">
      <div className="flex items-center gap-1.5 text-[#C0D8C4] font-medium pr-2 border-r border-gray-700">
        <TableIcon className="w-3.5 h-3.5" />
        <span>Tabla Activa:</span>
      </div>

      {/* Rows */}
      <div className="flex items-center gap-0.5 pr-2 border-r border-gray-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-1 hover:bg-white/10 rounded flex items-center gap-1 text-gray-200 hover:text-white"
          title="Agregar Fila Arriba"
        >
          <Plus className="w-3 h-3 text-green-400" />
          <span>Fila Arriba</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="p-1 hover:bg-white/10 rounded flex items-center gap-1 text-gray-200 hover:text-white"
          title="Agregar Fila Abajo"
        >
          <Plus className="w-3 h-3 text-green-400" />
          <span>Fila Abajo</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="p-1 hover:bg-red-500/20 text-red-300 hover:text-red-200 rounded flex items-center gap-1"
          title="Eliminar Fila"
        >
          <Trash2 className="w-3 h-3" />
          <span>Eliminar Fila</span>
        </button>
      </div>

      {/* Columns */}
      <div className="flex items-center gap-0.5 pr-2 border-r border-gray-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-1 hover:bg-white/10 rounded flex items-center gap-1 text-gray-200 hover:text-white"
          title="Agregar Columna Izquierda"
        >
          <BetweenVerticalEnd className="w-3 h-3 text-blue-400" />
          <span>Columna Izq</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="p-1 hover:bg-white/10 rounded flex items-center gap-1 text-gray-200 hover:text-white"
          title="Agregar Columna Derecha"
        >
          <BetweenHorizontalEnd className="w-3 h-3 text-blue-400" />
          <span>Columna Der</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="p-1 hover:bg-red-500/20 text-red-300 hover:text-red-200 rounded flex items-center gap-1"
          title="Eliminar Columna"
        >
          <Trash2 className="w-3 h-3" />
          <span>Eliminar Col</span>
        </button>
      </div>

      {/* Header & Cells */}
      <div className="flex items-center gap-0.5 pr-2 border-r border-gray-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          className="p-1 hover:bg-white/10 rounded text-gray-200 hover:text-white"
          title="Alternar Fila de Encabezado"
        >
          Fila Cabecera
        </button>
        {editor.can().mergeCells() && (
          <button
            type="button"
            onClick={() => editor.chain().focus().mergeCells().run()}
            className="p-1 hover:bg-white/10 rounded flex items-center gap-1 text-gray-200"
            title="Combinar Celdas Seleccionadas"
          >
            <Combine className="w-3 h-3" />
            <span>Combinar</span>
          </button>
        )}
        {editor.can().splitCell() && (
          <button
            type="button"
            onClick={() => editor.chain().focus().splitCell().run()}
            className="p-1 hover:bg-white/10 rounded flex items-center gap-1 text-gray-200"
            title="Dividir Celda"
          >
            <Split className="w-3 h-3" />
            <span>Dividir</span>
          </button>
        )}
      </div>

      {/* Delete Table */}
      <button
        type="button"
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="p-1 hover:bg-red-600 text-white rounded flex items-center gap-1 font-semibold ml-auto"
        title="Eliminar toda la tabla"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Borrar Tabla</span>
      </button>
    </div>
  );
};
