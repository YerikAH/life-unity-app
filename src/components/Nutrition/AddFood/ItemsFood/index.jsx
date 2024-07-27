import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUserValuesConsumed } from "../../../../redux/slices/nutritionSlice";

export default function ItemsFood({ food }) {
  const valuesRecommended = useSelector(
    (state) => state.nutrition?.valuesRecommended
  );
  const dispatch = useDispatch();
  const [openItems, setOpenItems] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleSave = () => {
    if (
      !valuesRecommended?.carbs ||
      !valuesRecommended?.protein ||
      !valuesRecommended?.fat ||
      !valuesRecommended?.cal
    ) {
      setOpenItems([]);
      setInputValues({});
      return;
    }

    for (const id in inputValues) {
      const idNumber = Number(id);

      const itemFood = food.find((item) => item.id === idNumber);
      const inputValue = Number(inputValues[id]);
      const { carbs, protein, fat, cal } = itemFood;

      const calculatedValues = {
        carbs: (carbs * inputValue) / 100,
        protein: (protein * inputValue) / 100,
        fat: (fat * inputValue) / 100,
        cal: (cal * inputValue) / 100,
      };
      dispatch(setUserValuesConsumed(calculatedValues));
    }

    setOpenItems([]);
    setInputValues({});
  };

  const handleOpenItem = (id) => {
    const isOpen = openItems.includes(id);
    const inputValue = inputValues[id];
    if (isOpen) {
      if (!inputValue) {
        setOpenItems(openItems.filter((item) => item !== id));
      }
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const handleInputValue = (id, e) => {
    setInputValues({ ...inputValues, [id]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 p-2 my-3 overflow-y-auto h-[300px]">
        {food &&
          food.map((item) => (
            <div
              key={item.id}
              className={`${
                openItems.includes(item.id) ? "bg-[#F9A826]" : "bg-white"
              } shadow-[0_0_10px_0_rgba(0,0,0,0.25)] rounded-2xl px-4 py-2 flex items-center gap-2 hover:bg-[#F9A826] focus:bg-[#F9A826]`}>
              <button
                className="flex gap-2 items-center"
                onClick={() => handleOpenItem(item.id)}>
                <span>{item.name}</span>
              </button>
              {openItems.includes(item.id) && (
                <div className="items-center relative">
                  <input
                    value={inputValues[item.id] || ""}
                    type="number"
                    className="p-0 bg-transparent outline-0 focus:ring-0 border-none"
                    min={0}
                    max={1000}
                    onChange={(e) => handleInputValue(item.id, e)}
                  />
                  <span className="absolute right-5">g</span>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="text-end flex items-center justify-center">
        <button
          className="bg-[#000428] text-white flex-1 rounded-md py-2 px-4 hover:bg-[#000428]/80"
          onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
}
