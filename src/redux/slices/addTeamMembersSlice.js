import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
};

export const addTeamMembersSlice = createSlice({
  name: "addUserPermissions",
  initialState,
  reducers: {
    addMembers: (state, action) => {
      state.members.push(action.payload);
    },
    deleteMembers: (state, action) => {
      let myIndex = state.members.indexOf(action.payload);
      if (myIndex !== -1) {
        state.members.splice(myIndex, 1);
      }
    },
  },
});

export const { addMembers, deleteMembers } = addTeamMembersSlice.actions;

export default addTeamMembersSlice.reducer;