import { useSelector } from "react-redux";
import { useState } from "react";

import boardIcon from "../../../assets/images-kanban/icon-board.svg";
import darkIcon from "../../../assets/images-kanban/icon-dark-theme.svg";
import lightIcon from "../../../assets/images-kanban/icon-light-theme.svg";

import { Switch } from "@headlessui/react";
import useDarkMode from "../../../hooks/useDarkMode";

import { useDispatch } from "react-redux";

import { setBoardActive } from "../.././../redux/slices/boardsSlice";

export default function HeaderDropdown({ setIsOpenDropdown, setBoardModalOpen}) {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);
  console.log("boards =", boards);

  return (
    <div
      className='py-36 px-6 fixed left-0 right-0 bottom-[-100vh] top-[0px] md:left-0 md:top-[0px] bg-[#00000080] '
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsOpenDropdown(false);
      }}
    >
      {/* Dropdown Modal */}
      <div className='bg-white dark:bg-[#000428] shadow-md shadow-[#364e7e1a]  py-4 rounded-xl max-w-[500px] mx-auto'>
        <h3 className='flex justify-center dark:text-white text-gray-600   mx-4 mb-8'>
          Todos los Tableros ({boards?.length})
        </h3>
        <div className='dark:text-white'>
          {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive &&
                " dark:bg-white bg-[#000428] rounded-r-2xl dark:text-[#000428] text-white mr-4 "
              } `}
              key={index}
              onClick={() => {
                dispatch(setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className='  filter-white  h-4 ' />{" "}
              <p className=' text-lg '>{board.name}</p>
            </div>
          ))}

          <div
            className=' cursor-pointer flex items-baseline space-x-2  text-blue-500 px-5 py-4  '
            onClick={() => {
              setBoardModalOpen(true);
              setIsOpenDropdown(false);
            }}
          >
            <img src={boardIcon} className='   filter-white  h-4 ' />
            <p className=' text-lg '>Crear nuevos tableros</p>
          </div>

          <div className='mx-2 p-4 space-x-2 bg-slate-300 dark:bg-[#232752] flex justify-center items-center rounded-2xl'>
            <img src={lightIcon} alt='' />

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-white" : "bg-white"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className='sr-only'>Enable notifications</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-[#000428] transition`}
              />
            </Switch>

            <img src={darkIcon} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}

