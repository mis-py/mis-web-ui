import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  team: {
    value: null,
    label: "",
  },
  settings: [],
  permissions: [],
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
    resetUser: (state) => {
      state.name = "";
      state.settings = [];
    },
  },
});

export const { addUserName, addUserTeam, resetUser } = addUserSlice.actions;

export default addUserSlice.reducer;
