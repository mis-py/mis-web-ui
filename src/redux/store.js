import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { teamsApi } from "./teamsApi";
import { permissionsApi } from "./permissionsApi";
import { webcatApi } from "./webcatApi";
import { appsApi } from "./appsApi";
import { groupsApi } from "./groupsApi";

import addUserPermissionsSlice from "./slices/addUserPermissionsSlice";
import addTeamMembersSlice from "./slices/addTeamMembersSlice";
import addTeamPermissionsSlice from "./slices/addTeamPermissionsSlice";
import editTeamPermissionsSlice from "./slices/editTeamPermissionsSlice";
import editTeamMembersSlice from "./slices/editTeamMembersSlice";
import addMembersSlice from "./slices/addMembersSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [webcatApi.reducerPath]: webcatApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,

    addUserPermissions: addUserPermissionsSlice,
    addTeamMembers: addTeamMembersSlice,
    addTeamPermissions: addTeamPermissionsSlice,
    editTeamPermissions: editTeamPermissionsSlice,
    editTeamMembers: editTeamMembersSlice,
    addMembers: addMembersSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({}).concat([
      usersApi.middleware,
      teamsApi.middleware,
      permissionsApi.middleware,
      webcatApi.middleware,
      appsApi.middleware,
      groupsApi.middleware,
    ]),
});
