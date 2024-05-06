import * as React from "react";
import { useEffect } from "react";
import {
  IconUsersGroup,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseWater,
  decreaseWater,
} from "../../../redux/slices/nutritionSlice";
import s from "./index.module.css";

export function WaterProgress() {
  const dispatch = useDispatch();
  const [congrats, setCongrats] = React.useState(false);
  const [percentageAnimation, setPercentageAnimation] = React.useState(0);
  const valuesRecommended = useSelector((state) => state.nutrition?.valuesRecommended);
  const totalValues = useSelector((state) => state.nutrition?.totalValues);

  useEffect(() => {
    if (totalValues.totalWater >= valuesRecommended.water.cups && valuesRecommended.water.cups !== 0) {
      setCongrats(true);
    } else {
      setCongrats(false);
    }
    const percentage="-"+ totalValues.totalWater * 100/ valuesRecommended.water.cups + "%";
    setPercentageAnimation(percentage);
  }, [totalValues]);

  return (
    <>
      <section className="shadow-xl rounded-xl p-5 lg:px-5 lg:py-3 flex flex-col justify-center font-semibold h-auto bg-white lg:row-start-2 lg:col-start-2">
        <div className="max-w-sm w-full bg-white rounded-lg dark:bg-gray-800 mx-auto">
          <div className="flex items-center justify-between pb-4 flex-row">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center ">
                <IconUsersGroup stroke={2} />
              </div>
              <div>
                <h5 className="leading-none text-xl font-bold text-gray-900 dark:text-white">
                  Progress Water
                </h5>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <button onClick={() => dispatch(decreaseWater())}>
                <IconMinus stroke={2} />
              </button>
              <button onClick={() => dispatch(increaseWater())}>
                <IconPlus stroke={2} />
              </button>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center justify-between gap-5 text-center">
              <span className="text-yellow font-bold text-xl">
                {valuesRecommended?.water?.liter || "--"} liters
              </span>
              <span className="text-yellow font-bold text-xl">
                {totalValues?.totalWater}/
                {valuesRecommended?.water?.cups || "--"} cups
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className={s.water} style={{'--percentage':percentageAnimation}}></div>
          </div>

          {congrats && (
            <div className="flex items-center justify-center gap-1 text-center pt-5 flex-col 2xl:flex-row 2xl:gap-2">
              <span className="text-green-500 font-semibold">
                Congratulations!
              </span>
              <span className="text-green-500 font-semibold">
                You have reached your goal
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
