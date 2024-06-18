import { useState } from "react";
import { useSelector } from "react-redux";
import { TaskModal } from "../../Kanban";
import { IconCalendarEvent } from "@tabler/icons-react";

export function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((_, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task?.subtasks;
  subtasks?.forEach((subtask) => {
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
    <>
      <button
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className="flex flex-col text-left gap-1 w-full max-w-sm rounded-xl bg-white p-6 hover:border-primary dark:text-white cursor-pointer my-2 focus:bg-gray-200 hover:bg-gray-200 shadow-2xl border " style={{border: `3px solid ${task?.color}`}}>
        <h4 className="font-semibold text-lg tracking-wide">{task?.title}</h4>
        {
          task?.description &&
          <p className="text-sm text-gray-500 font-semibold">{task?.description}</p>
        }
        {subtasks?.length>0 && (
          <p className="text-sm text-gray-500">
            {completed}/{subtasks.length} subtareas
          </p>
        )}
        <div className="my-2 text-sm text-primary font-semibold flex gap-2 items-center border border-gray-300 px-2 py-1 rounded-md">
          <IconCalendarEvent size={16} />
          {task?.date ? (
            <span>{task?.date}</span>
          ) : (
            <span>Sin Fecha Limite</span>
          )}
        </div>
      </button>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </>
  );
}
