import { IconSalad, IconScale, IconTrendingUp } from "@tabler/icons-react";

export default function Step1() {
  return (
    <div className="max-w-md">
      <div className="flex gap-2 mb-4 justify-center">
        <div className="w-[50px] bg-[#777777] h-[5px] rounded-2xl"></div>
        <div className="w-[50px] bg-[#E8AA42] h-[5px] rounded-2xl"></div>
        <div className="w-[50px] bg-[#E8AA42] h-[5px] rounded-2xl"></div>
      </div>
      <h1 className="text-2xl mt-2 font-semibold text-center mb-5">
        What's your target?
      </h1>
      <form className="flex flex-col gap-4 mx-3 md:mx-10">
        <button
          type="button"
          name="target-lose"
          className="font-semibold shadow-xl rounded-lg flex gap-4 items-center justify-center py-3 px-5 text-start focus:ring-2 ring-[#E8AA42] hover:ring-2">
          <IconSalad stroke={2} />
          <div>
            <h3>Lose Weight</h3>
            <p className="text-[15px] font-normal mt-1 leading-5">
              Optimize fat burning while maintaining your muscle mass.
            </p>
          </div>
        </button>
        <button
          type="button"
          name="target-maintain"
          className="font-semibold shadow-xl rounded-lg flex gap-4 items-center justify-center py-3 px-5 text-start focus:ring-2 ring-[#E8AA42] hover:ring-2">
          <IconScale stroke={2} />
          <div>
            <h3>Maintain Weight</h3>
            <p className="text-[15px] font-normal mt-1 leading-5">
              Preserve your physical condition and take care of your well-being.
            </p>
          </div>
        </button>
        <button
          type="button"
          name="target-increase"
          className="font-semibold shadow-xl rounded-lg flex gap-4 items-center justify-center py-3 px-5 text-start focus:ring-2 ring-[#E8AA42] hover:ring-2">
          <IconTrendingUp stroke={2} />
          <div>
            <h3>Increase Muscle</h3>
            <p className="text-[15px] font-normal mt-1 leading-5">
              Increase your muscles and strengthen your body.
            </p>
          </div>
        </button>
      </form>
    </div>
  );
}
