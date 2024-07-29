import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  proxy: {
    id: "",
    name: "",
  },
  interval: 60,
};

export const domainChecker = createSlice({
  name: "domainChecker",
  initialState,
  reducers: {
    addDomain: (state, action) => {
      const { name, value } = action.payload;
      if (name.includes(".")) {
        const [field, subfield] = name.split(".");
        state[field][subfield] = value;
      } else {
        state[name] = value;
      }
    },
    addDomainProxy: (state, action) => {
      const { name, value } = action.payload;
      state.proxy[name] = value;
    },
  },
});

export const { addDomain, addDomainProxy } = domainChecker.actions;

export const domainCheckerReducer = domainChecker.reducer;
