import { IconTargetArrow } from "@tabler/icons-react";
import { ChartDash } from "./ChartDash";

export function Goals() {
  return (
    <section className="shadow border rounded-xl p-5 justify-center font-semibold bg-white order-3">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-[#000428] font-primary">
            Goals
          </h3>
          <IconTargetArrow className="text-gray-900" />
        </div>
        <p className="mt-2 text-sm text-gray-500 font-primary font-normal">
          Here you can see your progress about nutrition consume during the day.
        </p>
      </div>

      <ChartDash />
    </section>
  );
}
