import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  team: {
    value: null,
    label: "",
  },
  position: "",
  permissions: [],
  settings: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.username = action.payload;
    },
    addUserPassword: (state, action) => {
      state.password = action.payload;
    },
    addUserTeam: (state, action) => {
      state.team = action.payload;
    },
    addUserPosition: (state, action) => {
      state.position = action.payload;
    },
    addUserPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    addUserSettings: (state, action) => {
      state.settings = action.payload;
    },
    resetUser: (state) => {
      state.username = "";
      state.password = "";
      state.team = {
        value: null,
        label: "",
      };
      state.position = "";
      state.permissions = [];
      state.settings = [];
    },
  },
});

export const {
  addUserName,
  addUserPassword,
  addUserTeam,
  addUserPosition,
  addUserPermissions,
  addUserSettings,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
