/* eslint-disable react/prop-types */
import {
  IconCalendarMonth,
  IconGenderMale,
  IconGenderFemale,
  IconRulerMeasure,
  IconWeight,
} from "@tabler/icons-react";

export default function Step1({
  isMeasures,
  isGender,
  handleMeasures,
  handleGender,
  handleWeight,
  handleHeight,
  setBirthDate,
  weight,
  birthDate,
  height
}) {
  return (
    <div className="max-w-md">
      <div className="flex gap-2 mb-4 justify-center">
        <div className="w-[50px] bg-[#777777] h-[5px] rounded-2xl"></div>
        <div className="w-[50px] bg-[#E8AA42] h-[5px] rounded-2xl"></div>
      </div>
      <h1 className="text-2xl mt-2 font-semibold m-auto text-center mb-2">
        Enter your data details
      </h1>
      <p className="text-[14px] mb-5 text-center m-auto mx-10">
        Enter your data to continue and calculate the daily consumption
        you must make to maintain a healthy life.
      </p>
      <form className="flex flex-col justify-stretch w-[100%] md:w-[80%] gap-7 m-auto">
        <div className="flex items-center gap-5 font-semibold">
          <IconCalendarMonth size={35} className="flex-none" />
          <div id="container-birth" className="flex w-full gap-5">
            <input
              value={birthDate||""}
              name="birth"
              type="date"
              className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 font-semibold">
          <div className="flex">
            <IconGenderMale size={30} className="flex-none" />
            <IconGenderFemale size={30} className="flex-none" />
          </div>
          <div id="container-gender" className="flex w-full">
            <button
              name="gender"
              type="button"
              id="gender-male"
              className={`flex-1 px-5 py-2 rounded-tl-xl rounded-bl-xl ${
                isGender === "male" ? "bg-[#E8AA42] text-white" : "bg-gray"
              }`}
              onClick={() => {
                handleGender("male");
              }}>
              Male
            </button>
            <button
              name="gender"
              type="button"
              id="gender-female"
              className={`flex-1 px-5 py-2 rounded-tr-xl rounded-br-xl ${
                isGender === "female" ? "bg-[#E8AA42] text-white" : "bg-gray"
              }`}
              onClick={() => {
                handleGender("female");
              }}>
              Female
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 font-semibold">
          <IconRulerMeasure size={35} className="flex-none" />
          <div className="flex w-full justify-between gap-2 md:gap-6">
            <div className="relative flex items-center w-full">
              <input
                value={height || ""}
                type="number"
                className="flex-1 ps-0 w-full border-0 border-b-2 border-b-gray outline-none focus:ring-0 focus:border-[#E8AA42] text-[14px] "
                onChange={handleHeight}
              />
              <div className="absolute right-8">{isMeasures.height}</div>
            </div>
            <div className="flex text-[14px]">
              <button
                name="cm"
                type="button"
                className={`flex-1 px-4 rounded-tl-xl rounded-bl-xl ${
                  isMeasures.height === "cm"
                    ? "bg-[#E8AA42] text-white"
                    : "bg-gray"
                }`}
                onClick={() => {
                  handleMeasures("height", "cm");
                }}>
                cm
              </button>
              <button
                name="ft"
                type="button"
                className={`flex-1 px-4 rounded-tr-xl rounded-br-xl ${
                  isMeasures.height === "ft"
                    ? "bg-[#E8AA42] text-white"
                    : "bg-gray"
                }`}
                onClick={() => {
                  handleMeasures("height", "ft");
                }}>
                ft
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 font-semibold">
          <IconWeight size={30} className="flex-none" />
          <div className="flex w-full justify-between gap-2 md:gap-6">
            <div className="relative flex items-center w-full">
              <input
                value={weight || ""}
                type="number"
                className="flex-1 ps-0 w-full border-0 border-b-2 border-b-gray outline-none focus:ring-0 focus:border-[#E8AA42] text-[14px] "
                onChange={handleWeight}
              />
              <div className="absolute right-8">{isMeasures.weight}</div>
            </div>
            <div className="flex text-[14px]">
              <button
                name="kg"
                type="button"
                className={`flex-1 px-4 rounded-tl-xl rounded-bl-xl ${
                  isMeasures.weight === "kg"
                    ? "bg-[#E8AA42] text-white"
                    : "bg-gray"
                }`}
                onClick={() => {
                  handleMeasures("weight", "kg");
                }}>
                kg
              </button>
              <button
                name="lbs"
                type="button"
                className={`flex-1 px-4 rounded-tr-xl rounded-br-xl ${
                  isMeasures.weight === "lbs"
                    ? "bg-[#E8AA42] text-white"
                    : "bg-gray"
                }`}
                onClick={() => {
                  handleMeasures("weight", "lbs");
                }}>
                lbs
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
