import { IconArrowUpRight } from "@tabler/icons-react";
export default function RecipesCard({
  recipe,
  handleSetOpenRecipe,
  title,
  url,
  dishType,
  mealType,
  calories,
  protein,
  fat,
  carbs,
  image,
}) {
  return (
    <div
      id="recipe"
      className="rounded-xl max-w-sm w-full flex bg-fuel-yellow-300 border-fuel-yellow-400 gap-1 flex-none overflow-hidden">
      <div className="w-[40%] md:w-[150px] flex-none h-full">
        <img
          src={image}
          alt="recipe"
          className="size-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between  gap-2">
            <h3 className="leading-5 font-semibold text-base font-primary text-yellow-950">{title.split(" ").slice(0, 5).join(" ")}</h3>
            <a href={url} onClick={() => handleSetOpenRecipe(recipe)} target="blank">
              <IconArrowUpRight stroke={2} size={14} />
            </a>
          </div>
          <div>
            <p className="text-sm font-normal leading-[1rem] font-primary text-yellow-800 mt-2 ">
              The type of meal to eat this is {mealType} and the dish type is {dishType}.
            </p>
          </div>
        </div>
        <div>
          <div className="flex text-[12px] justify-between font-semibold font-primary">
            <span>{calories.toFixed(2)} kcal</span>
            <span>{protein.toFixed(2)}g protein</span>
          </div>
          <div className="flex text-[12px] justify-between font-semibold font-primary">
            <span>{fat.toFixed(2)}g fat</span>
            <span>{carbs.toFixed(2)}g carbs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
