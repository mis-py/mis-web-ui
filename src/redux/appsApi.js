import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appsApi = createApi({
  reducerPath: "appsApi",
  tagTypes: ["Apps"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://65.21.238.213:8000" }),
  endpoints: (build) => ({
    getApps: build.query({
      query: () => `/apps/`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Apps", id })),
              { type: "Apps", id: "LIST" },
            ]
          : [{ type: "Apps", id: "LIST" }],
    }),
  }),
});

export const { useGetAppsQuery } = appsApi;
