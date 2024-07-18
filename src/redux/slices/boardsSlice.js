import { createSlice } from "@reduxjs/toolkit";
// import data from "../../data/Kanban/data.json";

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
      const { title, status, description, subtasksToCheck, date, color } =
        action.payload;
      const task = { title, description, date, color, status };
      if (subtasksToCheck) task.subtasks=subtasksToCheck;
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
      if (subtasksToCheck) task.subtasks=subtasksToCheck;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((_, index) => index !== taskIndex);
      const newCol = board.columns.find((_, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
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
