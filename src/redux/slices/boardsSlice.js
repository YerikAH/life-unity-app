import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { obtenerInfoToken } from "../../utils";

const boardAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/boards/",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  },
});

const taskAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/cards/",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  },
})

const subtasksAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/subcards/",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  },
})

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      // FALTA : FILTRAR BOARDS DE UN USUARIO EN PARTICULAR
      const response = await boardAPI.get(`/?id_user=${obtenerInfoToken().user_id}`);
      return response.data;
    } catch (error) {
      console.error('Error al Obtener los Boards: ', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const id_user = obtenerInfoToken().user_id; 
      const response = await boardAPI.post('/', {...data, id_user});
      dispatch(fetchBoards()); 
      return response.data;
    } catch (error) {
      console.error('Error al Crear el Board: ', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBoard = createAsyncThunk(
    'boards/updateBoard',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const response = await boardAPI.put(`/${data.id}/`, data);
        dispatch(fetchBoards()); 
        return response.data;
      } catch (error) {
        console.error('Error al Actualizar el Board: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const deleteBoards = createAsyncThunk(
    'boards/deleteBoard',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        await boardAPI.delete(`/${id}/`);
        dispatch(fetchBoards()); 
        return id;
      } catch (error) {
        console.error('Error al Eliminar el Board: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const fetchTasks = createAsyncThunk(
  'boards/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskAPI.get('/');
      return response.data;
    } catch (error) {
      console.error('Error al Obtener los Tasks: ', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
    'boards/createTask',
    async ({ data }, { dispatch, rejectWithValue }) => {
      console.log(data)
      try {
        const response = await taskAPI.post(`/`, data);
        dispatch(fetchTasks());
        return response.data;
      } catch (error) {
        console.error('Error al Crear la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const updateTask = createAsyncThunk(
    'boards/updateTask',
    async ({ taskId, data }, { dispatch, rejectWithValue }) => {
      try {
        const response = await taskAPI.put(`/${taskId}/`, data);
        dispatch(fetchTasks());
        return response.data;
      } catch (error) {
        console.error('Error al Actualizar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const deleteTasks = createAsyncThunk(
    'boards/deleteTask',
    async ({ taskId }, { dispatch, rejectWithValue }) => {
      try {
        await taskAPI.delete(`/${taskId}/`);
        dispatch(fetchTasks());
        return taskId;
      } catch (error) {
        console.error('Error al Eliminar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const fetchSubtasks = createAsyncThunk(
  'boards/fetchSubtasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await subtasksAPI.get('/');
      return response.data;
    } catch (error) {
      console.error('Error al Obtener los Tasks: ', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSubtask = createAsyncThunk(
    'boards/createSubtask',
    async ({ dataSubtask }, { dispatch, rejectWithValue }) => {
      try {
        const response = await subtasksAPI.post(`/`, dataSubtask);
        dispatch(fetchSubtasks());
        return response.data;
      } catch (error) {
        console.error('Error al Crear la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const updateSubtask = createAsyncThunk(
    'boards/updateSubtask',
    async ({ subtaskId, dataSubtask }, { dispatch, rejectWithValue }) => {
      try {
        const response = await subtasksAPI.put(`/${subtaskId}/`, dataSubtask);
        dispatch(fetchSubtasks());
        return response.data;
      } catch (error) {
        console.error('Error al Actualizar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const deleteSubtasks = createAsyncThunk(
    'boards/deleteSubtasks',
    async ({ subtaskId }, { dispatch, rejectWithValue }) => {
      try {
        await subtasksAPI.delete(`/${subtaskId}/`);
        dispatch(fetchSubtasks());
        return subtaskId;
      } catch (error) {
        console.error('Error al Eliminar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);



const boardsSlice = createSlice({
  name: "kanban",
  initialState: 
    {
      idActiveBoard:0,
      boards: [],
      tasks: [],
      subtasks: [],
      columns:[
        { name: "In Progress", id: 1 },
        { name: "In Review", id: 2 },
        { name: "Done", id: 3 },
      ]
    },
  reducers: {
    changeActive:(state, action)=>{
      const idActiveBoard = action.payload
      state.idActiveBoard = idActiveBoard
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(createBoard.fulfilled);
    builder.addCase(updateBoard.fulfilled);
    builder.addCase(deleteBoards.fulfilled);
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(createTask.fulfilled);
    builder.addCase(updateTask.fulfilled);
    builder.addCase(deleteTasks.fulfilled);
    builder.addCase(fetchSubtasks.fulfilled, (state, action) => {
      state.subtasks = action.payload;
    });
    builder.addCase(createSubtask.fulfilled);
    builder.addCase(updateSubtask.fulfilled);
    builder.addCase(deleteSubtasks.fulfilled);
  }
});

export const boardsSliceReducer = boardsSlice.reducer;

export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  dragTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
  changeActive
} = boardsSlice.actions;
