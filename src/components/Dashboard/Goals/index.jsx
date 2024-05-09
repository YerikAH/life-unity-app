import {ChartDash} from './ChartDash'

export function Goals() {
  return (
    <>
      <section className="shadow-xl rounded-xl p-6 flex flex-col justify-center font-semibold h-auto bg-white  md:max-h-full">
        <div className="max-w-full bg-white rounded-lg ">
          <div className="flex justify-between items-center pb-3 pt-3">
            <h3 className="font-semibold text-xl text-[#000428]">Goals</h3>      
          </div>
          <ChartDash />
        </div>
      </section>
    </>
  );
}
