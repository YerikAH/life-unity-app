import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { obtenerInfoToken } from "../../utils";
import { API_URL, ENDPOINTS } from "../../utils/endpoints";

const notesAPI = axios.create({
  baseURL: `${API_URL}${ENDPOINTS.NOTES}`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      // FALTA : FILTRAR NOTES DE UN USUARIO EN PARTICULAR
      const response = await notesAPI.get(`?user_id=${obtenerInfoToken().user_id}`);
      return response.data;
    } catch (error) {
      console.error('Error al Obtener los Boards: ', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNotes = createAsyncThunk(
    'notes/createNotes',
    async (data , { dispatch, rejectWithValue }) => {
      try {
        const response = await notesAPI.post(`/`, data);
        dispatch(fetchNotes());
        return response.data;
      } catch (error) {
        console.error('Error al Crear la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const updateNotes = createAsyncThunk(
    'notes/updateNotes',
    async ({ noteId, data }, { dispatch, rejectWithValue }) => {
      try {
        const response = await notesAPI.put(`${noteId}/`, data);
        dispatch(fetchNotes());
        return response.data;
      } catch (error) {
        console.error('Error al Actualizar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const deleteNotes = createAsyncThunk(
    'notes/deleteNotes',
    async (noteId, { dispatch, rejectWithValue }) => {
      try {
        await notesAPI.delete(`${noteId}/`);
        dispatch(fetchNotes());
        return noteId;
      } catch (error) {
        console.error('Error al Eliminar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);



const notesSlice = createSlice({
  name: "notes",
  initialState: 
    {
      notes: [],
    },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(createNotes.fulfilled);
    builder.addCase(updateNotes.fulfilled);
    builder.addCase(deleteNotes.fulfilled);
  }
});

export const notesSliceReducer = notesSlice.reducer;

export const {
  addNote,
  updateNote,
  deleteNote,
} = notesSlice.actions;
