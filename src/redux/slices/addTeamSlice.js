import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  permissions: [],
  members: [],
};

export const addTeamSlice = createSlice({
  name: "addTeam",
  initialState,
  reducers: {
    addTeamName: (state, action) => {
      state.name = action.payload;
    },
    addTeamPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    addTeamMembers: (state, action) => {
      state.members.push(action.payload);
    },
    deleteTeamMembers: (state, action) => {
      let myIndex = state.members.indexOf(action.payload);
      if (myIndex !== -1) {
        state.members.splice(myIndex, 1);
      }
    },
    resetTeam: (state) => {
      state.name = "";
      state.permissions = [];
      state.members = [];
    },
  },
});

export const {
  addTeamName,
  addTeamPermissions,
  addTeamMembers,
  deleteTeamMembers,
  resetTeam,
} = addTeamSlice.actions;

export default addTeamSlice.reducer;
