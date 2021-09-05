import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    words: 0,
    time: 0,
    completed: false,
  },
  reducers: {
    setWord: (state, action) => {
      state.words = action.payload.words;
    },
    setTime: (state, action) => {
      state.time = action.payload.time;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload.completed;
    },
  },
});
export const timeAction = timeSlice.actions;
export const timeReducer = timeSlice.reducer;
