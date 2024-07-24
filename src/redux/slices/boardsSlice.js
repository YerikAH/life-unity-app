import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import data from "../../data/Kanban/data.json";
import axios from "axios";

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

export const createBoard = createAsyncThunk(
    'boards/createBoard',
    async (data, { rejectWithValue }) => {
      try {
        const response = await boardAPI.post('/', data);
        return response.data;
      } catch (error) {
        console.error('Error al Crear el Board: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const updateBoard = createAsyncThunk(
    'boards/updateBoard',
    async (data, { rejectWithValue }) => {
      try {
        const response = await boardAPI.put(`/${data.id}/`, data);
        return response.data;
      } catch (error) {
        console.error('Error al Actualizar el Board: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const deleteBoards = createAsyncThunk(
    'boards/deleteBoard',
    async (id, { rejectWithValue }) => {
      try {
        await boardAPI.delete(`/${id}/`);
        return id;
      } catch (error) {
        console.error('Error al Eliminar el Board: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const fetchBoards = createAsyncThunk(
    'boards/fetchBoards',
    async (_, { rejectWithValue }) => {
      try {
        const response = await boardAPI.get('/');
        return response.data;
      } catch (error) {
        console.error('Error al Obtener los Boards: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const createTask = createAsyncThunk(
    'boards/createTask',
    async ({ boardId, data }, { rejectWithValue }) => {
      try {
        const response = await taskAPI.post(`/${boardId}/tasks/`, data);
        return response.data;
      } catch (error) {
        console.error('Error al Crear la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const updateTask = createAsyncThunk(
    'boards/updateTask',
    async ({ boardId, taskId, data }, { rejectWithValue }) => {
      try {
        const response = await taskAPI.put(`/${boardId}/tasks/${taskId}/`, data);
        return response.data;
      } catch (error) {
        console.error('Error al Actualizar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const deleteTasks = createAsyncThunk(
    'boards/deleteTask',
    async ({ boardId, taskId }, { rejectWithValue }) => {
      try {
        await taskAPI.delete(`/${boardId}/tasks/${taskId}/`);
        return taskId;
      } catch (error) {
        console.error('Error al Eliminar la Tarea: ', error);
        return rejectWithValue(error.response.data);
      }
    }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: [],
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.push(board);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.description = payload.description;
      board.columns = payload.newColumns;
    },
    deleteBoard: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((board) => board.id === id);
      state.splice(index, 1);
      if (state.length > 0) state[0].isActive = true;
    },
    setBoardActive: (state, action) => {
      const id = action.payload;
      state.forEach((board) => {
        board.isActive = board.id === id ? true : false;
      });
    },
    addTask: (state, action) => {
      const {title, status, description, subtasksToCheck, date, color} =
          action.payload;
      const task = {title, description, date, color, status};
      if (subtasksToCheck) task.subtasks = subtasksToCheck;
      const board = state.find((board) => board.isActive);
      const newColIndex = board.columns.findIndex((col) => col.name === status);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasksToCheck,
        date,
        color,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((_, index) => index === prevColIndex);
      const task = column.tasks.find((_, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.date = date;
      task.color = color;
      task.description = description;
      if (subtasksToCheck) task.subtasks = subtasksToCheck;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((_, index) => index !== taskIndex);
      const newCol = board.columns.find((_, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const {colIndex, prevColIndex, taskIndex} = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      const isActive = state.boards.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        isActive,
        columns: payload.columns || [],
      };
      state.boards.push(board);
    });
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      const payload = action.payload;
      const board = state.boards.find((board) => board.id === payload.id);
      if (board) {
        board.name = payload.name;
        board.description = payload.description;
        board.columns = payload.columns || [];
      }
    });
    builder.addCase(deleteBoards.fulfilled, (state, action) => {
      const id = action.payload;
      state.boards = state.boards.filter((board) => board.id !== id);
      if (state.boards.length > 0) state.boards[0].isActive = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      const payload = action.payload;
      const board = state.boards.find((board) => board.id === payload.boardId);
      if (board) {
        const column = board.columns.find((col) => col.name === payload.status);
        if (column) {
          column.tasks.push(payload);
        }
      }
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const payload = action.payload;
      const board = state.boards.find((board) => board.id === payload.boardId);
      if (board) {
        const column = board.columns.find((col) => col.name === payload.prevStatus);
        const task = column.tasks.find((task) => task.id === payload.id);
        if (task) {
          task.title = payload.title;
          task.status = payload.status;
          task.description = payload.description;
          task.date = payload.date;
          task.color = payload.color;
          if (payload.subtasksToCheck) task.subtasks = payload.subtasksToCheck;

          // Mover tarea si el estado cambió
          if (payload.prevStatus !== payload.status) {
            column.tasks = column.tasks.filter((task) => task.id !== payload.id);
            const newColumn = board.columns.find((col) => col.name === payload.status);
            newColumn.tasks.push(task);
          }
        }
      }
    });
    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      const {boardId, taskId} = action.payload;
      const board = state.boards.find((board) => board.id === boardId);
      if (board) {
        board.columns.forEach((col) => {
          col.tasks = col.tasks.filter((task) => task.id !== taskId);
        });
      }
    });
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
} = boardsSlice.actions;
