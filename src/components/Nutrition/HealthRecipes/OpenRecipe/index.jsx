import curve from "../../../../assets/curve.svg";
import { IconX, IconCheck } from "@tabler/icons-react";
export default function OpenRecipe({
  handleSetOpenRecipe,
  selectedRecipe,
  handleSetRecipeMade,
}) {
  return (
    <div className="inset-0 fixed bg-black/30 z-20">
      <div className="fixed inset-0 w-screen p-6 flex items-center justify-center">
        <div className="h-[400px] md:size-[400px] m-5 rounded-xl flex justify-between overflow-hidden flex-col md:flex-row bg-[white]">
          <div className="flex md:flex-col justify-between h-full p-5">
            <div>
              <div className="mb-2 text-[14px] md:text-[16px]">
                {selectedRecipe.mealType.map((item, index) => (
                  <h2 key={index}>{item.toUpperCase()}</h2>
                ))}
              </div>
              <h1 className="font-semibold text-xl mb-2 md:text-2xl">
              {selectedRecipe.label.split(" ").slice(0, 5).join(" ")}
              </h1>
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="mb-2 text-[14px] md:text-base">Description</h3>
                  <ul>
                    <li>- {selectedRecipe.cuisineType}</li>
                    <li>- {selectedRecipe.dishType}</li>
                    <li>- {selectedRecipe.cuisineType}</li>
                    <li>- {selectedRecipe.dietLabels}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-5">
              <button
                className="hover:scale-125 transition duration-500 border-2 border-black rounded-full p-1"
                onClick={() => {
                  handleSetOpenRecipe(selectedRecipe);
                  handleSetRecipeMade(selectedRecipe);
                }}>
                <IconCheck stroke={2} />
              </button>
              <button
                className="hover:scale-125 transition duration-500 border-2 border-black rounded-full p-1"
                onClick={handleSetOpenRecipe}>
                <IconX stroke={2} />
              </button>
            </div>
          </div>
          <div className="relative md:w-[200px] flex-none">
            <div className="absolute hidden md:block -left-4 -top-2">
              <img src={curve} alt="curve" className="" />
            </div>
            <img
              src={selectedRecipe.image}
              alt=""
              className="size-[400px] w-full md:w-[400px] object-cover rounded-full overflow-hidden relative max-w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
