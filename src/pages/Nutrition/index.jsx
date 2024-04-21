import { HealthRecipes, ProgressValue, HealthDetails, ChartCalories, AddFood } from "../../components/Nutrition";
import { useEffect } from "react";
import { useTitle } from "../../hooks";
export function Nutrition() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Nutrition - LifeUnity");
  }, []);

  return (
    <>
      <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-[1fr_auto_220px]">
        <HealthRecipes />
        <HealthDetails />
        <ChartCalories />
        <ProgressValue />
        <AddFood />
      </div>
    </>
  );
}
