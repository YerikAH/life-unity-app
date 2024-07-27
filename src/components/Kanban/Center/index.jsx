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
      {width <= 1020 ? (
        <MobileColumn />
      ) : (
        <nav className="hidden lg:grid lg:grid-cols-[repeat(3,minmax(200px,_1fr))] overflow-hidden gap-6 justify-center hover:overflow-x-auto h-full w-full">
          {columns.map((item) => (
            <Column key={item.id} colIndex={item.id} item={item} />
          ))}
        </nav>
      )}
    </div>
  );
}
