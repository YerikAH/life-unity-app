import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TaskModal } from "../../Kanban";
import { IconCalendarEvent } from "@tabler/icons-react";

export function Task({ colIndex, taskIndex, item }) {
  const tasks = useSelector((state) => state.kanban?.tasks);
  const task = tasks.find((task) => task.id === item.id);
  const subtasks = useSelector((state) => state.kanban?.subtasks).filter((subcard)=>subcard.id_card === task.id);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const dateTime = item?.vencimiento ? new Date(item.vencimiento) : new Date();
  const date = dateTime.toISOString().slice(0, 10); // YYYY-MM-DD
  const time = dateTime.toTimeString().slice(0, 8); // HH:MM:SS
  const [completed, setCompleted] = useState(0);

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  useEffect(() => {
    let completedCount = 0
    subtasks?.forEach((subtask) => {
      if (subtask.is_completed) {
        completedCount++;
      }
    });
    setCompleted(completedCount);
  }, [subtasks]);

  return (
    <>
      <button
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className="flex flex-col text-left gap-1 w-full max-w-sm rounded-xl bg-white p-6 hover:border-primary dark:text-white cursor-pointer my-2 focus:bg-gray-200 hover:bg-gray-200 shadow-2xl border "
        style={{ border: `3px solid ${task?.color}` }}>
        <h4 className="font-semibold text-lg tracking-wide">
          {task?.card_name}
        </h4>
        {task?.card_description && (
          <p className="text-sm text-gray-500 font-semibold">
            {task?.card_description}
          </p>
        )}
        {subtasks?.length > 0 && (
          <p className="text-sm text-gray-500">
            {completed}/{subtasks.length} subtareas
          </p>
        )}
        <div className="my-2 text-sm text-primary font-semibold flex gap-2 items-center border border-gray-300 px-2 py-1 rounded-md">
          <IconCalendarEvent size={16} />
          {task?.vencimiento ? (
            <span>
              {date} {time}
            </span>
          ) : (
            <span>Sin Fecha Limite</span>
          )}
        </div>
      </button>
      {isTaskModalOpen && (
        <TaskModal
          item={task}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </>
  );
}
