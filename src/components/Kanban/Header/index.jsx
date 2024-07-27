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
import { changeActive, deleteBoards } from "../../../redux/slices/boardsSlice";

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
  const idActiveBoard = useSelector((state)=>state.kanban?.idActiveBoard)
  const boards = useSelector((state) => state.kanban?.boards);
  const board = boards.find((item)=>item.id === idActiveBoard)
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
    dispatch(deleteBoards(id));
    dispatch(changeActive(board.length > 1 ? board[0].id : null));
    setIsDeleteModalOpen(false);
  };

  const setOpenTask = () => {
    setIsEllipsisOpen(false);
    setOpenAddEditTask((state) => !state);
  };

  return (
    <div className=" bg-white p-2 md:p-0 flex flex-col justify-between gap-2 md:px-5">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold">{board?.board_name}</h3>
        <div className="flex items-center md:gap-5 flex-col-reverse md:flex-row">
          <button
            className="buttones hidden lg:block text-right"
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
        {board?.board_description}
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
          title={board.board_name}
          type="board"
        />
      )}

      {seeBoards && <Boards setIsSideBarOpen={setSeeBoards} />}
    </div>
  );
}
