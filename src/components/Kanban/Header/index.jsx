import React, { useState } from "react";
import logo from "../../../assets/images-kanban/logo-mobile.svg";
import iconDown from "../../../assets/images-kanban/icon-chevron-down.svg";
import iconUp from "../../../assets/images-kanban/icon-chevron-up.svg";
import ellipsis from "../../../assets/images-kanban/icon-vertical-ellipsis.svg";
import HeaderDropdown from "../HeaderDropdown";
import AddEditBoardModal from "../../../modals/AddEditBoardModal";
import { useSelector, useDispatch } from "react-redux";
import AddEditTaskModal from "../../../modals/AddEditTaskModal";
import ElipsisMenu from "../ElipsisMenu";
import DeleteModal from "../../../modals/DeleteModal";
import { deleteBoard, setBoardActive } from "../../../redux/slices/boardsSlice";

export function Header({ setIsBoardModalOpen, boardModalOpen }) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const dispatch = useDispatch();

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteBoard());
    dispatch(setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setIsOpenDropdown((state) => !state);
    setIsEllipsisOpen(false);
    setBoardType("add");
  };

  return (
    <div className="mt-6 py-3 px-4 fixed top-0 md:left-72 md:right-14 left-4 right-4 bg-[#000428]  dark:bg-[#000428] shadow-lg z-50 rounded-full md:rounded-3xl">
      <header className="flex justify-between dark:text-white items-center">

        {/* Lado izquierdo */}
        <div className="flex items-center justify-between space-x-2 md:space-x-2">
        <h3 className="truncate max-w-[200px] md:text-3xl font-bold text-lg md:ml-40 ml-3 mr-2 font-sans text-white">
              Kanban
            </h3>
         
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-xl font-bold text-lg md:ml-20 ml-3 mr-2 font-sans text-white">
              {board.name}
            </h3>
            <img
              src={isOpenDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 cursor-pointer md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Lado derecho */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="buttones hidden md:block"
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
          >
            + Añadir nueva tarea
          </button>
          <button
            className="buttones py-1 px-3 md:hidden"
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
          >
            +
          </button>
          <img
            onClick={() => {
              setBoardType("edit");
              setIsOpenDropdown(false);
              setIsEllipsisOpen((state) => !state);
            }}
            src={ellipsis}
            alt="ellipsis"
            className="h-6 cursor-pointer"
          />
          {isEllipsisOpen && (
            <ElipsisMenu
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
              type={"Boards"}
            />
          )}
        </div>
      </header>
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
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board.name}
          type="board"
        />
      )}
    </div>
  );
}
