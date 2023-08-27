import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchData: {}
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      const { key, value } = action.payload
      state.searchData[key] = value;
    },
  },
});

export const {
  setSearchValue,
} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
