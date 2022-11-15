import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { teamsApi } from "./teamsApi";
import { permissionsApi } from "./permissionsApi";
import { appsApi } from "./appsApi";

import addUserPermissionsSlice from "./slices/addUserPermissionsSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,

    addUserPermissions: addUserPermissionsSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({}).concat([
      usersApi.middleware,
      teamsApi.middleware,
      permissionsApi.middleware,
      appsApi.middleware,
    ]),
});
