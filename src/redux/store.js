import { configureStore, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

// core
import { usersApi } from "./api/usersApi";
import { teamsApi } from "./api/teamsApi";
import { permissionsApi } from "./api/permissionsApi";
//import { appsApi } from "./api/appsApi";
// import { groupsApi } from "./api/groupsApi";
// import { restrictedObjectsApi } from "./api/restrictedObjectsApi";
import { modulesApi } from "./api/modulesApi";
import { settingsApi } from "./api/variablesApi";
// import { logsApi } from "./api/logsApi";
// import { notificationsApi } from "./api/notificationsApi";
// import { consumersApi } from "./api/consumersApi";
// import { jobsApi } from "./api/jobsApi";
// import { tasksApi } from "./api/tasksApi";

// modules
// import { webcatApi } from "./api/modulesApi/webcatApi";
// import { statabotApi } from "./api/modulesApi/statabotApi";
// import { autoAdminApi } from "./api/modulesApi/autoAdminApi";
// import { binomApi } from "./api/modulesApi/binomDomainApi";
// import { proxyApi } from "./api/modulesApi/proxyApi";

//slices
import { authReducer } from "./slices/authSlice";
import { searchReducer } from './slices/searchSlice';
import { profileReducer } from "./slices/profileSlice";
import { userReducer } from "./slices/userSlice";
import teamSlice from "./slices/teamSlice";
import { startLoading, stopLoading } from './slices/loadingSlice';
import loadingReducer from './slices/loadingSlice';
import groupSlice from "./slices/groupSlice";
import appSlice from "./slices/appSlice";
import taskSlice from './slices/taskSlice';

//middleware
import Socket from 'utils/WebSocket';
import socketMiddleware from "redux/middleware/socket";

// const mutationLoadingMiddleware = (params) => next => action => {
//     const { dispatch } = params;

//     if (~action.type.indexOf("executeMutation")
//         && (action.meta.arg === undefined || action.meta.arg.endpointName.indexOf("find") === -1)
//     ) {
//         if (isPending(action)) {
//             dispatch(startLoading());
//         }

//         if (isFulfilled(action) || isRejected(action)) {
//             // setTimeout(() => {
//                 dispatch(stopLoading());
//             // }, 1000);
//         }
//     }

//     next(action);
// };

export const store = configureStore({
  reducer: {
    //api
    [usersApi.reducerPath]: usersApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    //[appsApi.reducerPath]: appsApi.reducer,
    // [groupsApi.reducerPath]: groupsApi.reducer,
    // [restrictedObjectsApi.reducerPath]: restrictedObjectsApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    // [logsApi.reducerPath]: logsApi.reducer,
    // [notificationsApi.reducerPath]: notificationsApi.reducer,
    // [tasksApi.reducerPath]: tasksApi.reducer,
    // [jobsApi.reducerPath]: jobsApi.reducer,
    // [consumersApi.reducerPath]: consumersApi.reducer,

    //modules
    // [webcatApi.reducerPath]: webcatApi.reducer,
    // [statabotApi.reducerPath]: statabotApi.reducer,
    // [autoAdminApi.reducerPath]: autoAdminApi.reducer,
    // [binomApi.reducerPath]: binomApi.reducer,
    // [proxyApi.reducerPath]: proxyApi.reducer,

    //slices
    auth: authReducer,
    user: userReducer,
    team: teamSlice,
    group: groupSlice,
    loading: loadingReducer,
    search: searchReducer,
    profile: profileReducer,
    app: appSlice,
    task: taskSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({}).concat([
      //api
      usersApi.middleware,
      teamsApi.middleware,
      permissionsApi.middleware,
      //appsApi.middleware,
      // groupsApi.middleware,
      // restrictedObjectsApi.middleware,
      modulesApi.middleware,
      settingsApi.middleware,
      // logsApi.middleware,
      // notificationsApi.middleware,
      // jobsApi.middleware,
      // tasksApi.middleware,
      // consumersApi.middleware,

      //modules
      // webcatApi.middleware,
      // statabotApi.middleware,
      // autoAdminApi.middleware,
      // binomApi.middleware,
      // proxyApi.middleware,

      //mutationLoadingMiddleware,
      //crashReporter,
      socketMiddleware(new Socket())
    ]),
});
