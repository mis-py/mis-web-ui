import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/variables";

export const webcatApi = createApi({
  reducerPath: "webcatApi",
  tagTypes: ["Webcat"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getWebcat: build.query({
      query: (data) => ({
        url: `/webcat/${data}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      providesTags: (result, error, id) => [{ type: "Webcat", id }],
    }),
    getWebcatId: build.query({
      query: (id) => ({
        url: `/webcat/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      providesTags: (result, error, id) => [{ type: "Webcat", id }],
    }),
    updateThumbnails: build.mutation({
      query: () => ({
        url: "/webcat/update_thumbnails",
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      invalidatesTags: [{ type: "Webcat", id: "LIST" }],
    }),
    updateThumbnailsId: build.mutation({
      query: (id) => ({
        url: `/webcat/${id}/update_thumbnail`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      invalidatesTags: [{ type: "Webcat", id: "LIST" }],
    }),
  }),
});

export const {
  useGetWebcatQuery,
  useGetWebcatIdQuery,
  useUpdateThumbnailsMutation,
  useUpdateThumbnailsIdMutation,
} = webcatApi;
