

export function ProgressValue() {
  return (
    <>
    <section
        className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-center font-semibold h-auto bg-white lg:row-start-3 lg:col-start-2">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2>Carbs</h2>
            {/* cambiar los span dependiendo de estadistica consumida */}
            <span>10g</span>
          </div>
          <div className="w-full bg-gray rounded-full h-2.5 mb-4 ">
            {/* dependiendo de estadisticas se va a actualizar el w */}
            <div
              className="bg-gradient-to-r from-[#E8AA42] h-2.5 rounded-full w-[50%]"></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2>Protein</h2>
            <span>10g</span>
          </div>
          <div className="w-full bg-gray rounded-full h-2.5 mb-4 ">
            <div
              className="bg-gradient-to-r from-[#4B83A7] h-2.5 rounded-full w-[50%]"></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2>Fat</h2>
            <span>10g</span>
          </div>
          <div className="w-full bg-gray rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-[#4E47C6] h-2.5 rounded-full w-[50%]"></div>
          </div>
        </div>
      </section>
    </>
  )
}
