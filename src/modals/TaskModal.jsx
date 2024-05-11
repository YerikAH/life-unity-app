import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElipsisMenu from "../components/kanban/ElipsisMenu";
import elipsis from "../assets/images-kanban/icon-vertical-ellipsis.svg";

import { setTaskStatus, deleteTask } from "../redux/slices/boardsSlice";
import DeleteModal from "./DeleteModal";
import Subtask from "../components/kanban/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";

export default function TaskModal({ colIndex, taskIndex, setisTaskModalOpen }) {
  const dispatch = useDispatch();
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(deleteTask({ colIndex, taskIndex }));
      setisTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      setTaskStatus({
        colIndex,
        taskIndex,
        status,
        newColIndex,
      })
    );
    setisTaskModalOpen(false);
  };

  return (
    <div
      onClick={onClose}
      className=' fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown bg-[#00000080]'
    >
      {/* seccion del modal */}

      <div className=' scrollbar-none overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-lg shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl'>
        <div className='relative flex justify-between w-full items-center '>
          <h1 className='text-lg'>{task.title}</h1>
          <img
            onClick={() => {
              setElipsisMenuOpen((prevState) => !prevState);
            }}
            className='cursor-pointer h-6'
            alt='elipsis'
            src={elipsis}
          />
          {elipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type='Task'
            />
          )}
        </div>
        <p className='text-gray-500 font-[600] tracking-wide text-xs pt-6'>
          {task.description}
        </p>
        <p className=' pt-6 text-gray-500 tracking-widest text-sm'>
          Subtareas ({completed} de {subtasks.length})
        </p>
        {/* Seccion de subtareas */}
        <div className='mt-3 space-y-2'>
          {subtasks.map((subtask, i) => {
            return (
              <Subtask
                index={i}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={i}
              />
            );
          })}
        </div>
        {/* seccion de estado actual */}
        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Estado actual
          </label>
          <select
            className='select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635FC7] outline-none'
            value={status}
            onChange={onChange}
          >
            {columns.map((column, index) => {
              <option className='status-option' key={index}>
                {column.name}
              </option>;
            })}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          title={task.title}
          type='task'
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          type={"edit"}
          taskIndex={taskIndex}
          pervColIndex={colIndex}
          setIsTaskModalOpen={setisTaskModalOpen}
        />
      )}
    </div>
  );
}
