import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  team: null,
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
    renderSettings: (state, action) => {
      state.settings = action.payload.map((item) => ({ value: "", ...item }));
    },
    addUserSettings: (state, action) => {
      const { id, value } = action.payload;
      const item = state.settings.find((obj) => obj.id === id);
      if (item) {
        item.value = value;
      }
    },
    addUserDefaultSettings: (state, action) => {
      const item = state.settings.find((obj) => obj.id === action.payload.id);
      if (item && action.payload.default_value !== null) {
        item.value = action.payload.default_value;
      }
    },
    editSettingsUser: (state, action) => {
      // console.log(action);
    },
    resetSettings: (state) => {
      state.settings = [];
    },
    resetUser: (state) => {
      state.username = "";
      state.password = "";
      state.team = null;
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
  renderSettings,
  renderEditSettings,
  addUserSettings,
  addUserDefaultSettings,
  editSettingsUser,
  resetSettings,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;

export const selectMyArray = (state) => state.userSlice.settings;
export const selectInputById = (id) => (state) => {
  const item = state.userSlice.settings.find((obj) => obj.id === id);
  return item ? item.value : "";
};
