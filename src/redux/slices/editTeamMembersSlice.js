import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
};

export const editTeamMembersSlice = createSlice({
  name: "editUserPermissions",
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
    deleteMembersAll: (state) => {
      state.members = [];
    },
  },
});

export const { addMembers, deleteMembers, deleteMembersAll } =
  editTeamMembersSlice.actions;

export default editTeamMembersSlice.reducer;
