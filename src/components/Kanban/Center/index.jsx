import { useSelector } from "react-redux";
import { Column, MobileColumn } from "../../Kanban";
import { useEffect, useState } from "react";

export function Center() {
  const columns = useSelector((state) => state.kanban?.columns);
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
            {columns.map((item) => (
              <Column key={item.id} colIndex={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
