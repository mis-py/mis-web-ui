import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: [],
};

export const editTeamPermissionsSlice = createSlice({
  name: "editUserPermissions",
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
  editTeamPermissionsSlice.actions;

export default editTeamPermissionsSlice.reducer;
