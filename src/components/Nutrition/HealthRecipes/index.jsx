/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import {IconChevronRight, IconChevronLeft, IconSearch} from "@tabler/icons-react";
import RecipesCard from "./RecipeCard";
import OpenRecipe from "./OpenRecipe";
import { getRecipes, searchRecipe } from "../../../utils";
import { useDispatch } from "react-redux";
import { setValuesConsumed } from "../../../redux/slices/nutritionSlice";

export function HealthRecipes() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [openRecipe, setOpenRecipe] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [recipes, setRecipes] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      let data = sessionStorage.getItem('recipes');
  
      if (!data) {
        const recipesData = await getRecipes();
        data = JSON.stringify(recipesData);
        sessionStorage.setItem('recipes', data);
      }
      console.log(JSON.parse(data))
      setRecipes(JSON.parse(data));
    };
  
    fetchRecipes();
  }, []);

  const handleSetOpenRecipe = (recipe = null) => {
    setOpenRecipe(!openRecipe);
    setSelectedRecipe(recipe);
  };

  const handleSetRecipeMade = (recipe) => {
    const recipeRecent = {
      cal: recipe.calories/recipe.yield,
      protein: recipe.totalNutrients.PROCNT.quantity/recipe.yield,
      fat: recipe.totalNutrients.FAT.quantity/recipe.yield,
      carbs: recipe.totalNutrients.CHOCDF.quantity/recipe.yield,
    }
    dispatch(setValuesConsumed(recipeRecent));
  };

  const nextSlide = useCallback(() => {
    setTranslateX((prev) => prev - 100);
  });

  const prevSlide = useCallback(() => {
    if (translateX !== 0) {
      setTranslateX((prev) => prev + 100);
    }
  });

  const handleSearch = async (inputValue) => {
    if (inputValue.trim() === "") {
      getData();
    } else {
      const recipesData = await searchRecipe(inputValue.trim());
      if (recipesData.length === 0) {
        getData();
      } else {
        setRecipes(recipesData);
      }
    }
    setInputValue("");
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <section className="shadow-xl rounded-xl p-5 lg:col-span-3 overflow-hidden flex-none">
        <div className="flex justify-between items-center mb-3 flex-col md:flex-row">
          <div className="flex gap-5 flex-col mb-5 md:flex-row md:mb-0">
            <div className="flex gap-5 items-center">
              <h2 className="text-2xl font-bold text-center md:text-left w-full md:w-[50%]">
                Health Recipes
              </h2>
            </div>
            <div className="flex items-center">
              <div className="flex relative items-center">
                <IconSearch className="absolute left-2 size-4" />
                <input
                  value={inputValue}
                  onChange={handleInputValue}
                  type="text"
                  className="p-[3px] ps-10 border border-black focus:border-black rounded-tl-xl rounded-bl-xl focus:ring-0 ring-none outline-none w-full"
                />
              </div>
              <button
                className="bg-yellow px-2 py-[3px] rounded-tr-xl rounded-br-xl border border-black"
                onClick={() => handleSearch(inputValue)}>
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center gap-7">
            {/* para hacer paginacion */}
            <button
              className="hover:bg-[#8B8B8B]/20 p-2 rounded-xl transition duration-300 ease"
              onClick={prevSlide}>
              <IconChevronLeft stroke={2} />
            </button>
            <button
              className="hover:bg-[#8B8B8B]/20 p-2 rounded-xl transition duration-300 ease"
              onClick={nextSlide}>
              <IconChevronRight stroke={2} />
            </button>
          </div>
        </div>
        {/* Aqui iran las recetas renderizar de api*/}
        <div
          className="flex gap-5 transition-transform duration-300 ease-[cubic-bezier(0,.96,1,.79)]"
          style={{ transform: `translateX(${translateX}px)` }}>
          {recipes &&
            recipes.map((recipe, index) => (
              <RecipesCard
                key={index}
                recipe={recipe}
                url={recipe.url}
                title={recipe.label}
                destination={recipe.cuisineType}
                dishType={recipe.dishType}
                mealType={recipe.mealType}
                image={recipe.image}
                calories={recipe.calories}
                protein={recipe.totalNutrients.PROCNT.quantity}
                fat={recipe.totalNutrients.FAT.quantity}
                carbs={recipe.totalNutrients.CHOCDF.quantity}
                handleSetOpenRecipe={handleSetOpenRecipe}
              />
            ))}
        </div>
      </section>
      {selectedRecipe && openRecipe && (
        <OpenRecipe
          selectedRecipe={selectedRecipe}
          handleSetOpenRecipe={handleSetOpenRecipe}
          handleSetRecipeMade={handleSetRecipeMade}
        />
      )}
    </>
  );
}
