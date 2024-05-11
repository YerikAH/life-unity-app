import logo from "../../../assets/images-kanban/logo-mobile.svg";
import iconDown from "../../../assets/images-kanban/icon-chevron-down.svg";
import iconUp from "../../../assets/images-kanban/icon-chevron-up.svg";
import ellipsis from "../../../assets/images-kanban/icon-vertical-ellipsis.svg";
import HeaderDropdown from "../HeaderDropdown";
import AddEditBoardModal from "../../../modals/AddEditBoardModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddEditTaskModal from "../../../modals/AddEditTaskModal";
import ElipsisMenu from "../ElipsisMenu";
import DeleteModal from "../../../modals/DeleteModal";
import boardsSlice from "../../../redux/slices/boardsSlice";

export function Header({ setBoardModalOpen, boardModalOpen }) {
  const dispatch = useDispatch();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEdditTask, setOpenAddEdditTask] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);

  const [boadType, setBoadType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setIsOpenDropdown((state) => !state);
    setIsElipsisOpen(false);
    setBoadType("add");
  };

  return (
    <div className='p-4 fixed left-0 bg-[#000428] dark:bg-[#000428] z-50 right-0'>
      <header className='flex justify-between dark:text-white items-center '>
        {/* Left side */}

        <div className='flex items-center space-x-2 md:space-x-4'>
          <img src={logo} alt='logo' className='h-6 w-6' />
          <h3 className='hidden md:inline-block font-bold fond-sans md:text-4xl text-white'>
            Life-Unity
          </h3>
          <div className='flex items-center'>
            <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans text-white'>
              {board.name}
            </h3>
            <img
              src={isOpenDropdown ? iconUp : iconDown}
              alt='dropdown icon'
              className='w-3 ml-2 cursor-pointer md:hidden'
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right side */}

        <div className='flex space-x-4 items-center md:space-x-6'>
          <button
            className='buttones hidden md:block'
            onClick={() => {
              setOpenAddEdditTask((state) => !state);
            }}
          >
            + Añadir nueva tarea
          </button>
          <button
            className='buttones py-1 px-3 md:hidden'
            onClick={() => {
              setOpenAddEdditTask((state) => !state);
            }}
          >
            +
          </button>
          <img
            onClick={() => {
              setBoadType("edit");
              setIsOpenDropdown(false);
              setIsElipsisOpen((state) => !state);
            }}
            src={ellipsis}
            alt='ellipsis'
            className='h-6  cursor-pointer'
          />
          {isElipsisOpen && (
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
          setBoardModalOpen={setBoardModalOpen}
          setIsOpenDropdown={setIsOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boadType}
          setBoardModalOpen={setBoardModalOpen}
          setIsOpenDropdown={setIsOpenDropdown}
        />
      )}

      {openAddEdditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEdditTask}
          device='mobile'
          type='add'
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board.name}
          type='board'
        />
      )}
    </div>
  );
}
