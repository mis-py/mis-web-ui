import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  tagTypes: ["Modules"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getModules: build.query({
      query: () => ({
        url: `/modules/`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Modules", id })),
                { type: "Modules", id: "LIST" },
              ]
            : [{ type: "Modules", id: "LIST" }],
      }),
    }),
  }),
});

export const { useGetModulesQuery } = modulesApi;
