// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../Kanban";
import { dragTask } from "../../../redux/slices/boardsSlice";
import {IconTargetArrow, IconRotateClockwise2, IconCircleCheck, IconLayout} from "@tabler/icons-react"

export function Column({ colIndex }) {

  const dispatch = useDispatch();

  // Obtener el estado de los tableros desde Redux
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((_, i) => i === colIndex);

  // Manejar el evento de soltar tarea en una columna diferente
  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  // Permitir el evento de arrastrar sobre una columna
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="flex flex-col gap-5 my-5 md:my-0 flex-none md:mb-10 md:min-w-[250px]">
      {/* Título de la columna con un punto de color aleatorio */}
      <div className="hidden md:flex items-center justify-center gap-2">
        {
          col.name === "In Progress" ? <IconTargetArrow size={24} /> :
          col.name === "In Review" ? <IconRotateClockwise2 size={24} /> :
          col.name === "Done" ? <IconCircleCheck size={24} /> : <IconLayout size={24} />
        }
        <p className="font-semibold text-[#000428] text-lg">
          {col.name}
        </p>
        <span className="bg-primary text-white size-6 rounded-full flex justify-center items-center">{col.tasks.length}</span>
      </div>
      {/* Lista de tareas en la columna */}
      <div className="flex items-center justify-center gap-5 flex-col">
        {col.tasks.map((_, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
      </div>
    </div>
  );
}
