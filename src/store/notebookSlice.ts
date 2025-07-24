// redux/notebookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Notebook } from "../shared/interfaces/notebook.interface";
import { getUserNotes } from "../shared/services/commonService";

// Async thunk to fetch notebooks for a user
export const fetchNotebooks = createAsyncThunk("notebooks/fetchNotebooks",
  async (userId: string) => {
    const res = await getUserNotes(userId);
    return await res.data.notes;
  }
);

// Define the initial state for the notebook slice
interface NotebookState {
  items: Notebook[];
  status: "idle" | "succeeded" | "loading" | "failed";
}

const initialState: NotebookState = {
  items: [],
  status: "idle"
};

const notebookSlice = createSlice({
  name: "notebooks",
  initialState,
  reducers: {
    addNotebook: (state, action: { payload: Notebook }) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotebooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotebooks.fulfilled, (state, action: { payload: Notebook[] }) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchNotebooks.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addNotebook } = notebookSlice.actions;
export default notebookSlice.reducer;
