import { useState } from "react";
import { IconChevronDown, IconFileSpreadsheet } from "@tabler/icons-react";
import {DonutChart} from "./DonutChart";
import {HealthForm} from "../HealthForm";

export function HealthDetails() {
  const [isDrop, setDrop] = useState(false);
  const [isOpenForm, setOpenForm] = useState(false);

  const handleSetDrop = () => {
    setDrop(!isDrop);
  };

  const handleOpenForm = () => {
    setOpenForm(!isOpenForm);
  }


  return (
    <>
      <section className="shadow-xl rounded-xl py-10 px-5 flex flex-col h-auto bg-white lg:row-span-2 justify-between">
        <div className="flex items-center gap-4 justify-center relative">
          <h2 className="text-2xl font-bold">Count Calories</h2>
          <button onClick={handleSetDrop}>
            <IconChevronDown stroke={2} />
          </button>
          {isDrop && (
            <button className="absolute bg-white top-10 right-18 p-5 rounded-2xl shadow-lg font-semibold flex items-center gap-4 cursor-pointer z-10" 
            onClick={handleOpenForm}>
              <div className="size-8">
                <IconFileSpreadsheet stroke={2} />
              </div>
              Change your plan
            </button>
          )}
        </div>

        <div className="max-w-sm w-full bg-white rounded-lg dark:bg-gray-800 p-4 md:p-6">
          {/* <!-- Donut Chart --> */}
          <DonutChart />
        </div>

        <div className="flex  justify-center gap-10">
          <div className="flex items-center gap-5">
            <h3>Heigth</h3>
            <span className="text-[#F9A826] font-bold text-2xl"> -- cm </span>
          </div>
          <div className="flex items-center gap-5">
            <h3>Weight</h3>
            <span className="text-[#F9A826] font-bold text-2xl"> -- kg </span>
          </div>
        </div>
      </section>

      {
        isOpenForm && (
          <HealthForm handleOpenForm={handleOpenForm} handleSetDrop={handleSetDrop}/>
        )
      }
    </>
  );
}
