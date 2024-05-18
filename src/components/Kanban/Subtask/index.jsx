import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSubtaskCompleted } from "../../../redux/slices/boardsSlice";

export default function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => colIndex === i);
  const task = col.tasks.find((task, i) => taskIndex === i);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.isCompleted;

  const onChange = () => {
    dispatch(
      setSubtaskCompleted({
        index,
        taskIndex,
        colIndex,
      })
    );
  };

  return (
    <div className='w-full flex hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]'>
      <input
        type='checkbox'
        className='w-4 h-4 accept-[#635fc7] cursor-pointer'
        checked={checked}
        onChange={onChange}
      />
      <p className={checked ? "line-through opacity-30" : ""}>{subtask.title}</p>
    </div>
  );
}
