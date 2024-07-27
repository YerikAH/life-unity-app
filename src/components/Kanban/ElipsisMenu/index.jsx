import { IconEdit, IconTrash, IconPlus, IconEye } from "@tabler/icons-react";

export function ElipsisMenu({
  setSeeBoards,
  type,
  setOpenAddEditTask,
  setOpenEditModal,
  setOpenDeleteModal,
}) {
  return (
    <div
      className={
        type === "Board"
          ? "absolute top-[50px] right-8"
          : "absolute top-6 right-7"
      }>
      <div className="w-50 text-sm z-10 font-medium shadow-lg shadow-[#364e7e1a] bg-white dark:bg-[#000428] space-y-4 p-5 rounded-lg relative">
        {type === "Board" && (
          <button
            className="flex gap-2 items-center lg:hidden"
            onClick={setOpenAddEditTask}>
            <IconPlus className="w-10 h-8" />
            <span className="cursor-pointer text-bold ">Agregar Task</span>
          </button>
        )}
        {/* Botón para editar el elemento */}
        <button className="flex gap-2 items-center" onClick={setOpenEditModal}>
          <IconEdit alt="" className="w-10 h-8 bg-white" />
          <span className="cursor-pointer dark:text-white text-gray-700">
            Editar {type}
          </span>
        </button>
        {/* Botón para borrar el elemento */}
        <button
          className="flex gap-2 items-center"
          onClick={setOpenDeleteModal}>
          <IconTrash className="w-10 h-8 text-red-800" />
          <span className="cursor-pointer text-red-800 text-bold ">
            Borrar {type}
          </span>
        </button>
        {type === "Board" && (
          <button className="flex gap-2 items-center" onClick={setSeeBoards}>
            <IconEye className="w-10 h-8" />
            <span className="cursor-pointer text-bold ">Ver Boards</span>
          </button>
        )}
      </div>
    </div>
  );
}
