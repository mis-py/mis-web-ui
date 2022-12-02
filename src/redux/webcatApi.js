import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const webcatApi = createApi({
  reducerPath: "webcatApi",
  tagTypes: ["Webcat"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getWebcat: build.query({
      query: (geo) => ({
        url: `/webcat/${geo}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Webcat", id })),
                { type: "Webcat", id: "LIST" },
              ]
            : [{ type: "Webcat", id: "LIST" }],
      }),
    }),
  }),
});

export const { useGetWebcatQuery } = webcatApi;
