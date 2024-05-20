import {configureStore} from '@reduxjs/toolkit';
import { nutritionSliceReducer } from './slices/nutritionSlice';
import { boardsSliceReducer } from './slices/boardsSlice';


export const globalStore = configureStore({
    reducer: {
        nutrition: nutritionSliceReducer,
        boards: boardsSliceReducer,

    }
})