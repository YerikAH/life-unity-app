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
    <>
      {/* template card uno con texto negro y color #E8AA42 otro con texto blanco y color #000428 intercalado */}
      <div
        id="recipe"
        className="rounded-xl w-[275px] md:w-[330px] h-[190px] flex bg-[#E8AA42] text-black gap-1 flex-none">
        <div className="w-[40%] md:w-[150px] flex-none h-full">
          <img
            src={image}
            alt=""
            className="size-full object-cover rounded-tl-xl rounded-bl-xl"
          />
        </div>
        <div className="p-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 gap-2">
              <h3 className="leading-5 font-semibold text-[16px]">{title.split(" ").slice(0, 5).join(" ")}</h3>
              <a href={url} onClick={()=>handleSetOpenRecipe(recipe)} target="blank">
                <IconArrowUpRight stroke={2} />
              </a>
            </div>
            <div>
              <p className="text-[11px] font-ligth leading-[1rem]">
                The type of meal to eat this is {mealType} and the dish type is {dishType}.
              </p>
            </div>
          </div>
          <div>
            <div className="flex text-[12px] justify-between font-semibold">
              <span>{calories.toFixed(2)} kcal</span>
              <span>{protein.toFixed(2)}g protein</span>
            </div>
            <div className="flex text-[12px] justify-between font-semibold">
              <span>{fat.toFixed(2)}g fat</span>
              <span>{carbs.toFixed(2)}g carbs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
