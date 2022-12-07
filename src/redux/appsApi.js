import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appsApi = createApi({
  reducerPath: "appsApi",
  tagTypes: ["Apps"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getApps: build.query({
      query: () => `/modules/`,
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
