// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../Kanban";
import { updateTask } from "../../../redux/slices/boardsSlice";
import {IconTargetArrow, IconRotateClockwise2, IconCircleCheck, IconLayout} from "@tabler/icons-react"

export function Column({ colIndex, item }) {

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.kanban?.tasks);
  const idActiveBoard = useSelector((state) => state.kanban?.idActiveBoard);
  const tasksFiltered = tasks.filter((task) => task.id_board === idActiveBoard && task.status === item.name);
  const col = useSelector((state) => state.kanban?.columns).find((col) => col.id === colIndex);

  // Manejar el evento de soltar tarea en una columna diferente
  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(updateTask({ taskId: taskIndex, data: { status: col.name } }));
    }
  };

  // Permitir el evento de arrastrar sobre una columna
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="flex flex-col gap-5 my-5">
      {/* Título de la columna con un punto de color aleatorio */}
      <div className="hidden lg:flex items-center justify-center gap-2">
        {
          item.name === "In Progress" ? <IconTargetArrow size={24} /> :
          item.name === "In Review" ? <IconRotateClockwise2 size={24} /> :
          item.name === "Done" ? <IconCircleCheck size={24} /> : <IconLayout size={24} />
        }
        <p className="font-semibold text-[#000428] text-lg">
          {item.name}
        </p>
        <span className="bg-primary text-white size-6 rounded-full flex justify-center items-center">{tasksFiltered.length}</span>
      </div>
      {/* Lista de tareas en la columna */}
      <div className="flex items-center justify-center gap-5 flex-col">
        {tasksFiltered.map((task) => (
          <Task key={task.id} taskIndex={task.id} colIndex={item.id} item={task} />
        ))}
      </div>
    </div>
  );
}
