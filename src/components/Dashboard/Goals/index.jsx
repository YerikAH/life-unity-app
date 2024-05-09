import {ChartDash} from './ChartDash'

export function Goals() {
  return (
    <>
      <section className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-between font-semibold h-auto bg-white lg:row-span-2 md:max-h-full">
        <div className="max-w-full px-6 pb-8 bg-white rounded-lg ">
          <div className="flex justify-between items-center pb-3 pt-3">
            <h3 className="font-semibold text-xl text-[#000428]">Goals</h3>      
          </div>
          <ChartDash />
        </div>
      </section>
    </>
  );
}
