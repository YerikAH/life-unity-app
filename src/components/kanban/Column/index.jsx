import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffle } from "lodash";
import { dragTask } from "../../../redux/slices/boardsSlice";

import Task from "../Task";

export default function Column({ colIndex }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];
  const [color, setColor] = useState(null);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className='scrollbar-hide mx-5 pt-[90px] min-w-[280px]'
    >
      <p className='fond-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#black] font-semibold text-[20px]'>
        <div className={`rounded-full  w-4 h-4 ${color}`} />
        {col.name}({col?.tasks?.length})
      </p>

      {col.tasks?.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}
