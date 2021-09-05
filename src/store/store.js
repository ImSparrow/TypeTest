import { configureStore } from "@reduxjs/toolkit";
import { displayReducer } from "./displaySlice";
import { timeReducer } from "./timeSlice";
const store = configureStore({
  reducer: {
    display: displayReducer,
    time: timeReducer,
  },
});
export default store;
