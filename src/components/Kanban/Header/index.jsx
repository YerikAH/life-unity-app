import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  ElipsisMenu,
  HeaderDropdown,
  AddEditTaskModal,
  AddEditBoardModal,
  DeleteModal,
  Boards,
} from "../../Kanban";
import { deleteBoard } from "../../../redux/slices/boardsSlice";

export function Header({
  setIsBoardModalOpen,
  boardModalOpen,
  setSeeBoards,
  seeBoards,
}) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const dispatch = useDispatch();

  const setSeeBoardsSidebar = () => {
    setSeeBoards((state) => !state);
    setIsEllipsisOpen(false);
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const onDeleteBtnClick = (id) => {
    dispatch(deleteBoard(id));
    setIsDeleteModalOpen(false);
  };

  const setOpenTask = () => {
    setIsEllipsisOpen(false);
    setOpenAddEditTask((state) => !state);
  };

  return (
    <div className=" bg-white w-full p-2 md:p-0 flex flex-col gap-2 md:px-5">
      {/* Lado izquierdo */}
      <div className="flex justify-between items-center gap-5">
        <h3 className="text-3xl font-bold">{board?.name}</h3>
        <div className="flex items-center md:gap-5 flex-col-reverse md:flex-row">
          <button
            className="buttones hidden md:block text-right"
            onClick={setOpenTask}>
            + Añadir nueva tarea
          </button>
          <IconDotsVertical
            onClick={() => {
              setBoardType("edit");
              setIsEllipsisOpen((state) => !state);
            }}
            className="cursor-pointer"
          />
          {isEllipsisOpen && (
            <ElipsisMenu
              setSeeBoards={setSeeBoardsSidebar}
              setOpenAddEditTask={setOpenTask}
              setIsOpenDropdown={setIsOpenDropdown}
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
              type={"Board"}
            />
          )}
        </div>
      </div>
      <p className="text-gray-600 font-semibold text-sm md:text-md md:w-[50%]">
        {board?.description}
      </p>
      {isOpenDropdown && (
        <HeaderDropdown
          setIsBoardModalOpen={setIsBoardModalOpen}
          setIsOpenDropdown={setIsOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
          setIsOpenDropdown={setIsOpenDropdown}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          id={board.id}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board.name}
          type="board"
        />
      )}

      {seeBoards && <Boards setIsSideBarOpen={setSeeBoards} />}
    </div>
  );
}
