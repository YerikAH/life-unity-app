import { addBoard, editBoard } from "../../../redux/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";

export function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "In Progress", tasks: [], id: uuidv4() },
    { name: "In Review", tasks: [], id: uuidv4() },
    { name: "Done", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  useEffect(() => {
    // Si estamos editando, establecemos el nombre y las columnas del tablero existente
    if (type === "edit" && board) {
      setNewColumns(
        board.columns.map((col) => {
          return { ...col, id: uuidv4() };
        })
      );
      setName(board.name);
    }
  }, [type, board]);

  // Función para cambiar el nombre de la columna
  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  // Función para eliminar una columna
  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  // Función para validar el formulario
  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  // Función para enviar el formulario
  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(addBoard({ name, newColumns, id: uuidv4() }));
    } else {
      dispatch(editBoard({ name, newColumns }));
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
        {/* Nombre del tablero */}
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

        {/* Columnas del tablero */}
        <div className="mt-5 flex flex-col gap-2">
          <label className="text-sm dark:text-white text-gray-500">
            Columnas del Board
          </label>

          <div className="h-[150px] overflow-y-auto flex flex-col gap-2">
            {newColumns.map((column, index) => (
              <div key={index} className="flex items-center w-full gap-2">
                <input
                  className="flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:ring-[#000428]"
                  onChange={(e) => {
                    onChange(column.id, e.target.value);
                  }}
                  value={column.name}
                  type="text"
                />
                {type != "add" && (
                  <IconX
                    className="cursor-pointer"
                    onClick={() => {
                      onDelete(column.id);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          {type != "add" && (
            <button
              className="w-full items-center hover:opacity-75 dark:text-[#000428] dark:bg-white text-white bg-[#000428] my-2 py-2 rounded-full"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}>
              + Añadir nueva columna
            </button>
          )}
          {!isValid && (
            <p className="text-red-500 text-sm mt-2">
              Por favor, completa el nombre de todas las columnas
            </p>
          )}
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
