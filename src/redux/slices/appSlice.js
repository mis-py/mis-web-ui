import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  enabled: false,
  is_editable: false,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setAppData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.enabled = action.payload.enabled;
      state.is_editable = action.payload.is_editable;
    },
    resetAppData: (state) => {
      state.id = 0;
      state.name = "";
      state.enabled= false;
      state.is_editable = false;
    },
  },
});

export const {
  setAppData,
  resetAppData,
} = appSlice.actions;

export default appSlice.reducer;
