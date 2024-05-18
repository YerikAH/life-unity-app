import { Header } from "../../components/Kanban/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../../redux/slices/boardsSlice";

import EmptyBoard from "../../components/Kanban/EmptyBoard";
import Center from "../../components/Kanban/Center";

export function KanbanPersonal() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  console.log("Contenido de boards:", boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0) dispatch(setBoardActive({ index: 0 }));

  return (
    <div className='font-M PLUS Rounded 1c overflow-hidden overflow-x-scroll'>
      <>
        {boards.length > 0 ? (
          <>
            {/* El embabezado */}
            <Header
              boardModalOpen={boardModalOpen}
              setIsBoardModalOpen={setBoardModalOpen}
            />
            {/* Seccion central */}
            <Center
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
              
            />
          </>
        ) : (
          <>
            <EmptyBoard type='add' />
          </>
        )}
      </>
    </div>
  );
}
