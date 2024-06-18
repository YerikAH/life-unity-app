
export function DeleteModal({ type, title, id, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    <div
    onClick={(e) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      setIsDeleteModalOpen(false);
    }}
      className='fixed inset-0 z-50 justify-center items-center flex bg-[#00000080] bg-opacity-35 transition-opacity backdrop-blur-sm'
      
    >
      {/* Modal borrar */}
      <div className='flex flex-col gap-5 text-center max-w-md bg-white text-black w-full p-8 rounded-xl mx-5'>
        <h3 className='font-bold text-red-800 text-xl'>Borrar este {type}</h3>
        {type === "task" ? (
          <p className='text-gray-500 font-bold tracking-wide text-sm'>
            Estas seguro que quieres borrar la tarea &quot;{title}&quot; y sus subtareas?
            Esta accion no se puede revertir.
          </p>
        ) : (
          <p className='text-gray-500 font-bold tracking-wide text-sm'>
            Estas seguro que quieres borrar el board &quot;{title}&quot; ? Esta accion
            eliminara todas las columnas y tareas, no se puede revertir.
          </p>
        )}

        <div className='flex full-w mt-4 items-center justify-center space-x-4'>
          <button 
          onClick={()=>{onDeleteBtnClick(id)}}
          className='w-full items-center text-white hover:opacity-75 font-semibold bg-red-800 py-2 rounded-full'>
            Borrar
          </button>
          <button 
          onClick={() => {setIsDeleteModalOpen(false)}}
          className='w-full items-center text-white  hover:opacity-75 font-semibold bg-primary py-2 rounded-full'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
