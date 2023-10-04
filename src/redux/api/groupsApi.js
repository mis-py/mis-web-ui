import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  tagTypes: ["Groups"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getGroups: build.query({
      query: (data) => {
        let url = "/groups/";

        if (data !== undefined) {
          const args = [];

          if (data.app_id !== undefined) {
            args.push(`app_id=${data.app_id}`);
          }

          if (args.length) {
            url += '?' + args.join('&');
          }
        }

        return {
          url,
          method: "GET",
          headers: {
            accept: "application/json",
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Groups", id })),
              { type: "Groups", id: "LIST" },
            ]
          : [{ type: "Groups", id: "LIST" }],
    }),
    getGroup: build.query({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      })
    }),
    editGroup: build.mutation({
      query: ({id, ...rest}) => ({
        url: `/groups/${id}`,
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        body: rest
      }),
      invalidatesTags: [{ type: "Groups", id: "LIST" }],
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
    editGroupMembers: build.mutation({
      query: ({id, ...rest}) => ({
        url: `/groups/${id}/users`,
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useGetGroupIdUsersQuery,
  useAddGroupMutation,
  useEditGroupMutation,
  useEditGroupMembersMutation,
  useDeleteGroupMutation,
} = groupsApi;
