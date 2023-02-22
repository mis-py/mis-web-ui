import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  password: "",
  team: {
    value: null,
    label: "",
  },
  permissions: [],
  settings: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.name = action.payload;
    },
    addUserPassword: (state, action) => {
      state.password = action.payload;
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
    resetUser: (state) => {
      state.name = "";
      state.password = "";
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
  addUserPassword,
  addUserTeam,
  addUserPermissions,
  addUserSettings,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
