import { useSelector } from "react-redux";
import { useState } from "react";
import { Column } from "../../Kanban";
import {IconTargetArrow, IconRotateClockwise2, IconCircleCheck} from "@tabler/icons-react"

export function MobileColumn() {
  const boards = useSelector((state) => state.kanban?.boards);
  let columns  =  useSelector((state) => state.kanban?.columns);
  const [selectedTab, setSelectedTab] = useState(0); // Inicialmente selecciona el primer tab

  return (
    <>
      <nav className="flex gap-10 pt-2 w-full overflow-hidden hover:overflow-x-auto border-b border-primary">
        {columns.map((column, index) => (
          <button
            key={index}
            className={`flex items-center gap-5 text-sm flex-none py-2 px-4 rounded-t-md font-semibold ${
              Number(index) === selectedTab ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedTab(index)}>
              {
                Number(index) === 0 ? <IconTargetArrow size={24} /> :
                Number(index) === 1 ? <IconRotateClockwise2 size={24} /> :
                <IconCircleCheck size={24} />

              }
            <h3>
              {column.name}
            </h3>
            <span
              className={`p-2 rounded-full size-6 flex justify-center items-center ${
                index === selectedTab
                  ? "bg-white text-primary"
                  : "text-white bg-primary"
              }`}>
              {column.tasks.length}
            </span>
          </button>
        ))}
      </nav>
      {columns.map((_, index) => {
        if (Number(index) === selectedTab) {
          return <Column key={index} colIndex={index} />;
        }
        return null;
      })}
    </>
  );
}
