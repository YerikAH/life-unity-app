import { useEffect, useState, useRef } from "react";
import { IconChevronDown, IconFileSpreadsheet } from "@tabler/icons-react";
import { DonutChart } from "./DonutChart";
import { HealthForm } from "../HealthForm";
import { analysis } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setValuesRecommended } from "../../../redux/slices/nutritionSlice";

export function HealthDetails() {
  const dispatch = useDispatch();
  const firstUpdate = useRef(true);
  const [isDrop, setDrop] = useState(false);
  const [isOpenForm, setOpenForm] = useState(false);
  const [formResolved, setFormResolved] = useState(
    localStorage.getItem("userData") ? true : false
  );

  const data = useSelector((state) => state.nutrition.userData);

  const handleSetDrop = () => {
    setDrop(!isDrop);
  };

  const handleOpenForm = () => {
    setOpenForm(!isOpenForm);
  };

  const fetchData = async () => {
    if (formResolved) {
      const result = await analysis(data);
      const calNumber = Number(
        result?.BMI_EER["Estimated Daily Caloric Needs"]
          .replace("kcal/day", "")
          .replace(",", "")
          .trim()
      );
      const carbsNumber =
        result?.macronutrients_table["macronutrients-table"][1][1]
          .replace("grams", "")
          .split("-")
          .map((str) => Number(str.trim()))
          .reduce((a, b) => a + b, 0) / 2;
      const proteinNumber = Number(
        result?.macronutrients_table["macronutrients-table"][3][1]
          .replace("grams", "")
          .trim()
      );
      const fatNumber =
        result?.macronutrients_table["macronutrients-table"][4][1]
          .replace("grams", "")
          .split("-")
          .map((str) => Number(str.trim()))
          .reduce((a, b) => a + b, 0) / 2;
      const regex = /\d+\.\d+|\d+/g;
      const water =
        result?.macronutrients_table["macronutrients-table"][10][1].match(
          regex
        );
      const waterLiter = Number(water[0]);
      const waterCups = Number(water[1]);
      const recommended = {
        cal: calNumber,
        carbs: carbsNumber,
        protein: proteinNumber,
        fat: fatNumber,
        water: {
          liter: waterLiter,
          cups: waterCups,
        },
      };
      return recommended;
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const fetchAndSetValues = async () => {
      const fetchedData = await fetchData();
      console.log(fetchedData);
      dispatch(setValuesRecommended(fetchedData));
    };

    fetchAndSetValues();
  }, [data]);

  return (
    <>
      <section className="shadow-xl rounded-xl py-10 px-5 flex flex-col h-auto bg-white lg:row-span-2 justify-between">
        <div className="flex items-center gap-4 justify-center relative">
          <div className="flex flex-col gap-3 justify-center text-center">
            <h2 className="text-2xl font-bold">Count Calories</h2>
            {!formResolved && (
              <span className="w-[80%] mx-auto text-red-500 font-semibold">
                Complete the form to calcultate the nutrition values
              </span>
            )}
          </div>
          <button onClick={handleSetDrop}>
            <IconChevronDown stroke={2} />
          </button>
          {isDrop && (
            <button
              className="absolute bg-white top-10 right-18 p-5 rounded-2xl shadow-lg font-semibold flex items-center gap-4 cursor-pointer z-10"
              onClick={handleOpenForm}>
              <div className="size-8">
                <IconFileSpreadsheet stroke={2} />
              </div>
              Change your plan
            </button>
          )}
        </div>

        <div className="max-w-sm w-full bg-white rounded-lg dark:bg-gray-800 p-4 mx-auto">
          <DonutChart />
        </div>

        <div className="flex  justify-center gap-10">
          <div className="flex items-center gap-5 flex-col">
            <h3>Heigth</h3>
            <span className="text-[#F9A826] font-bold text-2xl text-center">
              {" "}
              {data.height || "--"} cm{" "}
            </span>
          </div>
          <div className="flex items-center gap-5 flex-col text-center">
            <h3>Weight</h3>
            <span className="text-[#F9A826] font-bold text-2xl">
              {" "}
              {data.weight || "--"} kg{" "}
            </span>
          </div>
        </div>
      </section>

      {isOpenForm && (
        <HealthForm
          handleOpenForm={handleOpenForm}
          handleSetDrop={handleSetDrop}
          setFormResolved={setFormResolved}
        />
      )}
    </>
  );
}
