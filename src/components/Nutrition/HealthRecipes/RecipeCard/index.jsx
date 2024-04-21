import examplePancakes from '../../../../assets/images/example-pancakes.png';
import {IconArrowUpRight } from "@tabler/icons-react"
export default function RecipesCard({handleSetOpenRecipe}) {
    
  return (
    <>
      {/* template card uno con texto negro y color #E8AA42 otro con texto blanco y color #000428 intercalado */}
      <div
        id="recipe"
        className="rounded-xl w-[275px] md:w-[330px] h-[190px] flex bg-[#E8AA42] text-black gap-1 flex-none">
        <div className="w-[40%] md:w-[150px] flex-none h-full">
          <img
            src={examplePancakes}
            alt=""
            className="size-full object-cover rounded-tl-xl rounded-bl-xl"
          />
        </div>
        <div className="p-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 gap-2">
              <h3 className="leading-5 font-semibold text-[18px]">
                Pancakes de avena
              </h3>
              <button onClick={handleSetOpenRecipe}>
                <IconArrowUpRight stroke={2} />
              </button>
            </div>
            <div>
              <p className="text-[11px] font-ligth leading-[1rem]">
                La avena tiene grandes beneficios como el aporte de energía y
                ayudar a una mejor digestión.
              </p>
            </div>
          </div>
          <div>
            <div className="flex text-[12px] justify-between font-semibold">
              <span>326 kcal</span>
              <span>15.5g protein</span>
            </div>
            <div className="flex text-[12px] justify-between font-semibold">
              <span>11.8g fat</span>
              <span>38.3g carbs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
