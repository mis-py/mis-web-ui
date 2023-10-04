import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  objects: [],
  members: [],
  app: null
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroupData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.objects = action.payload.allowed_objects;
      state.members = action.payload.users;
      state.app = action.payload.app;
    },
    setGroupName: (state, action) => {
      state.name = action.payload;
    },
    setGroupMembers: (state, action) => {
      state.members = action.payload;
    },
    setGroupObjects: (state, action) => {
      state.objects = action.payload;
    },
    deleteGroupMembers: (state, action) => {
      let myIndex = state.members.indexOf(action.payload);
      if (myIndex !== -1) {
        state.members.splice(myIndex, 1);
      }
    },
    resetGroup: (state) => {
      state.id = 0;
      state.name = "";
      state.objects = [];
      state.members = [];
      state.app = null;
    },
  },
});

export const {
  addGroupData,
  setGroupName,
  setGroupMembers,
  setGroupObjects,
  deleteGroupMembers,
  resetGroup,
} = groupSlice.actions;

export default groupSlice.reducer;
