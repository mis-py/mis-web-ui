import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  team: {
    value: null,
    label: "",
  },
  permissions: [],
  settings: [],
  newSettings: {},
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
    addUserSettings: (state, action) => {
      state.settings = action.payload;
    },
    addUserNewSettings: (state, action) => {
      state.newSettings = action.payload;
    },
    resetUser: (state) => {
      state.name = "";
      state.team = {
        value: null,
        label: "",
      };
      state.permissions = [];
      state.settings = [];
    },
  },
});

export const {
  addUserName,
  addUserTeam,
  addUserPermissions,
  addUserSettings,
  addUserNewSettings,
  resetUser,
} = addUserSlice.actions;

export default addUserSlice.reducer;
