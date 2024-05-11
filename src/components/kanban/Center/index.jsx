import React from "react";
import { useState, useEffect } from "react";
import SideBar from "./../Center";
import Column from "./../Column";
import { useSelector } from "react-redux";
import EmptyBoard from "../../kanban/EmptyBoard";
import AddEditBoardModal from "../../../modals/AddEditBoardModal";

export default function Center() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-gray-200 overflow-x-scroll gap-6 ml-[261px] mt-7"
          : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-gray-200 overflow-x-scroll gap-6 mt-7"
      }
    >
      {windowSize[0] >= 768 && (
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* seccion de columnas */}
      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className=' h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#000428] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg '
          >
            + Nueva Columna
          </div>
        </>
      ) : (
        <>
          <EmptyBoard />
        </>
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type='edit'
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
