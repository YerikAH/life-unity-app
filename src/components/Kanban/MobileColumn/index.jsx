import { useSelector } from "react-redux";
import { useState } from "react";
import { Column } from "../../Kanban";
import {IconTargetArrow, IconRotateClockwise2, IconCircleCheck} from "@tabler/icons-react"

export function MobileColumn() {
  const columns  =  useSelector((state) => state.kanban?.columns);
  const idActiveBoard = useSelector((state) => state.kanban.idActiveBoard);
  const [selectedTab, setSelectedTab] = useState(1); // Inicialmente selecciona el primer tab
  const tasks = useSelector((state) => state.kanban?.tasks);
  const tasksBoard = tasks.filter((task) => task.id_board === idActiveBoard);
  return (
    <>
      <nav className="flex gap-10 pt-2 w-[100%] hover:overflow-x-auto border-b border-primary flex-grow-0 items-center justify-start">
        {columns.map((column) => (
          <button
            key={column.id}
            className={`flex items-center gap-5 text-sm flex-none py-2 px-4 rounded-t-md font-semibold ${
              Number(column.id) === selectedTab ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedTab(column.id)}>
              {
                Number(column.id) === 1 ? <IconTargetArrow size={24} /> :
                Number(column.id) === 2 ? <IconRotateClockwise2 size={24} /> :
                <IconCircleCheck size={24} />

              }
            <h3>
              {column.name}
            </h3>
            <span
              className={`p-2 rounded-full size-6 flex justify-center items-center ${
                column.id === selectedTab
                  ? "bg-white text-primary"
                  : "text-white bg-primary"
              }`}>
              {tasksBoard.filter((task) => task.status === column.name).length}
            </span>
          </button>
        ))}
      </nav>
      {columns.map((item) => {
        if (Number(item.id) === selectedTab) {
          return <Column key={item.id} colIndex={item.id} item={item} />;
        }
        return null;
      })}
    </>
  );
}
