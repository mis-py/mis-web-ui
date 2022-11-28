import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { teamsApi } from "./teamsApi";
import { permissionsApi } from "./permissionsApi";
import { appsApi } from "./appsApi";

import addUserPermissionsSlice from "./slices/addUserPermissionsSlice";
import addTeamMembersSlice from "./slices/addTeamMembersSlice";
import addTeamPermissionsSlice from "./slices/addTeamPermissionsSlice";
import editTeamPermissionsSlice from "./slices/editTeamPermissionsSlice";
import editTeamMembersSlice from "./slices/editTeamMembersSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,

    addUserPermissions: addUserPermissionsSlice,
    addTeamMembers: addTeamMembersSlice,
    addTeamPermissions: addTeamPermissionsSlice,
    editTeamPermissions: editTeamPermissionsSlice,
    editTeamMembers: editTeamMembersSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({}).concat([
      usersApi.middleware,
      teamsApi.middleware,
      permissionsApi.middleware,
      appsApi.middleware,
    ]),
});
