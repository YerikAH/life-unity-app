import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ElipsisMenu,
  AddEditTaskModal,
  Subtask,
  DeleteModal,
} from "../../Kanban";
import { deleteTasks, updateTask } from "../../../redux/slices/boardsSlice";
import { IconDotsVertical } from "@tabler/icons-react";

export function TaskModal({ setIsTaskModalOpen, item }) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [completed, setCompleted] = useState(0);
  const columns = useSelector((state) => state.kanban?.columns);
  const subtasks = useSelector((state) => state.kanban?.subtasks).filter(
    (subtask) => subtask.id_card === item.id
  );

  const dateTime = item?.vencimiento ? new Date(item.vencimiento) : "";
  const date = dateTime ? dateTime?.toISOString().slice(0, 10) : ""; // YYYY-MM-DD
  const time = dateTime ? dateTime?.toTimeString().slice(0, 8) : ""; // HH:MM:SS

  useEffect(() => {
    let completedCount = 0;
    subtasks?.forEach((subtask) => {
      if (subtask.is_completed) {
        completedCount++;
      }
    });
    setCompleted(completedCount);
  }, [subtasks]);

  const [status, setStatus] = useState(item.status || columns.name[0]);
  // const [newColIndex, setNewColIndex] = useState(columns.indexOf(columns));
  const onChange = (e) => {
    setStatus(e.target.value);
    // setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    const data = {
      status,
    };
    dispatch(updateTask({ taskId: item.id, data }));
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (id) => {
    dispatch(deleteTasks({ taskId: id }));
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 justify-center items-center flex bg-[#00000080] bg-opacity-35 transition-opacity backdrop-blur-sm">
      {/* SECCIÓN DEL MODAL */}
      <div className=" bg-white dark:bg-[#2b2c37] text-[#000428] dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md p-6  md:p-8 rounded-xl w-full mx-4">
        <div className="relative flex justify-between w-full items-center">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-xl">{item.card_name}</h1>
              <div
                className="size-6 rounded-full"
                style={{ backgroundColor: item.color }}></div>
            </div>
            <p className="text-gray-500 tracking-wide text-sm">
              Deadline: {dateTime ? `${date} ${time}` : "Sin Fecha Limite"}
            </p>
          </div>
          <IconDotsVertical
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        {item.card_description && (
          <p className="text-primary font-medium text-md pt-4">
            {item.card_description}
          </p>
        )}
        {subtasks?.length > 0 && (
          <>
            <p className="text-sm dark:text-white text-gray-500 mt-4 mb-2">
              Subtareas ({completed} de {subtasks?.length})
            </p>

            <div className="flex flex-col gap-2 overflow-y-auto h-[200px] z-1 relative">
              <div className="mt-3 space-y-2">
                {subtasks?.map((item) => {
                  return <Subtask item={item} key={item.id} />;
                })}
              </div>{" "}
            </div>
          </>
        )}
        {/* Sección de Estado Actual */}
        <div className="mt-4 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Estado Actual
          </label>
          <select
            className="rounded-md text-sm outline-none w-full border-gray-600 focus:ring-0 focus:border-gray-600"
            value={status}
            onChange={onChange}>
            {columns.map((col, index) => (
              <option key={index} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          id={item.id}
          onDeleteBtnClick={onDeleteBtnClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="task"
          title={item.card_name}
        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          item={item}
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
        />
      )}
    </div>
  );
}
