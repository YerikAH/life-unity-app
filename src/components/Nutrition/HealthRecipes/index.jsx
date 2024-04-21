import { useState } from "react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import RecipesCard from "./RecipeCard";
import OpenRecipe from "./OpenRecipe";
export function HealthRecipes() {
  const [openRecipe, setOpenRecipe] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const recipes = [
    {
      title: "Healthy Recipe 1",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 2",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 3",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 4",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 5",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 6",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 7",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 8",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 9",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Healthy Recipe 10",
      description: "This is a healthy recipe",
      image: "https://via.placeholder.com/150",
    },
  ];

  const handleSetOpenRecipe = () => {
    setOpenRecipe(!openRecipe);
  }

  const nextSlide = () => {
    setTranslateX(prev => prev - 100);
  }

  const prevSlide = () => {
    if(translateX !== 0){
      setTranslateX(prev => prev + 100);
    }
  }

  return (
    <>
      <section className="shadow-xl rounded-xl p-5 lg:col-span-3 overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-5 items-center">
            <h2 className="text-2xl font-bold w-[50%] md:w-full">
              Health Recipes
            </h2>
          </div>
          <div className="flex items-center gap-7">
            {/* para hacer paginacion */}
            <button className="hover:bg-[#8B8B8B]/20 p-2 rounded-xl transition duration-300 ease"
            onClick={prevSlide}>
              <IconChevronLeft stroke={2} />
            </button>
            <button className="hover:bg-[#8B8B8B]/20 p-2 rounded-xl transition duration-300 ease"
            onClick={nextSlide}>
              <IconChevronRight stroke={2} />
            </button>
          </div>
        </div>
        {/* Aqui iran las recetas renderizar de api*/}
        <div className="flex gap-5 transition-transform duration-300 ease-[cubic-bezier(0,.96,1,.79)]"  style={{ transform: `translateX(${translateX}px)` }}>
          {recipes.map((recipe, index) => (
            <RecipesCard
              key={index}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              handleSetOpenRecipe={handleSetOpenRecipe}
            />
          ))}
        </div>
      </section>
      {openRecipe && <OpenRecipe handleSetOpenRecipe={handleSetOpenRecipe} />}
    </>
  );
}
