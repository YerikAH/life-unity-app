import { useState } from "react";
import { IconMeat } from "@tabler/icons-react";

export default function ItemsFood() {
  const [openItemId, setOpenItemId] = useState(null);

  const handleOpenItem = (id) => {
    // If the id is the same as the openItemId, set it to null, otherwise set it to the id
    setOpenItemId(openItemId => openItemId === id ? null : id);
  };

  const items = [
    { id: 1, name: "Chicken Breast" },
    { id: 2, name: "Salmon" },
    { id: 3, name: "Tofu" },
    { id: 4, name: "Egg" },
    { id: 5, name: "Pork" },
    { id: 6, name: "Beef" },
  ]

  return (
    <>
      {items.map(item => (
        <div 
          key={item.id} 
          className={`${openItemId === item.id ? "bg-[#F9A826]" : "bg-white"} shadow-[0_0_10px_0_rgba(0,0,0,0.25)] rounded-2xl px-4 py-2 flex items-center gap-2 hover:bg-[#F9A826] focus:bg-[#F9A826]`}
        >
          <button
            className="flex gap-2 items-center"
            onClick={() => handleOpenItem(item.id)}
          >
            <div>
              <IconMeat stroke={2} size={20} />
            </div>
            <span>{item.name}</span>
          </button>
          {openItemId === item.id && (
            <div className="items-center relative">
              <input type="number" className="p-0 bg-transparent outline-0 focus:ring-0 border-none" min={0} max={10000}/>
              <span className="absolute right-5">g</span>
            </div>
          )}
        </div>
      ))}
    </>
  );
}