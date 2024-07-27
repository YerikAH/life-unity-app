/* eslint-disable react-hooks/exhaustive-deps */
import {
  HealthRecipes,
  ProgressValue,
  HealthDetails,
  WaterProgress,
  AddFood,
} from "../../components/Nutrition";
import { useEffect } from "react";
import { useTitle } from "../../hooks";
import { useDispatch } from "react-redux";
import { userNutritionData, userNutritionRecomended, userValuesConsumed } from "../../redux/slices/nutritionSlice";
export function Nutrition() {
  useTitle("Nutrition - LifeUnity");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userNutritionData());
    dispatch(userNutritionRecomended());
    dispatch(userValuesConsumed());
  }, [dispatch]);

  useEffect(() => {
    const setMidnightClear = () => {
      const now = new Date();
      const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // el siguiente día
        0, 0, 0 // a las 00:00:00 horas
      );
      const msToMidnight = night.getTime() - now.getTime();
      // esperar hasta la medianoche y borrar los valores
      setTimeout(() => {
        setMidnightClear(); // programar la siguiente eliminación
      }, msToMidnight);
    };

    setMidnightClear();
  }, []);

  return (
    <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-[1fr_auto_220px] pb-24 md:pb-0">
      <HealthRecipes />
      <HealthDetails />
      <WaterProgress />
      <ProgressValue />
      <AddFood />
    </div>
  );
}
