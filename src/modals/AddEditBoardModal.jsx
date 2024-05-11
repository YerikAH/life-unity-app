import React, { useState } from "react";
import crossIcon from "../assets/images-kanban/icon-cross.svg";
import boardsSlice from "../redux/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIstValid] = useState(true);
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);
  const board = useSelector((state) => state.boards && state.boards.find((board) => board.isActive));


  if (type === "edit" && isFirstLoad && board) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setNewColumns((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((perState) => perState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIstValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }

      setIstValid(true);
      return true;
    }
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-hidden  z-50 justify-center items-center flex bg-[#00000080] '
    >
      {/* Modal Section */}
      <div className='overflow-hidden max-h-[95vh] bg-white dark:bg-[#2b2c37] dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <h3 className='text-lg'>
          {type === "edit" ? "Editar" : "Añadir nuevo"} Board
        </h3>
        {/* Task Name */}
        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Nombre del Board
          </label>
          <input
            className='bg-transparent px-4 py-2 rounded-md text-sm border dorder-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0'
            placeholder='e.g Web Design'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id='board-name-input'
          />
        </div>

        {/* Board Columns */}

        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Columnas del Board
          </label>

          {newColumns.map((column, index) => (
            <div key={index} className='flex items-center w-full'>
              <input
                className='bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#000428]'
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type='text'
              />
              <img
                src={crossIcon}
                className='m-4 cursor-pointer'
                alt=''
                onClick={() => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <button
            className='w-full items-center hover:opacity-75 dark:text-[#000428] dark:bg-white text-white bg-[#000428] my-2 py-2 rounded-full'
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            + Añadir nueva columna
          </button>
          <button
            className='w-full items-center hover:opacity-75 dark:text-white dark:bg-[#000428] mt-8 relative text-white bg-[#000428] py-2 rounded-full'
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
          >
            Crear nuevo Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
