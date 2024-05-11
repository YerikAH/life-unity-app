import React from "react";


export default function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    // contenedor del modal
    <div
      className='fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-none z-50 justify-center items-center flex bg-[#00000080]'
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
    >
      {/* Modal borrar */}
      <div className='scrollbar-none overflow-scroll max-w-md max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white w-full px-8 py-8 rounded-xl'>
        <h3 className='font-bold text-red-500'>Borrar este {type}</h3>
        {type === "task" ? (
          <p className='text-gray-200 font-semibold tracking-wide text-sm pt-6'>
            Estas seguro que quieres borrar la tarea "{title}" y sus subtareas?
            Esta accion no se puede revertir.
          </p>
        ) : (
          <p className='text-gray-500 font-semibold tracking-wide text-sm pt-6'>
            Estas seguro que quieres borrar el board "{title}"? Esta accion
            eliminara todas las columnas y tareas, no se puede revertir.
          </p>
        )}

        <div className='flex full-w mt-4 items-center justify-center space-x-4'>
          <button 
          onClick={onDeleteBtnClick}
          className='w-full items-center text-white hover:opacity-75 font-semibold bg-red-500 py-2 rounded-full'>
            Borrar
          </button>
          <button 
          onClick={() => setIsDeleteModalOpen(false)}
          className='w-full items-center text-blue-500   hover:opacity-75 font-semibold bg-[#635fc71a] py-2 rounded-full'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
