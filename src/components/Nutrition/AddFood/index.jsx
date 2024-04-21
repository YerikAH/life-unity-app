import ItemsFood from "./ItemsFood";

export function AddFood() {
    return (
      <>
        <section className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-between font-semibold h-auto bg-white lg:row-span-2 max-h-[580px] ">
          <h2 className="text-2xl font-bold text-center">
            What foods are you eating today?
          </h2>
          <div className="overflow-y-auto md:h-[80%] py-2">
            <section className="mb-4">
              <h3>Proteins</h3>
              <div className="flex flex-wrap gap-3 m-2">
                <ItemsFood />
              </div>
            </section>
            <section className="mb-4">
              <h3>Carbs</h3>
              <div className="flex flex-wrap gap-5 m-2">
                <ItemsFood />
              </div>
            </section>
            <section className="mb-4">
              <h3>Fat</h3>
              <div className="flex flex-wrap gap-5 m-2">
                <ItemsFood />
              </div>
            </section>
            <section className="mb-4">
              <h3>Fruits and Vegetables</h3>
              <div className="flex flex-wrap gap-5 m-2">
                <ItemsFood />
              </div>
            </section>
            <section className="mb-4">
              <h3>Dairy and Drinks</h3>
              <div className="flex flex-wrap gap-5 m-2">
                <ItemsFood />
              </div>
            </section>
          </div>
          <div className="text-end">
            <button className="bg-[#000428] text-white flex-1 rounded-md py-3 px-8 hover:bg-[#000428]/80">
              Save
            </button>
          </div>
        </section>
      </>
    );
  }
  