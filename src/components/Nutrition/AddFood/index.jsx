import { useState } from "react";
import ItemsFood from "./ItemsFood";
import { food } from "../../../data";
import { searchFood } from "../../../utils";
import { useDispatch } from "react-redux";
import { setUserValuesConsumed } from "../../../redux/slices/nutritionSlice";

export function AddFood() {
  const dispatch = useDispatch();
  const [extraInput, setExtraInput] = useState("");
  const [extraInputValue, setExtraInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleSaveOther = async () => {
    if ((extraInput === "" && extraInputValue === "") || (extraInputValue === "0" && extraInput === "")) {
      return;
    }
    const response = await searchFood(extraInput, extraInputValue);
    if (!response) {
      setError(true);
      return;
    }
    setError(false);
    const calculatedValues = {
      carbs: response.totalNutrients.CHOCDF.quantity,
      protein: response.totalNutrients.PROCNT.quantity,
      fat: response.totalNutrients.FAT.quantity,
      cal: response.calories,
    };
    // const newItem = {
    //   name: extraInput,
    //   value: Number(extraInputValue),
    //   ...calculatedValues,
    // };
    dispatch(setUserValuesConsumed(calculatedValues));
    setExtraInput("");
    setExtraInputValue("");
  };

  return (
    <>
      <section className="shadow border rounded-xl py-5 px-5 flex flex-col justify-between font-semibold h-auto bg-white lg:row-span-2 md:max-h-full ">
        <h2 className="text-2xl font-bold text-center">
          What foods are you eating today?
        </h2>
        <div className="md:h-full py-2">
          <section className="mb-4">
            <h3 className="mb-3 text-center">You can find food of all categories</h3>
            <div className="flex flex-col gap-2 px-2 mb-3">
              <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.25)] rounded-2xl px-4 py-2 flex flex-col  gap-2 hover:bg-[#F9A826] focus:bg-[#F9A826]">
                <div className="flex justify-between items-center">
                  <span>Other</span>
                  <button
                    className="bg-[#000428] text-sm text-white rounded-md py-1 px-2 hover:bg-[#000428]/80"
                    onClick={handleSaveOther}>
                    Save Other
                  </button>
                </div>
                <div className="items-center relative flex">
                  <input
                    value={extraInput}
                    type="text"
                    className="p-0 bg-transparent outline-0 focus:ring-0 border-none flex-1 w-full"
                    placeholder="Enter extra food"
                    onChange={(e) => setExtraInput(e.target.value)}
                  />
                  <span>|</span>
                  <input
                    value={extraInputValue}
                    type="number"
                    className="p-0 bg-transparent outline-0 focus:ring-0 border-none flex-1 ms-2"
                    placeholder="Quantity"
                    onChange={(e) => setExtraInputValue(e.target.value)}
                    min={0}
                    max={1000}
                  />
                  <span className="absolute right-5">g</span>
                </div>
              </div>
              {error && (
                <span className="text-center text-red-500 text-sm">
                  No existe el ingrediente buscado
                </span>
              )}
            </div>
            <div className="">
              <ItemsFood food={food} />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
