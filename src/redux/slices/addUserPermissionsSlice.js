import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  superUser: "",
};

export const addUserPermissionsSlice = createSlice({
  name: "addUserPermissions",
  initialState,
  reducers: {
    addSuperUser: (state, action) => {
      state.superUser = action.payload;
    },
  },
});

export const { addSuperUser } = addUserPermissionsSlice.actions;

export default addUserPermissionsSlice.reducer;
