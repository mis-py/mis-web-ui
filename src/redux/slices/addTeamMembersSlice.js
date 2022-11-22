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
  },
});

export const { addMembers } = addTeamMembersSlice.actions;

export default addTeamMembersSlice.reducer;
