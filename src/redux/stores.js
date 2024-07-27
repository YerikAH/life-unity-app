import {configureStore} from '@reduxjs/toolkit';
import { nutritionSliceReducer } from './slices/nutritionSlice';
import { boardsSliceReducer } from './slices/boardsSlice';
import { notesSliceReducer } from './slices/notesSlice';


export const globalStore = configureStore({
    reducer: {
        nutrition: nutritionSliceReducer,
        kanban: boardsSliceReducer,
        notes: notesSliceReducer,
    }
})