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
    getGroupsObjects: build.query({
      query: () => ({
        url: `/groups/objects`,
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
    getGroupIdUsers: build.query({
      query: (id) => ({
        url: `/groups/${id}/users`,
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
    editGroupMembers: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/groups/${id}/users`,
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Teams", id }],
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
  useGetGroupsObjectsQuery,
  useGetGroupIdUsersQuery,
  useAddGroupMutation,
  useEditGroupMembersMutation,
  useDeleteGroupMutation,
} = groupsApi;
