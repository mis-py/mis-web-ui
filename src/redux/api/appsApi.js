import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const appsApi = createApi({
  reducerPath: "appsApi",
  tagTypes: ["Apps"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getApps: build.query({
      query: () => ({
        url: `/modules/`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Apps", id })),
              { type: "Apps", id: "LIST" },
            ]
          : [{ type: "Apps", id: "LIST" }],
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
    cloneApp: build.mutation({
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
    cloneAppName: build.mutation({
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
  }),
});

export const { 
  useGetAppsQuery,
  useGetAppByIdQuery,
  useCloneAppMutation, 
  useCloneAppNameMutation 
} = appsApi;
