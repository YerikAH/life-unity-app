import { useEffect, useState } from "react";
import { IconX, IconColorPicker } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubtask,
  createTask,
  deleteSubtasks,
  fetchSubtasks,
  fetchTasks,
  updateSubtask,
  updateTask,
} from "../../../redux/slices/boardsSlice";
import { HexColorPicker } from "react-colorful";

const convertToLocalDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const offset = dateTime.getTimezoneOffset();
  const localDateTime = new Date(dateTime.getTime() - offset * 60 * 1000);
  return localDateTime.toISOString().slice(0, 16);
};

const isUUIDv4 = (id) => {
  const uuidv4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Pattern.test(id);
};

export function AddEditTaskModal({
  type,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  item,
}) {
  const dispatch = useDispatch();
  const idActiveBoard = useSelector((state) => state.kanban.idActiveBoard);
  const columns = useSelector((state) => state.kanban.columns);
  const subtasksFiltered = useSelector((state) => state.kanban.subtasks).filter(
    (subcard) => subcard.id_card === item?.id
  );
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState(type === "edit" ? item?.card_name : "");
  const [description, setDescription] = useState(
    type === "edit" && item?.card_description ? item?.card_description : ""
  );

  const initialDateTime = item?.vencimiento
    ? convertToLocalDateTime(item.vencimiento)
    : "";

  const [date, setDate] = useState(initialDateTime);
  const [color, setColor] = useState(item?.color || "#aabbcc");
  const [status, setStatus] = useState(
    type === "edit" ? item?.status : columns[0].name
  );
  const [subtasks, setSubtasks] = useState([]);
  useEffect(() => {
    if (subtasksFiltered && subtasksFiltered.length > 0) {
      setSubtasks(subtasksFiltered);
    }
    dispatch(fetchSubtasks());
  }, []);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtaskIndex = newState.findIndex((subtask) => subtask.id === id);
      if (subtaskIndex !== -1) {
        newState[subtaskIndex] = { ...newState[subtaskIndex], name: newValue };
      }
      return newState;
    });
  };
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    const hasEmptyTitle = subtasks?.some((subtask) => !subtask.name.trim());

    if (hasEmptyTitle) {
      return false;
    }

    setIsValid(true);
    return true;
  };

  const onDelete = (id) => {
    if (!isUUIDv4(id)) {
      dispatch(deleteSubtasks({ subtaskId: id }));
    }

    setSubtasks((prevState) =>
      prevState.filter((subtask) => subtask.id !== id)
    );
  };

  const onSubmit = async (type) => {
    let taskId;
    const data = {
      card_name: title,
      card_description: description,
      color,
      status,
    };
    if (date) {
      data.vencimiento = date;
    }

    if (type === "add") {
      data.id_board = idActiveBoard;
      const result = await dispatch(createTask({ data }));
      taskId = result.payload.id;
      if (!taskId) return;
      dispatch(fetchTasks());
    } else {
      taskId = item.id;
      dispatch(updateTask({ taskId: item.id, data }));
    }

    subtasks?.forEach((subtask) => {
      const dataSubtask = {
        name: subtask.name,
        id_card: taskId,
      };
      if (!isUUIDv4(subtask.id)) {
        dataSubtask.id = subtask.id;
        dispatch(updateSubtask({ subtaskId: subtask.id, dataSubtask }));
      } else {
        dispatch(createSubtask({ dataSubtask }));
      }
    });
    dispatch(fetchSubtasks());
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
                  value={subtask.name}
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
                { name: "", id: uuidv4() },
              ]);
              console.log({ name: "", id: uuidv4() });
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
            type="datetime-local"
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
