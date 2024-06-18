import { useState } from "react";
import {AddEditBoardModal} from "../../Kanban";

export function EmptyBoard({ type }) {
  // Estado para controlar la apertura del modal de nuevo Board
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center h-full gap-3'>
      {/* Mensaje de acuerdo al tipo de acción */}
      <h3 className='text-gray-500 font-bold text-center'>
        {type === "edit"
          ? "Este Board está vacío. Crea una nueva columna para comenzar."
          : "No hay tableros disponibles. Crea un nuevo Board para empezar."}
      </h3>

      {/* Botón para agregar nueva columna o nuevo Board */}
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className='w-full max-w-xs font-bold hover:opacity-70 dark:text-white relative text-white bg-[#000428] p-2 rounded-full'
      >
        {type === "edit" ? "Agregar nueva Columna" : "Agregar nuevo Board"}
      </button>

      {/* Modal para agregar/editar Board */}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
