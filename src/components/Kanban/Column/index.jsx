import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffle } from "lodash";
import Task from "../Task";
import { dragTask } from "../../../redux/slices/boardsSlice";

export default function Column({ colIndex }) {
  // Array de colores para los puntos junto a los nombres de las columnas
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-amber-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  // Estado para guardar el color seleccionado aleatoriamente
  const [color, setColor] = useState(null);

  // Obtener el estado de los tableros desde Redux
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  // Efecto para establecer un color aleatorio al montar el componente
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

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
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="pl-16 pt-[100px] flex flex-col min-w-[80px]"
    >
      {/* Título de la columna con un punto de color aleatorio */}
      <div className="flex items-center justify-center gap-2">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        <p className="font-medium tracking-widest text-[#000428] text-lg">
          {col.name} ({col.tasks.length})
        </p>
      </div>
      {/* Lista de tareas en la columna */}
      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}
