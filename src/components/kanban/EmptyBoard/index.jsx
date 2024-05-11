import React, { useState } from "react";
import AddEditBoardModal from "../../../modals/AddEditBoardModal";

export default function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div className='bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col items-center justify-center'>
      <h3 className='text-gray-500 font-bold'>
        {type === "edit"
          ? "Este Board esta vacio. Crea un nuevo columna para comenzar"
          : "No hay tableros disponibles crea un nuevo Board para empezar"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className='w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#000428] mt-8 relative text-white bg-[#000428] py-2 rounded-full'
      >
        {type === "edit" ? "Agregar nueva Columna" : "Agregar nuevo Board"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
