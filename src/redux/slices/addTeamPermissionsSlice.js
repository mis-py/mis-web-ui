import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: [],
};

export const addTeamPermissionsSlice = createSlice({
  name: "addUserPermissions",
  initialState,
  reducers: {
    addPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    deletePermissions: (state) => {
      state.permissions = [];
    },
  },
});

export const { addPermissions, deletePermissions } =
  addTeamPermissionsSlice.actions;

export default addTeamPermissionsSlice.reducer;
