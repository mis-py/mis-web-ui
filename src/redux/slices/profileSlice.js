import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem('theme') ?? 'light'
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const {
  setTheme
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;