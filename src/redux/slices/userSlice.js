import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  team: null,
  position: "",
  permissions: {},
  settings: {},
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
    setUserPermission: (state, action) => {
      const { id, checked } = action.payload;
      state.permissions[id] = checked;
    },
    setUserSetting: (state, action) => {
      const { id, value } = action.payload;
      state.settings[id] = value;
    },
    resetUser: (state) => {
      state.username = "";
      state.password = "";
      state.team = null;
      state.position = "";
      state.permissions = {};
      state.settings = {};
    }
  },
});

export const {
  addUserName,
  addUserPassword,
  addUserTeam,
  addUserPosition,
  setUserPermission,
  setUserSetting,
  resetUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectMyArray = (state) => state.userSlice.settings;
export const selectInputById = (id) => (state) => {
  const item = state.userSlice.settings.find((obj) => obj.id === id);
  return item ? item.value : "";
};
