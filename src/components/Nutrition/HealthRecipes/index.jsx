/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import {
  IconChevronRight,
  IconChevronLeft,
  IconSearch,
} from "@tabler/icons-react";
import RecipesCard from "./RecipeCard";
import OpenRecipe from "./OpenRecipe";
import { getRecipes, searchRecipe } from "../../../utils";
import { useDispatch } from "react-redux";
import { setUserValuesConsumed } from "../../../redux/slices/nutritionSlice";

export function HealthRecipes() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [openRecipe, setOpenRecipe] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [recipes, setRecipes] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      let data = sessionStorage.getItem("recipes");

      if (!data) {
        const recipesData = await getRecipes();
        data = JSON.stringify(recipesData);
        sessionStorage.setItem("recipes", data);
      }
      setRecipes(JSON.parse(data));
      setLoading(false);
    };

  fetchRecipes();
  }, []);

  const handleSetOpenRecipe = (recipe = null) => {
    setOpenRecipe(!openRecipe);
    setSelectedRecipe(recipe);
  };

  const handleSetRecipeMade = (recipe) => {
    const recipeRecent = {
      cal: recipe.calories / recipe.yield,
      protein: recipe.totalNutrients.PROCNT.quantity / recipe.yield,
      fat: recipe.totalNutrients.FAT.quantity / recipe.yield,
      carbs: recipe.totalNutrients.CHOCDF.quantity / recipe.yield,
    };
    dispatch(setUserValuesConsumed(recipeRecent));
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
      <section className="shadow border rounded-xl p-5 lg:col-span-3 overflow-hidden flex-none">
        <div className="flex justify-between items-center mb-3 flex-col md:flex-row">
          <div className="flex gap-5 flex-col mb-5 md:flex-row md:mb-0">
            <div className="flex gap-5 items-center">
              <h2 className="text-2xl font-bold text-center md:text-left w-full font-primary">
                Health Recipes
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative rounded-md shadow-sm h-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <IconSearch
                    className="h-4 w-4 text-gray-400"
                    stroke={3}
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="block w-full font-primary rounded-md h-full border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="Search..."
                  value={inputValue}
                  onChange={handleInputValue}
                />
              </div>
              <button
                type="button"
                className="rounded-md font-primary bg-fuel-yellow-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
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
          className="w-full flex gap-5 transition-transform duration-300 ease-[cubic-bezier(0,.96,1,.79)] mt-8"
          style={{ transform: `translateX(${translateX}px)` }}>
          {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  role="status"
                  className="flex items-center justify-center h-48 max-w-sm bg-gray-300 rounded-xl animate-pulse dark:bg-gray-700 flex-none w-full">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ))
            : recipes &&
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
