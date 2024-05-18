import React, { useState } from "react";
import AddEditBoardModal from "../../../modals/AddEditBoardModal";

export default function EmptyBoard({ type }) {
  // Estado para controlar la apertura del modal de nuevo Board
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className='bg-white dark:bg-gray-800 h-screen w-screen flex flex-col items-center justify-center'>
      {/* Mensaje de acuerdo al tipo de acción */}
      <h3 className='text-gray-500 font-bold'>
        {type === "edit"
          ? "Este Board está vacío. Crea una nueva columna para comenzar."
          : "No hay tableros disponibles. Crea un nuevo Board para empezar."}
      </h3>

      {/* Botón para agregar nueva columna o nuevo Board */}
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className='w-full max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-gray-700 mt-8 relative text-white bg-blue-500 dark:bg-[#000428] py-2 rounded-full'
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
