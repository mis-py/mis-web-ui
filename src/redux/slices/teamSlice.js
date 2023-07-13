import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  permissions: [],
  members: [],
};

export const teamSlice = createSlice({
  name: "team",
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
    setTeamMembers: (state, action) => {
      state.members = action.payload;
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
  setTeamMembers,
} = teamSlice.actions;

export default teamSlice.reducer;
