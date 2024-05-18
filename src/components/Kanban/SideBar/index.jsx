import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../../../assets/images-kanban/icon-board.svg";
import useDarkMode from "../../../hooks/useDarkMode";
import darkIcon from "../../../assets/images-kanban/icon-dark-theme.svg";
import lightIcon from "../../../assets/images-kanban/icon-light-theme.svg";

import showSidebarIcon from "../../../assets/images-kanban/icon-show-sidebar.svg";
import hideSidebarIcon from "../../../assets/images-kanban/icon-hide-sidebar.svg";

import { setBoardActive } from "../../../redux/slices/boardsSlice";
import AddEditBoardModal from "../../../modals/AddEditBoardModal";

export default function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
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
            ? `min-w-[100px] bg-[#E9EFFA] dark:bg-[#000428] fixed top-[130px] h-[80vh] items-center  z-10 shadow-xl shadow-[#2b2c3740] rounded-lg`
            : ` bg-[#000428] dark:bg-[#000428] dark:hover:bg-[#000428e1] top-auto bottom-[780px] justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed  w-[56px] h-[48px] rounded-xl `
        }
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className="white  dark:bg-[#000428] dark:text-white text-center w-full py-4 rounded-xl">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                Todos los Tableros ({boards?.length})
              </h3>

              <div className="  dropdown-borad flex flex-col h-[70vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-xl duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#000428bd] hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white  ${
                        board.isActive &&
                        " bg-[#000428] rounded-r-xl text-white mr-8 "
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="  filter-white  h-4 " />{" "}
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" flex  items-baseline space-x-2  mr-8 rounded-r-xl duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-white hover:text-[#635fc7] dark:hover:bg-white  "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className="   filter-white  h-4 " />
                    <p className=" text-lg font-bold  ">Create New Board </p>
                  </div>
                </div>

                <div className=" mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-slate-400" : "bg-slate-400"
                    } relative inline-flex h-6 w-11 items-center rounded-xl`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-xl bg-[#000428] transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div>
              </div>
            </div>
          )}

          {/* Sidebar hide/show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className=" flex  items-center mt-2  absolute bottom-16  text-lg font-bold  rounded-r-xl hover:text-[#000428] cursor-pointer mr-6 mb-20 px-8 py-4 bg-[#000428] hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-white"
            >
              <img
                className=" min-w-[20px]"
                src={hideSidebarIcon}
                alt=" side bar show/hide"
              />
              {isSideBarOpen && <p> Ocultar Sidebar </p>}
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
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}