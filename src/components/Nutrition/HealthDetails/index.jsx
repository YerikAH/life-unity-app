import { useState } from "react";
import { IconChevronDown, IconFileSpreadsheet } from "@tabler/icons-react";
import { DonutChart } from "./DonutChart";
import { HealthForm } from "../HealthForm";
import { useSelector } from "react-redux";

export function HealthDetails() {
  const data = useSelector((state) => state.nutrition.userData);
  const [isDrop, setDrop] = useState(false);
  const [isOpenForm, setOpenForm] = useState(false);
  const [formResolved, setFormResolved] = useState(!!data);

  const handleSetDrop = () => {
    setDrop(!isDrop);
  };

  const handleOpenForm = () => {
    setOpenForm(!isOpenForm);
  };

  return (
    <>
      <section className="shadow border rounded-xl py-10 px-5 flex flex-col h-auto bg-white lg:row-span-2 justify-between">
        <div className="flex items-center gap-4 justify-center relative">
          <div className="flex flex-col gap-3 justify-center text-center">
            <h2 className="text-2xl font-bold font-primary">Count Calories</h2>
            {!formResolved && (
              <span className="w-[80%] mx-auto text-red-500 font-semibold font-primary">
                Complete the form to calcultate the nutrition values
              </span>
            )}
          </div>
          <button onClick={handleSetDrop}>
            <IconChevronDown stroke={2} />
          </button>
          {isDrop && (
            <button
              className="absolute bg-white top-10 right-18 p-5 rounded-2xl shadow-lg font-semibold flex items-center gap-4 cursor-pointer z-10 font-primary"
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
            <h3 className="font-primary">Heigth</h3>
            <span className="text-[#F9A826] font-bold text-2xl text-center font-primary">
              {" "}
              {data.height || "--"} cm{" "}
            </span>
          </div>

          <div className="flex items-center gap-5 flex-col text-center">
            <h3 className="font-primary">Height</h3>
            <span className="text-[#F9A826] font-bold text-center text-2xl font-primary">
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
