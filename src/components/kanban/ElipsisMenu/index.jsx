import trash from "../../../assets/images-kanban/Trash.svg";
import palete from "../../../assets/images-kanban/Color Palette.svg";
export default function ElipsisMenu({
  type,
  setOpenEditModal,
  setOpenDeleteModal,
}) {
  return (
    <div
      className={
        type === "Boards" ? "absolute top-16 right-5" : "absolute top-6 right-4"
      }
    >
      <div className='flex justify-end items-center'>
        <div className='w-50 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-gray-700 space-y-4 py-5 px-4 rounded-lg h-auto pr-12'>
          <div className="flex gap-2 items-center ">
            <img src={palete} alt='' className="w-8 h-8" />
            <p
              className='cursor-pointer dark:text-white text-gray-700'
              onClick={() => {
                setOpenEditModal();
              }}
            >
              Editar {type}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <img src={trash} alt='' className="w-8 h-8" />
            <p
              className='cursor-pointer text-red-600 text-bold '
              onClick={() => setOpenDeleteModal()}
            >
              Borrar {type}?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
