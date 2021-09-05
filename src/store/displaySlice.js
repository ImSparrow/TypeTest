import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    output: "",
    currentWord: "",
    input: "",
    current: 0,
    wordThreshold: 0,
    correct: [],
  },
  reducers: {
    correct: (state, action) => {
      state.correct[action.payload.index] = true;
    },
    incorrect: (state, action) => {
      state.correct[action.payload.index] = false;
    },
    neutral: (state, action) => {
      state.correct[action.payload.index] = "neutral";
    },
    setOutput: (state, action) => {
      state.output = action.payload.output;
    },
    setInput: (state, action) => {
      state.input = action.payload.input;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload.correct;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload.currentWord;
    },
    increaseCurrent: (state) => {
      if (state.current + 1 < state.wordThreshold + state.currentWord.length) {
        state.current = state.current + 1;
      }
    },
    increaseWordThresholdBy: (state, action) => {
      state.wordThreshold += action.payload.wordThreshold;
    },
    decreaseCurrent: (state) => {
      if (state.current !== 0) {
        state.current = state.current - 1;
      }
      if (state.current <= state.wordThreshold) {
        state.current = state.wordThreshold;
      }
    },
    decreaseCurrentBy: (state, action) => {
      state.current = state.current - action.payload.amount;
      if (state.current <= state.wordThreshold) {
        state.current = state.wordThreshold;
      }
    },
    resetCorrect: (state) => {
      state.correct = [];
    },
    setCurrent: (state, action) => {
      state.current = action.payload.current;
    },
    setDefault: (state) => {
      state.output = "";
      state.currentWord = "";
      state.input = "";
      state.current = 0;
      state.wordThreshold = 0;
      state.correct = [];
    },
  },
});
export const displayAction = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
