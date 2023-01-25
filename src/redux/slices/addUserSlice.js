import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  team: {
    value: null,
    label: "",
  },
  permissions: [],
  settings: [],
};

export const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.name = action.payload;
    },
    addUserTeam: (state, action) => {
      state.team = action.payload;
    },
    addUserPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    resetUser: (state) => {
      state.name = "";
      state.permissions = [];
      state.settings = [];
    },
  },
});

export const { addUserName, addUserTeam, addUserPermissions, resetUser } =
  addUserSlice.actions;

export default addUserSlice.reducer;
