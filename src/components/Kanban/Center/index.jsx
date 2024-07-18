import { useSelector } from "react-redux";
import { Column, MobileColumn } from "../../Kanban";
import { useEffect, useState } from "react";

export function Center() {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board?.columns || []; // Manejar el caso donde board podría ser indefinido
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="transition-transform duration-300 h-full">
      {width < 768 ? (
        <MobileColumn />
      ) : (
        <>
          <div className="hidden md:grid grid-cols-[repeat(3,minmax(300px,_1fr))] overflow-hidden gap-6 p-10 md:p-5 justify-center md:justify-start hover:overflow-x-visible h-full">
            {columns.map((_, index) => (
              <Column key={index} colIndex={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
