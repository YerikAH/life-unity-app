import { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../../../modals/TaskModal";

export default function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className="w-[250px] first:my-5 rounded-xl bg-white dark:bg-[#000428] shadow-xl py-6 px-3 hover:bg-amber-500 dark:text-white dark:hover:text-[#000428] dark:hover:bg-[#F9A826] cursor-pointer"
      >
        <p className="font-medium tracking-wide">{task.title}</p>
        <p className="font-normal text-xs tracking-tighter mt-2 text-gray-500">
          {completed} de {subtasks.length} tareas completadas
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}