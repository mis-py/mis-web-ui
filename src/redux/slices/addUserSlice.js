import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  superUser: "",
  settings: [],
  permissions: [],
};

export const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    addSuperUser: (state, action) => {
      state.superUser = action.payload;
    },
    addUserName: (state, action) => {
      state.name = action.payload;
    },
    resetUser: (state) => {
      state.name = "";
      state.settings = [];
    },
  },
});

export const { addSuperUser, addUserName, resetUser } = addUserSlice.actions;

export default addUserSlice.reducer;
