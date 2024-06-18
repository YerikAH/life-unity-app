import { Header, Center, EmptyBoard } from "../../components/Kanban";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../../redux/slices/boardsSlice";
import { useTitle } from "../../hooks";

export function KanbanPersonal() {
  useTitle("Kanban - LifeUnity");
  const dispatch = useDispatch();
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [seeBoards, setSeeBoards] = useState(false);
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0) dispatch(setBoardActive({ index: 0 }));

  return (
    <div className="w-full h-full overflow-auto">
      {boards.length > 0 ? (
        <>
          {/* El embabezado */}
            <Header
              seeBoards={seeBoards}
              setSeeBoards={setSeeBoards}
              boardModalOpen={boardModalOpen}
              setIsBoardModalOpen={setBoardModalOpen}
            />
          {/* Seccion central */}
          <div className="overflow-auto md:h-[85vh]">
            <Center
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
          </div>
        </>
      ) : (
        <>
          <EmptyBoard type="add" />
        </>
      )}
    </div>
  );
}
