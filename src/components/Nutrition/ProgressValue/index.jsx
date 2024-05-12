import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function ProgressValue() {
  const [error, setError] = useState({
    carbs: false,
    protein: false,
    fat: false,
  });
  const [carbsData, setCarbsData] = useState({ percentage: 0, color: "gray" });
  const [proteinData, setProteinData] = useState({
    percentage: 0,
    color: "gray",
  });
  const [fatData, setFatData] = useState({ percentage: 0, color: "gray" });

  const {
    carbs = 0,
    protein = 0,
    fat = 0,
  } = useSelector((state) => state.nutrition.valuesRecommended) || {};

  const {
    totalCarbs = 0,
    totalProtein = 0,
    totalFat = 0,
  } = useSelector((state) => state.nutrition.totalValues) || {};

  const calculatePercentageAndColor = (total, recommended, nutrient) => {
    const calculated = (Number(total) / Number(recommended)) * 100;
    const percentage = Math.min(calculated, 100);

    const color =
      percentage >= 100 ? "red" : percentage < 50 ? "#E8AA42" : "#4B83A7";
    const error = Number(total) > Number(recommended);

    setError((prev) => ({ ...prev, [nutrient]: error }));

    return { percentage, color };
  };

  useEffect(() => {
    setCarbsData(calculatePercentageAndColor(totalCarbs, carbs, "carbs"));
    setProteinData(
      calculatePercentageAndColor(totalProtein, protein, "protein")
    );
    setFatData(calculatePercentageAndColor(totalFat, fat, "fat"));
  }, [totalCarbs, totalProtein, totalFat, carbs, protein, fat]);

  return (
    <>
      <section className="shadow border rounded-xl py-5 px-5 flex flex-col justify-center font-semibold h-auto bg-white lg:row-start-3 lg:col-start-2">
        <div>
          {error.carbs && (
            <span className="text-red-500 font-primary text-xs italic">
              You have exceeded the limit
            </span>
          )}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-primary">Carbs</h2>
            <span className="text-gray-500 font-primary text-sm font-normal">
              {totalCarbs.toFixed(2)}g / {carbs}g
            </span>
          </div>
          <div className="w-full bg-gray rounded-full h-2.5 mb-4 ">
            <div
              className={`bg-gradient-to-r from-[#E8AA42] h-2.5 rounded-full`}
              style={{
                width: `${carbsData.percentage}%`,
                backgroundColor: carbsData.color,
              }}
            ></div>
          </div>
        </div>
        <div>
          {error.protein && (
            <span className="text-red-500 font-primary text-xs italic">
              You have exceeded the limit
            </span>
          )}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-primary">Protein</h2>
            <span className="font-primary font-normal text-gray-500 text-sm">
              {totalProtein.toFixed(2)}g / {protein}g
            </span>
          </div>

          <div className="w-full bg-gray rounded-full h-2.5 mb-4 ">
            <div
              className={`bg-gradient-to-r from-[#4B83A7] h-2.5 rounded-full`}
              style={{
                width: `${proteinData.percentage}%`,
                backgroundColor: proteinData.color,
              }}
            ></div>
          </div>
        </div>
        <div>
          {error.fat && (
            <span className="text-red-500 text-sm italic font-primary">
              You have exceeded the limit
            </span>
          )}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-primary">Fat</h2>
            <span className="font-primary font-normal text-sm text-gray-500">
              {totalFat.toFixed(2)}g / {fat}g
            </span>
          </div>
          <div className="w-full bg-gray rounded-full h-2.5">
            <div
              className={`bg-gradient-to-r from-[#4E47C6] h-2.5 rounded-full`}
              style={{
                width: `${fatData.percentage}%`,
                backgroundColor: fatData.color,
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}
