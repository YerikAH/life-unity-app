import { useState } from "react";
import { Header } from "../../components/kanban/Header";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/slices/boardsSlice";
import EmptyBoard from "../../components/kanban/EmptyBoard";
import Center from "../../components/kanban/Center";


export function KanbanPersonal() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards) || [];

  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  
  return (
    <div className='overflow-hidden overflow-x-scroll'>
      <>
        {boards.length > 0 ? 
          <>
            {/* El embabezado */}
            <Header className='flex'
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
            {/* Seccion central */}
            <Center className='flex'/>
          </>
         : 
          <>
            <EmptyBoard className='flex'
            type='add' />
          </>
        }
      </>
    </div>
  );
}



