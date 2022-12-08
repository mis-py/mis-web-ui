import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  membersGroup: [],
};

export const addMembersSlice = createSlice({
  name: "addMembers",
  initialState,
  reducers: {
    addMembersGroup: (state, action) => {
      state.membersGroup.push(action.payload);
    },
    deleteMembersGroup: (state, action) => {
      let myIndex = state.membersGroup.indexOf(action.payload);
      if (myIndex !== -1) {
        state.membersGroup.splice(myIndex, 1);
      }
    },
    deleteMembersGroupAll: (state) => {
      state.membersGroup = [];
    },
  },
});

export const { addMembersGroup, deleteMembersGroup, deleteMembersGroupAll } =
  addMembersSlice.actions;

export default addMembersSlice.reducer;
