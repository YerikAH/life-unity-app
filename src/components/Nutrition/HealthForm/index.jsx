import { useCallback, useState } from "react";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserNutritionData,
  setUserValuesRecommended,
} from "../../../redux/slices/nutritionSlice";
import { analysis } from "../../../utils";

const calculateAge = (birthDate) => {
  
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth() - birthDateObj.getMonth();
  return month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())
    ? age - 1
    : age;
};

export function HealthForm({ handleOpenForm, handleSetDrop, setFormResolved }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.nutrition.userData);
  const [step, setStep] = useState(1);
  const [isMeasures, setIsMeasures] = useState({
    weight: "kg",
    height: "cm",
  });
  const [isGender, setIsGender] = useState(null);
  const [isActivity, setIsActivity] = useState(null);
  const [isWeight, setIsWeight] = useState(null);
  const [isHeight, setIsHeight] = useState(null);
  const [birthDate, setBirthDate] = useState(null);

  const handleMeasures = (type, value) => {
    setIsMeasures({
      ...isMeasures,
      [type]: value,
    });
  };

  const handleGender = (type) => {
    setIsGender(type);
  };

  const handleActivity = (type) => {
    setIsActivity(type);
  };

  const fetchData = async () => {
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
      result?.macronutrients_table["macronutrients-table"][10][1].match(regex);
    const waterLiter = Number(water[0]);
    const waterCups = Number(water[1]);
    const recommended = {
      cals: calNumber,
      carbs: carbsNumber,
      protein: proteinNumber,
      fat: fatNumber,
      water_liters: waterLiter,
      water_cups: waterCups,
    };
    return recommended;
  };

  const handleData = async () => {
    const age = calculateAge(birthDate);
    if (!isActivity || !isGender || !age || !isWeight || !isHeight || age < 10)
      return;
    const weight = Number(isWeight);
    const height = Number(isHeight);
    dispatch(
      setUserNutritionData({
        birth_date: birthDate,
        weight: isMeasures.weight === "kg" ? weight : weight / 2.20462,
        height: isMeasures.height === "cm" ? height : height / 0.0328,
        sex: isGender,
        daily_activity: isActivity,
      })
    );
    const fetchedData = await fetchData();
    dispatch(setUserValuesRecommended(fetchedData));
    setFormResolved(true);
  };

  const handleNext = useCallback(() => {
    if (step < 2) {
      setStep(step + 1);
    }
  });

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  });

  const handleWeight = (e) => {
    setIsWeight(e.target.value);
  };

  const handleHeight = (e) => {
    setIsHeight(e.target.value);
  };

  return (
    <>
      <div className="inset-0 fixed bg-black/30 z-20 bg-opacity-35 transition-opacity backdrop-blur-sm">
        <div className="fixed inset-0 w-[80%] flex items-center justify-center mx-auto">
          <div className="m-auto flex flex-col items-center gap-3 pb-10 bg-white rounded-2xl p-6">
            <div className="w-full">
              <button
                onClick={() => {
                  handleOpenForm();
                  handleSetDrop();
                }}>
                <IconX stroke={2} />
              </button>
            </div>

            <div className="flex w-full items-center justify-center relative">
              {step !== 1 && (
                <div className="flex items-center">
                  <button
                    id="back"
                    type="button"
                    className="flex items-center gap-2 w-[100px] absolute left-0"
                    onClick={handleBack}>
                    <IconChevronLeft />
                    Back
                  </button>
                  <button
                    className="flex items-center justify-end gap-2 absolute right-0 bg-[#E8AA42] px-5 py-2 rounded-2xl font-semibold"
                    onClick={() => {
                      handleOpenForm();
                      handleSetDrop();
                      handleData();
                    }}>
                    Send
                  </button>
                </div>
              )}
              <h3 className="text-lg font-semibold">{step}/2</h3>
              {step !== 2 && (
                <button
                  id="next"
                  type="button"
                  className="flex items-center gap-2 w-[100px] absolute right-0"
                  onClick={handleNext}>
                  Next
                  <IconChevronRight />
                </button>
              )}
            </div>
            {step === 1 && (
              <Step1
                isMeasures={isMeasures}
                isGender={isGender}
                handleGender={handleGender}
                handleMeasures={handleMeasures}
                handleWeight={handleWeight}
                weight={isWeight}
                handleHeight={handleHeight}
                height={isHeight}
                setBirthDate={setBirthDate}
                birthDate={birthDate}
              />
            )}
            {step === 2 && <Step2 handleActivity={handleActivity} />}
          </div>
        </div>
      </div>
    </>
  );
}
