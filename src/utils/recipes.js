import { RECIPES_KEY } from "../constants";
export const getRecipes = async () => {
  const url =
  'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&co2EmissionsClass=A%2B&field%5B0%5D=uri&beta=true&random=true&cuisineType=South%20American&imageSize%5B0%5D=LARGE&diet%5B0%5D=balanced&dishType%5B0%5D=Biscuits%20and%20cookies%2C%20Bread%2C%20Cereals%2C%20Desserts%2C%20Drinks%2C%20Main%20course%2C%20Pancake%2C%20Preserve%2C%20Salad%2C%20Sandwiches%2C%20Side%20dish%2C%20Soup%2C%20Starter%2C%20Sweets';
  const options = {
    method: "GET",
    headers: {
      'Accept-Language': 'en',
      'X-RapidAPI-Key': RECIPES_KEY,
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const recipeData = result.hits.map((item) => item.recipe);
    return recipeData;
  } catch (error) {
    return error;
  }
};


export const searchRecipe = async (search) => {
  //separar espacio por %20
  const variable = search.split(' ').join('%20');
  const url=`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${variable}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    const recipeData = result.hits.map((item) => item.recipe);
    return recipeData;
  } catch (error) {
    return error;
  }
}