export const searchFood = async (food, measure) => {
  const url = `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${food}%20${measure}g&nutrition-type=cooking`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f23d5c008amsh2bfe05f84d42d47p15ed08jsn9bbee8a7e446",
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
