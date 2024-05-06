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
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );

    // Si la hora actual es después de las 12 de la noche, borra los datos inmediatamente
    if (now.getTime() > today.getTime()) {
      localStorage.removeItem("totalValuesConsumed");
    }

    localStorage.removeItem("valuesRecommended");

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
