import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/variables";

export const appsApi = createApi({
  reducerPath: "appsApi",
  tagTypes: ["Apps"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getApps: build.query({
      query: () => ({
        url: `/modules/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Apps", id })),
              { type: "Apps", id: "LIST" },
            ]
          : [{ type: "Apps", id: "LIST" }],
    }),
    cloneApp: build.mutation({
      query: (body) => ({
        url: "/modules/install",
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Apps", id: "LIST" }],
    }),
    cloneAppName: build.mutation({
      query: ({ name, ...rest }) => ({
        url: `/modules/install/${name}`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: rest,
      }),
      invalidatesTags: [{ type: "Apps", id: "LIST" }],
    }),
  }),
});

export const { useGetAppsQuery, useCloneAppMutation, useCloneAppNameMutation } =
  appsApi;
