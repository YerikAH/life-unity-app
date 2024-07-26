
import { useDispatch } from "react-redux";
import { updateSubtask } from "../../../redux/slices/boardsSlice";

export function Subtask({ item }) {
  const dispatch = useDispatch();
  const checked = item.is_completed;

  const onChange = () => {
    dispatch(updateSubtask({ subtaskId: item.id, dataSubtask: { is_completed: !checked } }));
  };

  return (
    <div className='w-full flex hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]'>
      <input
        type='checkbox'
        className='w-4 h-4 accept-[#635fc7] cursor-pointer'
        checked={checked}
        onChange={onChange}
      />
      <p className={checked ? "line-through opacity-30" : ""}>{item.name}</p>
    </div>
  );
}
