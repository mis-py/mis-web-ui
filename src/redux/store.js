import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { teamsApi } from "./teamsApi";
import { permissionsApi } from "./permissionsApi";
import { webcatApi } from "./webcatApi";
import { appsApi } from "./appsApi";
import { groupsApi } from "./groupsApi";
import { firewallApi } from "./firewallApi";
import { modulesApi } from "./modulesApi";
import { settingsApi } from "./settingsApi";

import addUserPermissionsSlice from "./slices/addUserPermissionsSlice";
import addTeamMembersSlice from "./slices/addTeamMembersSlice";
import addTeamPermissionsSlice from "./slices/addTeamPermissionsSlice";
import editTeamPermissionsSlice from "./slices/editTeamPermissionsSlice";
import editTeamMembersSlice from "./slices/editTeamMembersSlice";
import membersSlice from "./slices/membersSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [webcatApi.reducerPath]: webcatApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [firewallApi.reducerPath]: firewallApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,

    addUserPermissions: addUserPermissionsSlice,
    addTeamMembers: addTeamMembersSlice,
    addTeamPermissions: addTeamPermissionsSlice,
    editTeamPermissions: editTeamPermissionsSlice,
    editTeamMembers: editTeamMembersSlice,
    membersList: membersSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({}).concat([
      usersApi.middleware,
      teamsApi.middleware,
      permissionsApi.middleware,
      webcatApi.middleware,
      appsApi.middleware,
      groupsApi.middleware,
      firewallApi.middleware,
      modulesApi.middleware,
      settingsApi.middleware,
    ]),
});
