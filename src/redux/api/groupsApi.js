import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  tagTypes: ["Groups"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getGroups: build.query({
      query: () => ({
        url: `/groups/`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      keepUnusedDataFor: 0.1,
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
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Groups", id })),
              { type: "Groups", id: "LIST" },
            ]
          : [{ type: "Groups", id: "LIST" }],
      keepUnusedDataFor: 0.1,
    }),
    getGroupIdUsers: build.query({
      query: (id) => ({
        url: `/groups/${id}/users`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Groups", id })),
              { type: "Groups", id: "LIST" },
            ]
          : [{ type: "Groups", id: "LIST" }],
      keepUnusedDataFor: 0.1,
    }),
    getGroupIdObjects: build.query({
      query: (id) => ({
        url: `/groups/${id}/objects`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result, error, id) => [{ type: "Groups", id }],
      keepUnusedDataFor: 0.1,
    }),
    addGroup: build.mutation({
      query: (body) => ({
        url: "/groups/create",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body,
      }),
      invalidatesTags: [{ type: "Groups", id: "LIST" }],
    }),
    editGroupMembers: build.mutation({
      query: ({ id, rest }) => ({
        url: `/groups/${id}/users`,
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    }),
    editObjectsGroup: build.mutation({
      query: ({ id, rest }) => ({
        url: `/groups/${id}/objects`,
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    }),
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
        headers: {
          accept: "application/json",
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
  useGetGroupIdObjectsQuery,
  useAddGroupMutation,
  useEditGroupMembersMutation,
  useEditObjectsGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
