import { createApi } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const appsApi = createApi({
  reducerPath: "appsApi",
  tagTypes: ["Apps"],
  baseQuery: rtkDefaultQuery,
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
  useCloneAppMutation, 
  useCloneAppNameMutation 
} = appsApi;
