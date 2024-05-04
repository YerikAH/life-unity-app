

export default function Step2({handleActivity}) {
  return (
    <div className="max-w-md">
      <div className="flex gap-2 mb-4 justify-center">
        <div className="w-[50px] bg-[#777777] h-[5px] rounded-2xl"></div>
        <div className="w-[50px] bg-[#777777] h-[5px] rounded-2xl"></div>
      </div>
      <h1 className="text-2xl mt-2 font-semibold md:w-[70%] text-center m-auto mb-5">
        What's your lever of physical activity?
      </h1>
      <form className="flex flex-col gap-4 mx-3 md:mx-10">
        <button type="button" name="physical-activity" className="font-semibold shadow-xl rounded-lg flex gap-4 items-center justify-center py-3 px-5 text-start focus:ring-2 ring-[#E8AA42] hover:ring-2"
        onClick={()=>handleActivity("Inactive")}>
          <div className="text-center">
            <h3>Sedentary</h3>
            <p className="text-[15px] font-normal mt-1 leading-5">
              No exercise a week
            </p>
          </div>
        </button>
        <button type="button" name="physical-activity" className="font-semibold shadow-xl rounded-lg flex gap-4 items-center justify-center py-3 px-5 text-start focus:ring-2 ring-[#E8AA42] hover:ring-2"
        onClick={()=>handleActivity("Low Active")}>
          <div className="text-center">
            <h3>Light</h3>
            <p className="text-[15px] font-normal mt-1 leading-5">
              Exercises 2 - 3 days a week
            </p>
          </div>
        </button>
        <button type="button" name="physical-activity" className="font-semibold shadow-xl rounded-lg flex gap-4 items-center justify-center py-3 px-5 text-start focus:ring-2 ring-[#E8AA42] hover:ring-2"
        onClick={()=>handleActivity("Active")}>
          <div className="text-center">
            <h3>Moderate</h3>
            <p className="text-[15px] font-normal mt-1 leading-5">
              Exercises 4 - 5 days a week
            </p>
          </div>
        </button>
        <button type="button" name="physical-activity" className="font-semibold shadow-xl rounded-lg flex gap-4 items-center justify-center py-3 px-5 text-start focus:ring-2 ring-[#E8AA42] hover:ring-2"
        onClick={()=>handleActivity("Very Active")}>
          <div className="text-center">
            <h3>High</h3>
            <p className="text-[15px] font-normal mt-1 leading-5">
              Exercises 6 - 7 days a week
            </p>
          </div>
        </button>
      </form>
    </div>
  );
}
