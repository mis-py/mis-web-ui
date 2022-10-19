import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { teamsApi } from "./teamsApi";
import { appsApi } from "./appsApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({}).concat([
      usersApi.middleware,
      teamsApi.middleware,
      appsApi.middleware,
    ]),
});
