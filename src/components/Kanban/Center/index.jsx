import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Column from "../Column";
import { useSelector } from "react-redux";
import EmptyBoard from "../EmptyBoard";
import AddEditBoardModal from "../../../modals/AddEditBoardModal";

export default function Center() {
  // Estado para el tamaño de la ventana
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  // Efecto para manejar el redimensionamiento de la ventana
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []); // Se asegura de que el efecto solo se ejecute una vez al montar

  // Estado para controlar la visibilidad del modal de tablero
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  // Obtener el estado de los tableros desde Redux
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board?.columns || []; // Manejar el caso donde board podría ser indefinido

  // Estado para controlar la visibilidad de la barra lateral
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white dark:bg-white">
      {/* Mostrar la barra lateral solo en pantallas medianas y más grandes */}
      {windowSize[0] >= 768 && (
        <SideBar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      <div
        className={`flex-1 transition-transform duration-300 ${
          isSideBarOpen && windowSize[0] >= 768 ? "ml-[240px]" : "ml-0"
        }`}
      >
        <div className="h-screen flex overflow-x-scroll overflow-y-scroll gap-6 mt-1">
          {/* Mostrar columnas si existen, de lo contrario mostrar un mensaje de tablero vacío */}
          {columns.length > 0 ? (
            <>
              {columns.map((col, index) => (
                <Column key={index} colIndex={index} />
              ))}
              <div
                onClick={() => {
                  setIsBoardModalOpen(true);
                }}
                className="h-[80vh] w-[250px] dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#000428bd] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2 mx-5 min-w-[250px] text-[#828FA3] mt-[105px] rounded-lg shadow-xl shadow-[#2b2c3740]"
              >
                + New Column
              </div>
            </>
          ) : (
            <EmptyBoard />
          )}
          {/* Modal para añadir o editar el tablero */}
          {isBoardModalOpen && (
            <AddEditBoardModal
              type="edit"
              setIsBoardModalOpen={setIsBoardModalOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}
