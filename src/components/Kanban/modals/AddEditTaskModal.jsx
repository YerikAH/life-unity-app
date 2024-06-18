import { useState, useEffect } from "react";
import { IconX, IconColorPicker } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../../redux/slices/boardsSlice";
import { HexColorPicker } from "react-colorful";

export function AddEditTaskModal({
  type,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns.find((_, index) => index === prevColIndex);
  const task = col ? col.tasks.find((_, index) => index === taskIndex) : [];
  const [color, setColor] = useState(task?.color ||"#aabbcc");
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    setIsValid(true);
    return true;
  };

  useEffect(() => {
    if (type === "edit" ) {
      setSubtasks(
        task.subtasks?.map((subtask) => {
          return { ...subtask, id: uuidv4() };
        })
      );
      setTitle(task.title);
      setDescription(task.description);
    }
    console.log(subtasks)
  },[])

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    const subtasksToCheck = subtasks?.filter(
      (subtask) => subtask.title.trim() !== ""
    );
    if (type === "add") {
      dispatch(
        addTask({
          title,
          description,
          subtasksToCheck,
          date, 
          color,
          status,
        })
      );
    } else {
      dispatch(
        editTask({
          title,
          description,
          subtasksToCheck,
          status,
          date,
          color,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 justify-center items-center flex bg-[#00000080] bg-opacity-35 transition-opacity backdrop-blur-sm"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}>
      {/* Sección del Modal */}

      <div className="flex flex-col gap-3 bg-white text-black dark:text-white font-bold shadow-xl max-w-md w-full mx-5 p-6  md:p-8 rounded-xl z-100">
        <div className="flex items-center justify-between gap-3 relative">
          <h3 className="text-lg">
            {type === "edit" ? "Editar" : "Agregar Nueva"} Tarea
          </h3>
          <div className="flex gap-2 items-center">
            <div
              className="size-6 rounded-full"
              style={{ backgroundColor: color }}></div>
            <button onClick={() => setOpenColorPicker((state) => !state)}>
              <IconColorPicker />
            </button>
          </div>
          {openColorPicker && (
            <div className="absolute right-0 top-10">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
        {/* Nombre de la Tarea */}
        <div className="flex flex-col gap-2">
          <label className="text-sm dark:text-white text-gray-500">
            Nombre de la Tarea
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className="w-full outline-none rounded-md text-sm border-gray-600 ] focus:ring-0 focus:border-gray-600"
            placeholder=" e.g Tomar un descanso para tomar café"
          />
        </div>
        {/* Descripción */}
        <div className="flex flex-col gap-2">
          <label className=" text-sm dark:text-white text-gray-500">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className="outline-none min-h-[75px] rounded-md text-sm border-gray-600 focus:ring-0 focus:border-gray-600"
            placeholder="e.g. Siempre es bueno tomar un descanso de 15 minutos asi recargare un poco las baterías."
          />
        </div>

        {/* Subtareas */}
        <div className="flex flex-col gap-2">
          <label className="  text-sm dark:text-white text-gray-500">
            Subtareas
          </label>
          <div className="flex flex-col gap-2 overflow-y-auto h-[100px]">
            {subtasks?.map((subtask) => (
              <div key={subtask.id} className=" flex items-center gap-2">
                <input
                  onChange={(e) => {
                    onChangeSubtasks(subtask.id, e.target.value);
                  }}
                  type="text"
                  value={subtask.title}
                  className="w-full outline-none rounded-md text-sm border-gray-600 focus:ring-0 focus:border-gray-600"
                  placeholder=" e.g Tomar un descanso para tomar café"
                />
                <IconX
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                  className="cursor-pointer "
                />
              </div>
            ))}
          </div>

          <button
            className=" w-full items-center text-white bg-[#000428] py-2 rounded-full text-sm font-semibold"
            onClick={() => {
              setSubtasks((prevState) => [
                ...prevState,
                { title: "", id: uuidv4() },]);
            }}>
            + Agregar Nueva Subtarea
          </button>
        </div>
        {/* DeadLine  */}
        <div className="flex flex-col gap-2">
          <label className="  text-sm dark:text-white text-gray-500">
            Fecha Limite
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="rounded-md text-sm outline-none  w-full border-gray-600 focus:ring-0 focus:border-gray-600"></input>
        </div>
        {/* Estado Actual  */}
        <div className="flex flex-col gap-2">
          <label className="  text-sm dark:text-white text-gray-500">
            Estado Actual
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className="rounded-md text-sm outline-none w-full border-gray-600 focus:ring-0 focus:border-gray-600">
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
        </div>
        {!isValid && (
          <p className="text-red-500 text-sm">Por favor, completa los campos</p>
        )}
        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
              setIsAddTaskModalOpen(false);
              type === "edit" && setIsTaskModalOpen(false);
            }
          }}
          className=" w-full items-center text-white bg-[#000428] py-2 rounded-full ">
          {type === "edit" ? "Guardar Edición" : "Crear Tarea"}
        </button>
      </div>
    </div>
  );
}
