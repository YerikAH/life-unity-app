import {configureStore} from '@reduxjs/toolkit';
import { nutritionSliceReducer } from './slices/nutritionSlice';
import boardsSlice from './slices/boardsSlice';


export const globalStore = configureStore({
    reducer: {
        nutrition: nutritionSliceReducer,
        //boards: boardsSlice.reducer,
    }
})

