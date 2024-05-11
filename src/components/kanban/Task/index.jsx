import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../../../modals/TaskModal";

export default function Task({ taskIndex, colIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

  const [isTaskModalOpen, setisTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex})
    )
  }

  return (
    <div>
      <div
        onClick={() => {
          setisTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className='w-[280px] my-5 rounded-lg bg-white dark:bg-[#000428] shadow-black py-6 px-3 shadow-md hover:text-yellow-500 dark:text-white dark:hover:text-yellow-500 cursor-pointer'
      >
        <p className='font-bold tracking-wide'>{task.title}</p>
        <p className='font-bold text-xs tracking-tighter mt-2 text-gray-500'>
          {completed} de {subtasks.length} Tareas completas
        </p>
      </div>
      {isTaskModalOpen && <TaskModal 
      colIndex = {colIndex}
      taskIndex = {taskIndex}
      setisTaskModalOpen = {setisTaskModalOpen}

      />}
    </div>
  );
}
