import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/usersApi";
import { teamsApi } from "./api/teamsApi";
import { permissionsApi } from "./api/permissionsApi";
import { appsApi } from "./api/appsApi";
import { groupsApi } from "./api/groupsApi";
import { modulesApi } from "./api/modulesApi";
import { settingsApi } from "./api/settingsApi";

//modules
// import { webcatApi } from "./webcatApi";
// import { firewallApi } from "./firewallApi";

import addUserSlice from "./slices/addUserSlice";
import addTeamSlice from "./slices/addTeamSlice";
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
    [appsApi.reducerPath]: appsApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,

    //modules
    // [webcatApi.reducerPath]: webcatApi.reducer,
    // [firewallApi.reducerPath]: firewallApi.reducer,

    addUser: addUserSlice,
    addTeam: addTeamSlice,
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
      appsApi.middleware,
      groupsApi.middleware,
      modulesApi.middleware,
      settingsApi.middleware,

      //modules
      // webcatApi.middleware,
      // firewallApi.middleware,
    ]),
});
