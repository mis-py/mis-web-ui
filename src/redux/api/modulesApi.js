import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  tagTypes: ["Modules"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getModules: build.query({
      query: (params) => {
        // let { app_id } = params;
        // return {
        //   url: "/modules",
        //   method: "GET",
        //   headers: {
        //     accept: "application/json"
        //   },
        //   params: { app_id: app_id }
        // }
      },
      providesTags: (result) => [{ type: "Modules", id: "LIST" }],
    }),
    initModule: build.mutation({
      query: (params) => {
        // let { app_id } = params;
        // return {
        //   url: "/modules/init",
        //   method: "PUT",
        //   headers: {
        //     accept: "application/json"
        //   },
        //   params: { app_id: app_id }
        // }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    shutdownModule: build.mutation({
      query: (params) => {
        // let { app_id } = params;
        // return {
        //   url: "/modules/shutdown",
        //   method: "PUT",
        //   headers: {
        //     accept: "application/json"
        //   },
        //   params: { app_id: app_id }
        // }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    startModule: build.mutation({
      query: (params) => {
        // let { app_id } = params;
        // return {
        //   url: "/modules/start",
        //   method: "PUT",
        //   headers: {
        //     accept: "application/json"
        //   },
        //   params: { app_id: app_id }
        // }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    stopModule: build.mutation({
      query: (params) => {
        // let { app_id } = params;
        // return {
        //   url: "/modules/stop",
        //   method: "PUT",
        //   credentials: "include",
        //   headers: {
        //     accept: "application/json"
        //   },
        //   params: { app_id: app_id }
        // }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
  }),
});

export const {
  useGetModulesQuery,
  useInitModuleMutation,
  useShutdownModuleMutation,
  useStartModuleMutation,
  useStopModuleMutation,
} = modulesApi;
