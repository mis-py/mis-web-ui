import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  tagTypes: ["Groups"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getGroups: build.query({
      query: () => ({
        url: `/groups/`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Groups", id })),
              { type: "Groups", id: "LIST" },
            ]
          : [{ type: "Groups", id: "LIST" }],
    }),
    addGroup: build.mutation({
      query: (body) => ({
        url: "/groups/create",
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Groups", id: "LIST" }],
    }),
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      invalidatesTags: [{ type: "Groups", id: "LIST" }],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useAddGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
