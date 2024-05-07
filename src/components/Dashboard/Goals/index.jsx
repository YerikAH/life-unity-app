export function Goals() {
  return (
    <>
      <section className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-between font-semibold h-auto bg-white lg:row-span-2 md:max-h-full">
        <div className="max-w-full px-6 pb-8 bg-white rounded-lg ">
          <div className="flex justify-between items-center pb-3 pt-3">
            <h3 className="font-semibold text-xl text-[#000428]">Goals</h3>
            <a className="text-[#000428] font-bold text-sm px-1 py-2.5 text-center inline-flex items-center">
              Weekly
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
