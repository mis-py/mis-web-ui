import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/variables";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  tagTypes: ["Modules"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getModules: build.query({
      query: () => ({
        url: `/modules/`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
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
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    startApp: build.mutation({
      query: (id) => ({
        url: `/modules/${id}/start`,
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
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
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
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
