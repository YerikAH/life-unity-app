import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ElipsisMenu,
  AddEditTaskModal,
  Subtask,
  DeleteModal,
} from "../../Kanban";
import { deleteTask, setTaskStatus } from "../../../redux/slices/boardsSlice";
import { IconDotsVertical } from "@tabler/icons-react";

export function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((_, i) => i === colIndex);
  const task = col.tasks.find((_, i) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks?.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteTask({ taskIndex, colIndex }));
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
      <div className=" bg-white dark:bg-[#2b2c37] text-[#000428] dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md p-8 rounded-xl w-full">
        <div className="relative flex justify-between w-full items-center">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
            <h1 className="text-xl">{task.title}</h1>
            <div className="size-6 rounded-full" style={{backgroundColor:task.color}}></div>
            </div>
            <p className="text-gray-500 tracking-wide text-sm">
              Deadline: {task.date}
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
        {task.description && (
          <p className="text-primary font-medium text-md pt-4">
            {task.description}
          </p>
        )}
        {subtasks?.length>0 && (
          <>
            <p className="text-sm dark:text-white text-gray-500 mt-4">
              Subtareas ({completed} de {subtasks?.length})
            </p>
            <div className="mt-3 space-y-2">
              {subtasks?.map((_, index) => {
                return (
                  <Subtask
                    index={index}
                    taskIndex={taskIndex}
                    colIndex={colIndex}
                    key={index}
                  />
                );
              })}
            </div>{" "}
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
          onDeleteBtnClick={onDeleteBtnClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="task"
          title={task.title}
        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}
