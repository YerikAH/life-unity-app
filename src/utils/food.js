import { FOOD_KEY } from "../constants";
export const searchFood = async (food, measure) => {
  const url = `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${food}%20${measure}g&nutrition-type=cooking`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": FOOD_KEY,
      "X-RapidAPI-Host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if(result.totalWeight !== 0){
      return result;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};
