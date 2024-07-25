// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../Kanban";
import { dragTask } from "../../../redux/slices/boardsSlice";
import {IconTargetArrow, IconRotateClockwise2, IconCircleCheck, IconLayout} from "@tabler/icons-react"

export function Column({ colIndex, item }) {

  const dispatch = useDispatch();

  // Obtener el estado de los tableros desde Redux
  const boards = useSelector((state) => state.kanban.boards);
  const col= useSelector((state) => state.kanban.columns);

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
          item.name === "In Progress" ? <IconTargetArrow size={24} /> :
          item.name === "In Review" ? <IconRotateClockwise2 size={24} /> :
          item.name === "Done" ? <IconCircleCheck size={24} /> : <IconLayout size={24} />
        }
        <p className="font-semibold text-[#000428] text-lg">
          {item.name}
        </p>
        <span className="bg-primary text-white size-6 rounded-full flex justify-center items-center">{0||col.tasks?.length}</span>
      </div>
      {/* Lista de tareas en la columna */}
      <div className="flex items-center justify-center gap-5 flex-col">
        {/* FALTA Renderizar los tasks con un dispatch segun el name del item */}
        {/* {col.tasks.map((_, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))} */}
      </div>
    </div>
  );
}
