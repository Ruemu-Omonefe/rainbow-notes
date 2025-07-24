import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notebookReducer from "./notebookSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notebooks: notebookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
