import { NUTRITION_ANALYSIS_KEY } from "../constants";
export const analysis = async (data) => {
  const { age, weight, height, gender, activity } = data;
  const activityUrl = activity.replace(" ", "%20");
  const url = `https://nutrition-calculator.p.rapidapi.com/api/nutrition-info?measurement_units=met&sex=${gender}&age_value=${age}&age_type=yrs&cm=${height}&kilos=${weight}&activity_level=${activityUrl}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": NUTRITION_ANALYSIS_KEY,
      "X-RapidAPI-Host": "nutrition-calculator.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error);
    return error;
  }
};
