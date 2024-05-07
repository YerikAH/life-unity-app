import { createSlice } from "@reduxjs/toolkit";

//slice conjunto de variables y de funciones, las slices usualmente almacenan variables y funciones enfocados en una parte del proyecto
const nutritionSlice = createSlice({
  //nombre unico por slice y el estado inicial
  name: "nutrition",
  initialState: {
    valuesRecommended: 
    localStorage.getItem("valuesRecommended")
      ? JSON.parse(localStorage.getItem("valuesRecommended")): 
      {
          carbs: 0,
          protein: 0,
          cal: 0,
          fat: 0,
          water: {
            liter: 0,
            cups: 0,
          },
        }, //valor de lo graficos tanto de la barra como de la torta
    valuesConsumed: [], //valor de lo graficos tanto de la barra como de la torta
    userData: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {},
    totalValues: localStorage.getItem("totalValuesConsumed")
      ? JSON.parse(localStorage.getItem("totalValuesConsumed"))
      : {
          totalCarbs: 0,
          totalProtein: 0,
          totalCal: 0,
          totalFat: 0,
          totalWater: 0,
        },
  },
  //reducers con s son funciones que se coloca como objeto
  reducers: {
    setUserData: (state, param) => {
      state.userData = param.payload;
      localStorage.setItem("userData", JSON.stringify(param.payload));
    },
    setValuesRecommended: (state, param) => {
      state.valuesRecommended = param.payload;
      localStorage.setItem("valuesRecommended", JSON.stringify(param.payload));
    },
    setValuesConsumed: (state, param) => {
      state.valuesConsumed.push(param.payload);

      state.totalValues = state.valuesConsumed.reduce(
        (total, item) => {
          return {
            totalCarbs: total.totalCarbs + (item?.carbs || 0),
            totalProtein: total.totalProtein + (item?.protein || 0),
            totalCal: total.totalCal + (item?.cal || 0),
            totalFat: total.totalFat + (item?.fat || 0),
            totalWater: state.totalValues.totalWater,
          }; 
        },
        {
          totalCarbs: 0,
          totalProtein: 0,
          totalCal: 0,
          totalFat: 0,
          totalWater: 0,
        }
      );

      localStorage.setItem(
        "totalValuesConsumed",
        JSON.stringify(state.totalValues)
      );
    },
    increaseWater: (state) => {
      state.totalValues.totalWater += 1;
      localStorage.setItem(
        "totalValuesConsumed",
        JSON.stringify(state.totalValues)
      );
    },
    decreaseWater: (state) => {
      if (state.totalValues.totalWater > 0) {
        state.totalValues.totalWater -= 1;
      }
      localStorage.setItem(
        "totalValuesConsumed",
        JSON.stringify(state.totalValues)
      );
    },
  },
});

//para poder utilizar esto dentro del store debo exportarlo como un reducer
export const nutritionSliceReducer = nutritionSlice.reducer;

//para poder exportar las funciones que estan dentro del slice debo usar la propiedar actions
export const {
  setUserData,
  setValuesRecommended,
  setValuesConsumed,
  increaseWater,
  decreaseWater,
} = nutritionSlice.actions;
