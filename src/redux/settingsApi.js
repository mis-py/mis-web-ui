import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  tagTypes: ["Settings"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getSettingsAppId: build.query({
      query: (id) => ({
        url: `/settings/app/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Settings", id })),
                { type: "Settings", id: "LIST" },
              ]
            : [{ type: "Settings", id: "LIST" }],
      }),
    }),
  }),
});

export const { useGetSettingsAppIdQuery } = settingsApi;
