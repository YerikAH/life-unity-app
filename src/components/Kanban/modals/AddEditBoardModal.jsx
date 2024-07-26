import {
  createBoard,
  updateBoard,
} from "../../../redux/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.kanban?.boards);
  const idActiveBoard = useSelector((state) => state.kanban?.idActiveBoard);
  const board = boards.find((item) => item.id === idActiveBoard);
  const [name, setName] = useState(type==="edit" ? board.board_name : "");
  const [description, setDescription] = useState(
    type==="edit" ? board.board_description : ""
  );
  const [newColumns, ] = useState([
    { name: "In Progress", tasks: [], id: uuidv4() },
    { name: "In Review", tasks: [], id: uuidv4() },
    { name: "Done", tasks: [], id: uuidv4() },
  ]);

  // Función para validar el formulario
  const validate = () => {
    if (!name.trim()) {
      return false;
    }

    if (!description.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    return true;
  };

  // Función para enviar el formulario
  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(
        createBoard({ board_name: name, board_description: description })
      );
    } else {
      dispatch(
        updateBoard({ board_name: name, board_description: description, id: idActiveBoard })
      );
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
      className="fixed inset-0 z-50 justify-center items-center flex bg-[#00000080] bg-opacity-35 transition-opacity backdrop-blur-sm">
      <div className="bg-white dark:bg-[#2b2c37] dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md w-full p-8 rounded-xl mx-5">
        <h3 className="text-lg">
          {type === "edit" ? "Editar" : "Añadir nuevo"} Board
        </h3>
        <div>
          <div className="mt-5 flex flex-col gap-2">
          <label className="text-sm dark:text-white text-gray-500">
            Nombre del Board
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <label className="text-sm dark:text-white text-gray-500">
            Descripcion del Board
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g This Board is for web design projects"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="board-name-input"
          />
        </div>
        {/* Columnas del tablero */}
        <div className="mt-5 flex flex-col gap-2">
          <label className="text-sm dark:text-white text-gray-500">
            Columnas del Board
          </label>
          <div className="h-[150px] overflow-y-auto flex flex-col gap-2">
            {newColumns.map((column, index) => (
              <div key={index} className="flex items-center w-full gap-2">
                <div className="flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:ring-[#000428]">
                  {column.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#000428] mt-8 relative text-white bg-[#000428] py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}>
            {type === "add" ? "Crear nuevo Board" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}
