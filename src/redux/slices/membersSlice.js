import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
};

export const membersSlice = createSlice({
  name: "members",
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
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    deleteMembersAll: (state) => {
      state.members = [];
    },
  },
});

export const { addMembers, deleteMembers, deleteMembersAll, setMembers } =
  membersSlice.actions;

export default membersSlice.reducer;
