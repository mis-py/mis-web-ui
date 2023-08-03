import { configureStore, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

//api
import { usersApi } from "./api/usersApi";
import { teamsApi } from "./api/teamsApi";
import { permissionsApi } from "./api/permissionsApi";
import { appsApi } from "./api/appsApi";
import { groupsApi } from "./api/groupsApi";
import { modulesApi } from "./api/modulesApi";
import { settingsApi } from "./api/settingsApi";
import { logsApi } from "./api/logsApi";

//modules
import { webcatApi } from "./api/modulesApi/webcatApi";
import { consumersApi } from "./api/modulesApi/consumersApi";
import { tasksApi } from "./api/modulesApi/tasksApi";
import { timerApi } from "./api/modulesApi/timerApi";
import { statabotApi } from "./api/modulesApi/statabotApi";
import { autoAdminApi } from "./api/modulesApi/autoAdminApi";

//slices
import { authReducer } from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import teamSlice from "./slices/teamSlice";
import editTeamPermissionsSlice from "./slices/editTeamPermissionsSlice";
import editTeamMembersSlice from "./slices/editTeamMembersSlice";
import membersSlice from "./slices/membersSlice";
import { startLoading, stopLoading } from './slices/loadingSlice';
import loadingReducer from './slices/loadingSlice';

const mutationLoadingMiddleware = ({ dispatch }) => next => action => {
    if (~action.type.indexOf("executeMutation")) {
        if (isPending(action)) {
            dispatch(startLoading());
        }

        if (isFulfilled(action) || isRejected(action)) {
            // setTimeout(() => {
                dispatch(stopLoading());
            // }, 1000);
        }
    }

    next(action);
};

export const store = configureStore({
  reducer: {
    //api
    [usersApi.reducerPath]: usersApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [logsApi.reducerPath]: logsApi.reducer,

    //modules
    [webcatApi.reducerPath]: webcatApi.reducer,
    [consumersApi.reducerPath]: consumersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [timerApi.reducerPath]: timerApi.reducer,
    [statabotApi.reducerPath]: statabotApi.reducer,
    [autoAdminApi.reducerPath]: autoAdminApi.reducer,

    //slices
    auth: authReducer,
    user: userSlice,
    team: teamSlice,
    editTeamPermissions: editTeamPermissionsSlice,
    editTeamMembers: editTeamMembersSlice,
    membersList: membersSlice,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({}).concat([
      //api
      usersApi.middleware,
      teamsApi.middleware,
      permissionsApi.middleware,
      appsApi.middleware,
      groupsApi.middleware,
      modulesApi.middleware,
      settingsApi.middleware,
      logsApi.middleware,

      //modules
      webcatApi.middleware,
      consumersApi.middleware,
      tasksApi.middleware,
      timerApi.middleware,
      statabotApi.middleware,
      autoAdminApi.middleware,

      mutationLoadingMiddleware,
    ]),
});
