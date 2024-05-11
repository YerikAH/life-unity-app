import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../../Hooks/useDarkMode";
import { useState } from "react";
import boardIcon from "../../assets/icon-board.svg";
import darkIcon from "../../assets/icon-dark-theme.svg";
import lightIcon from "../../assets/icon-light-theme.svg";
import { Switch } from "@headlessui/react";

import showSidebarIcon from "../../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../../assets/icon-hide-sidebar.svg";

import boardsSlice from "../../redux/boardsSlice";
import AddEditBoardModal from "../../modals/AddEditBoardModal";


export default function SideBar({ setIsSideBarOpen, isSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? "min-w-[261px] bg-[#000428] dark:bg-[#000428] fixed top-[72px] h-screen z-20 items-center left-0"
            : "bg-[#635fc7] dark:bg-[2b2cc37] dark:hover:bg-[#365fc7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor:pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full"
        }
      >
        <div>
          {/* Rewirte modal */}
          {isSideBarOpen && (
            <div className='bg-[#000428] dark:bg-[#000428] w-full py-4 rounded-xl'>
              <h3 className='dark:text-gray-300 text-[15px] text-white font-bold h-[4vh] mt-2 justify-between text-center'>
                TODOS LOS BOARDS ({boards.length})
              </h3>
              <div className='flex flex-col h-[70vh] justify-between'>
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-blue-500 dark:hover:bg-gray-600 dark:hover:text-white  dark:text-white ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8"
                      }
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                      `}
                    >
                      <img src={boardIcon} className='h-4 ' />
                      <p className='text-lg font-bold text-white'>
                        {board.name}
                      </p>
                    </div>
                  ))}
                  <div
                    className='flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out px-5 py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] text-[#635fc7] dark:hover:bg-gray-600 dark:hover:text-[#635fc7]'
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className='h-4 ' />
                    <p className='text-lg font-bold'>Crear Nuevo Board</p>
                  </div>
                </div>

                <div className=' mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
                  <img src={lightIcon} alt='sol indicador de modo dia' />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt='luna indicador de modo noche' />
                </div>
              </div>
            </div>
          )}

          {/* Alternar ocultar/mostrar la barra lateral */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className=" flex  items-center mt-2  absolute bottom-16  text-lg font-bold  rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
            >
              <img
                className=" min-w-[20px]"
                src={hideSidebarIcon}
                alt=" side bar show/hide"
              />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div className=" absolute p-5  " onClick={() => toggleSidebar()}>
              <img src={showSidebarIcon} alt="showSidebarIcon" />
            </div>
          )}

        </div>
      </div>
      {isBoardModalOpen && (
        <AddEditBoardModal 
        type={"add"}
        setBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
