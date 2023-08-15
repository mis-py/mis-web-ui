import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  tagTypes: ["Modules"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getModules: build.query({
      query: () => ({
        url: `/modules/`,
        method: "GET",
        headers: {
          accept: "application/json"
        },
      }),
      extraOptions: { maxRetries: 1 },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Modules", id })),
              { type: "Modules", id: "LIST" },
            ]
          : [{ type: "Modules", id: "LIST" }],
    }),
    unloadAppModules: build.mutation({
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
  useGetModulesQuery,
  useUnloadAppModulesMutation,
  useStartAppMutation,
  useStopAppMutation,
} = modulesApi;
