import {configureStore} from '@reduxjs/toolkit';
import { nutritionSliceReducer } from './slices/nutritionSlice';

export const globalStore = configureStore({
    reducer: {
        nutrition: nutritionSliceReducer,

    }
})