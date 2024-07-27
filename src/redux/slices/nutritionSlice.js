import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDatos, obtenerInfoToken, crudDatos } from "../../utils";
import { API_URL, ENDPOINTS } from "../../utils/endpoints";

export const userNutritionData = createAsyncThunk(
  "nutrition/fetchUserData",
  async () => {
    const user_id = obtenerInfoToken().user_id;
    const response = await fetchDatos(
      `${API_URL}${ENDPOINTS.NUTRITION_DETAILS}/?id_user=${user_id}`,
      "GET"
    );
    if (response.length === 0) {
      return {};
    }
    return response[0];
  }
);

export const setUserNutritionData = createAsyncThunk(
  "nutrition/setUserData",
  async (param, { getState }) => {
    // eslint-disable-next-line no-unused-vars
    const state = getState();
    const user_id = obtenerInfoToken().user_id; // Asegúrate de que esta función sea sincrónica o maneja la asincronía adecuadamente
    const newData = { id_user: user_id, ...param };
    const response = await crudDatos(
      `${API_URL}${ENDPOINTS.NUTRITION_DETAILS}`,
      newData,
      "POST"
    );
    return response; // Asume que `crudDatos` retorna una promesa que resuelve los datos de respuesta
  }
);

export const userNutritionRecomended = createAsyncThunk(
  "nutrition/userNutritionRecomended",
  async () => {
    const user_id = obtenerInfoToken().user_id;
    const response = await fetchDatos(
      `${API_URL}${ENDPOINTS.VALUES_RECOMMENDED}/?id_user=${user_id}`,
      "GET"
    );
    if (response.length === 0) {
      return {};
    }
    return response[0];
  }
);

export const setUserValuesRecommended = createAsyncThunk(
  "nutrition/setUserValuesRecommended",
  async (param, { getState }) => {
    // eslint-disable-next-line no-unused-vars
    const state = getState();
    const user_id = obtenerInfoToken().user_id; // Asegúrate de que esta función sea sincrónica o maneja la asincronía adecuadamente
    const newData = { id_user: user_id, ...param };
    const response = await crudDatos(
      `${API_URL}${ENDPOINTS.VALUES_RECOMMENDED}`,
      newData,
      "POST"
    );
    return response; // Asume que `crudDatos` retorna una promesa que resuelve los datos de respuesta
  }
);

export const userValuesConsumed = createAsyncThunk(
  "nutrition/userValuesConsumed",
  async () => {
    const user_id = obtenerInfoToken().user_id;
    const response = await fetchDatos(
      `${API_URL}${ENDPOINTS.VALUES_CONSUMED}/?id_user=${user_id}`,
      "GET"
    );
    if (response.length === 0) {
      return {};
    }
    return response[0];
  }
);

export const setUserValuesConsumed = createAsyncThunk(
  "nutrition/setUserValuesConsumed",
  async (param, { getState }) => {
    // eslint-disable-next-line no-unused-vars
    const state = getState();
    const user_id = obtenerInfoToken().user_id;
    const newData = { id_user: user_id, ...param };
    const response = await crudDatos(
      `${API_URL}${ENDPOINTS.VALUES_CONSUMED}`,
      newData,
      "POST"
    );
    return response; // Asume que `crudDatos` retorna una promesa que resuelve los datos de respuesta
  }
);

export const controlWater = createAsyncThunk(
  "nutrition/controlWater",
  async (param, { getState }) => {
    // eslint-disable-next-line no-unused-vars
    const state = getState();
    const user_id = obtenerInfoToken().user_id; // Asegúrate de que esta función sea sincrónica o maneja la asincronía adecuadamente
    let newData = {};
    if (param === "increase") {
      newData = { id_user: user_id, water: 1 };
    } else {
      if (state.nutrition.totalValues.total_water == 0) {
        return state.nutrition.totalValues;
      } else {
        newData = { id_user: user_id, water: -1 };
      }
    }
    const response = await crudDatos(
      `${API_URL}${ENDPOINTS.VALUES_CONSUMED}`,
      newData,
      "POST"
    );
    return response; // Asume que `crudDatos` retorna una promesa que resuelve los datos de respuesta
  }
);

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState: {
    valuesRecommended: {
      carbs: 0,
      protein: 0,
      cal: 0,
      fat: 0,
      water_cups: 0,
      water_liters: 0,
    },
    userData: {},
    totalValues: {
      total_carbs: 0,
      total_protein: 0,
      total_cals: 0,
      total_fat: 0,
      total_water: 0,
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setValuesRecommended: (state, action) => {
      state.valuesRecommended = action.payload;
    },
    setValuesConsumed: (state, action) => {
      state.totalValues = action.payload;
    },
    increaseWater: (state) => {
      state.totalValues.total_water += 1;
    },
    decreaseWater: (state) => {
      if (state.totalValues.total_water > 0) {
        state.totalValues.total_water -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userNutritionData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(setUserNutritionData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(userNutritionRecomended.fulfilled, (state, action) => {
      state.valuesRecommended = action.payload;
    });
    builder.addCase(setUserValuesRecommended.fulfilled, (state, action) => {
      state.valuesRecommended = action.payload;
    });
    builder.addCase(userValuesConsumed.fulfilled, (state, action) => {
      state.totalValues = action.payload;
    });
    builder.addCase(setUserValuesConsumed.fulfilled, (state, action) => {
      state.totalValues = action.payload;
    });
    builder.addCase(controlWater.fulfilled, (state, action) => {
      state.totalValues = action.payload;
    });
  },
});

export const nutritionSliceReducer = nutritionSlice.reducer;

export const {
  setUserData,
  setValuesRecommended,
  setValuesConsumed,
  increaseWater,
  decreaseWater,
} = nutritionSlice.actions;
