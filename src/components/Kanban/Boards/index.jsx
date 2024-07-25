import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconEyeOff, IconChalkboard, IconSquarePlus } from "@tabler/icons-react";
import { setBoardActive, changeActive } from "../../../redux/slices/boardsSlice";
import { AddEditBoardModal } from "..";

export function Boards({ setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.kanban?.boards);
  const idActiveBoard = useSelector((state) => state.kanban?.idActiveBoard);
  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsSideBarOpen(false);
      }}
      className="fixed inset-0 z-50 justify-center items-center flex bg-[#00000080] bg-opacity-35 transition-opacity backdrop-blur-sm">
      <div className="bg-white shadow-xl rounded-lg max-w-md w-full mx-5 py-10">
        {/* reWrite modal  */}
        <h3 className="text-gray-600 font-semibold mx-4 mb-8 text-xl text-center">
          Todos los Tableros ({boards?.length})
        </h3>

        <div className="flex flex-col justify-between gap-2">
          {boards.map((board) => (
            <button
              className={`text-left flex gap-4 items-center px-5 mr-8 rounded-r-xl duration-300 ease-in-out py-4 hover:bg-[#000428bd] hover:text-white ${
                board.id === idActiveBoard &&
                " bg-[#000428] rounded-r-xl text-white"
              } `}
              key={board.id}
              onClick={() => {
                dispatch(changeActive(board.id));
              }}>
              <IconChalkboard/>
              <span className="text-lg font-bold">{board.board_name}</span>
            </button>
          ))}

          <button
            className="text-left flex items-center gap-4 mr-8 rounded-r-xl duration-500 ease-in-out text-[#534df5] px-5 py-4 hover:bg-[#635fc71a]"
            onClick={() => {
              setIsBoardModalOpen(true);
            }}>
            <IconSquarePlus/>
            <span className="text-lg font-bold  ">Crear nuevo board</span>
          </button>

          <button
            onClick={() => toggleSidebar()}
            className="text-left flex items-center gap-4 px-5 py-4 text-lg font-bold rounded-r-xl hover:text-[#000428] cursor-pointer mr-8 bg-[#000428] hover:bg-[#635fc71a] my-4 text-white">
            <IconEyeOff />
            <span> Ocultar Sidebar </span>
          </button>
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
