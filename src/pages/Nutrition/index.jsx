import {
  HealthRecipes,
  ProgressValue,
  HealthDetails,
  WaterProgress,
  AddFood,
} from "../../components/Nutrition";
import { useEffect } from "react";
import { useTitle } from "../../hooks";
export function Nutrition() {
  const { changeTitle } = useTitle();

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
        localStorage.removeItem('totalValues');
        setMidnightClear(); // programar la siguiente eliminación
      }, msToMidnight);
    };

    setMidnightClear();
    changeTitle("Nutrition - LifeUnity");
  }, []);

  return (
    <>
      <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-[1fr_auto_220px]">
        <HealthRecipes />
        <HealthDetails />
        <WaterProgress />
        <ProgressValue />
        <AddFood />
      </div>
    </>
  );
}
