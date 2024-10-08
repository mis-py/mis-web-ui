import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  permissions: {},
  members: [],
  variables: {},
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeamId: (state, action) => {
      state.id = action.payload;
    },
    addTeamName: (state, action) => {
      state.name = action.payload;
    },
    addTeamPermissions: (state, action) => {
      const { id, value } = action.payload;
      state.permissions[id] = value;
    },
    addTeamVariables: (state, action) => {
      const { id, value } = action.payload;
      state.variables[id] = value;
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
      state.id = 0;
      state.name = "";
      state.permissions = [];
      state.members = [];
      state.settings = [];
    },
  },
});

export const {
  addTeamId,
  addTeamName,
  addTeamPermissions,
  addTeamMembers,
  deleteTeamMembers,
  resetTeam,
  setTeamMembers,
  addTeamVariables
} = teamSlice.actions;

export default teamSlice.reducer;
