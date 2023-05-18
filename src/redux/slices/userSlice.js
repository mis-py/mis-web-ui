import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  team: null,
  position: "",
  permissions: [],
  settings: [],
  settingsLoaded: false,
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
      state.settings = state.settings.map((setting) => {
        if (setting.setting_id === action.payload.setting_id) {
          state.settingsLoaded = true;
          return { ...setting, new_value: action.payload.new_value };
        }
        return setting;
      });

      if (!state.settingsLoaded) {
        state.settings = [...state.settings, action.payload];
      }
      state.settingsLoaded = false;
    },
    resetUser: (state) => {
      state.username = "";
      state.password = "";
      state.team = null;
      state.position = "";
      state.permissions = [];
      state.settings = [];
      state.settingsLoaded = false;
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
