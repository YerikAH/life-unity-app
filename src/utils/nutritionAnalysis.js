import { NUTRITION_ANALYSIS_KEY } from "../constants";
export const analysis = async (data) => {
  let { birth_date, weight, height, sex, daily_activity } = data;
  const today = new Date();
  const birthDateObj = new Date(birth_date);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth() - birthDateObj.getMonth();
  if (month < 0 || month === 0 && today.getDate() < birthDateObj.getDate()){
    age -= 1;
  }
  switch (daily_activity) {
    case "sedentary":
      daily_activity = "Low%20%active";
      break;
    case "light":
      daily_activity = "Active";
      break;
    case "moderate":
      daily_activity = "Inactive";
      break;
    case "high":
      daily_activity = "Very%20%Active";
      break;
  }
  const url = `https://nutrition-calculator.p.rapidapi.com/api/nutrition-info?measurement_units=met&sex=${sex}&age_value=${age}&age_type=yrs&cm=${height}&kilos=${weight}&activity_level=${daily_activity}`;
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
