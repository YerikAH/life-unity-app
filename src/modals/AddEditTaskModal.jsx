import React, { useState } from "react";
import crossIcon from "../assets/images-kanban/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/slices/boardsSlice";

export default function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setOpenAddEditTask,
  taskIndex,
  pervColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIstValid] = useState(true);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const [isFirstLoad, setisFirstLoad] = useState(true);
  const columns = board.columns;
  const col = columns.find((col, index) => index === pervColIndex);

  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];

  const [status, setStatus] = useState(columns[pervColIndex].name);
  const [newColIndex, setNewColIndex] = useState(pervColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setisFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setSubtasks((pervState) => {
      const newState = [...pervState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onDelete = (id) => {
    setSubtasks((perState) => perState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIstValid(false);
    if (!title.trim()) {
      return false;
    }

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }

      setIstValid(true);
      return true;
    }
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          pervColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-hidden  left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0  top-0 bg-[#00000080]"
      }
    >
      {/* Modal section */}
      <div className='scrollbar-none overflow-y-scroll  my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white fond-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <h3 className='text-lg'>
          {type === "edit" ? "Editar" : "Añadir nueva"} Tarea
        </h3>

        {/* Task Name */}
        <div className='mt-8 flex flex-col space-y-1'>
          <label className='text-sm dark:text-white text-gray-500'>
            Nombre de tarea
          </label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='bg-transparent px-4 py-2 outline-none focus-border-0 rounded-md border border-gray-600 focus:outline-[#000428] ring-0 text-justify'
            type='text'
            placeholder='p. ej. Tomar un descanzo para tomar café '
          />
        </div>

        {/* description */}
        <div className='mt-8 flex flex-col space-y-1'>
          <label className='text-sm dark:text-white text-gray-500'>
            Descripcion
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='bg-transparent px-4 py-2 outline-none focus-border-0 min-h-[200px] rounded-md text-sm border border-gray-600 focus:outline-[#000428] ring-0'
            placeholder='p. ej. Siempre es bueno tomarse un  descanso. 
            Este descanso de 15 minutos recargará un poco las pilas'
          />
        </div>
        {/* Seccion de subtareas */}
        <div className='mt-8 flex flex-col space-y-1'>
          <label className='text-sm dark:text-white text-gray-500'>
            Subtareas
          </label>
          {subtasks.map((subtask, index) => (
            <div key={index} className='flex items-center w-full'>
              <input
                onChange={(e) => {
                  onChange(subtask.id, e.target.value);
                }}
                type='text'
                value={subtask.title}
                className='bg-transparent outline-none focus:border-0 border flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#000428]'
                placeholder='p. ej. Tomar un descazo para un cafe'
              />
              <img
                onClick={() => {
                  onDelete(subtask.id);
                }}
                src={crossIcon}
                className='m-4 cursor-pointer'
              />
            </div>
          ))}
          <button
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            className='w-full items-center dark:text-[#000428] dark:bg-white text-white bg-[#000428] py-2 rounded-full'
          >
            + Agregar nueva subtarea
          </button>
        </div>

        {/* sección de estado actual */}

        <div className='mt-8 flex flex-col space-y-3 '>
          <label className='text-sm dark:text-white text-gray-500'>
            Estado Actual
          </label>
          <select
            value={status}
            onChange={(e) => onChangeStatus(e)}
            className='select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#000428] outline-none'
          >
            {columns.map((column, index) => (
              <option
                className='dark:bg-[#20212c] outline-none'
                value={column.name}
                key={index}
              >
                {column.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className='w-full text-white bg-[#000428] py-2 rounded-full'
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
