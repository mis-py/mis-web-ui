import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  tagTypes: ["Modules"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getLoadedModules: build.query({
      query: () => ({
        url: `/modules/loaded_modules`,
        method: "GET",
      }),
    }),
    getAppById: build.query({
      query: (id) => ({
        url: `/modules/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
          result
              ? [
                ({ type: "Apps", id: result.id }),
                { type: "Apps", id: "LIST" },
              ]
              : [{ type: "Apps", id: "LIST" }],
    }),
    installAppByUrl: build.mutation({
      query: (body) => ({
        url: "/modules/install",
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body,
      }),
      invalidatesTags: [{ type: "Apps", id: "LIST" }],
    }),
    installAppByName: build.mutation({
      query: ({ name, ...rest }) => ({
        url: `/modules/install/${name}`,
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: rest,
      }),
      invalidatesTags: [{ type: "Apps", id: "LIST" }],
    }),
    getModules: build.query({
      query: () => ({
        url: `/modules/`,
        method: "GET",
        headers: {
          accept: "application/json"
        },
      }),
      // onQueryStarted: () => {
      //   console.log(localStorage.getItem("token"));
      // },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Modules", id })),
              { type: "Modules", id: "LIST" },
            ]
          : [{ type: "Modules", id: "LIST" }],
    }),
    loadApp: build.mutation({
      query: (id) => ({
        url: `/modules/${id}/load`,
        method: "PUT",
        headers: {
          accept: "application/json"
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    unloadApp: build.mutation({
      query: (id) => ({
        url: `/modules/${id}/unload`,
        method: "PUT",
        headers: {
          accept: "application/json"
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    startApp: build.mutation({
      query: (id) => ({
        url: `/modules/${id}/start`,
        method: "PUT",
        headers: {
          accept: "application/json"
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    stopApp: build.mutation({
      query: (id) => ({
        url: `/modules/${id}/stop`,
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json"
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
  }),
});

export const {
  useGetLoadedModulesQuery,
  useLoadAppMutation,
  useUnloadAppMutation,
  useStartAppMutation,
  useStopAppMutation,
  useGetModulesQuery,
  useGetAppByIdQuery,
  useInstallAppByUrlMutation, 
  useInstallAppByNameMutation 
} = modulesApi;
