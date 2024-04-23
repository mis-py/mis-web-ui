import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  tagTypes: ["Groups"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({

    getGroups: build.query({
      query: (params = {}) => {
        let { app_id, skip = 0, limit=100 } = params;

        return {
          url: "/groups",
          method: "GET",
          headers: {
            accept: "application/json",
          },
          params: { app_id: app_id, skip: skip, limit: limit }
        };
      },
      providesTags: (result, error, id) => [{ type: "Groups", id }],
    }),

    addGroup: build.mutation({
      query: (params) =>{
        let { name, user_ids } = params;
        return {
          url: "/groups/add",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: {
            name: name,
            user_ids: user_ids
          }
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Groups", id }],
    }),

    getGroup: build.query({
      query: (params) => {
        let { group_id } = params;
        return {
          url: "/groups/get",
          method: "GET",
          headers: {
          accept: "application/json",
        },
        params: { group_id: group_id }
      }},
      providesTags: (result, error, id) => [{ type: "Groups", id }],
    }),

    editGroup: build.mutation({
      query: (params) => {
        let { group_id, name, user_ids } = params;

        return {
          url: "/groups/$edit",
          method: "PUT",
          headers: {
            accept: "application/json",
          },
          params: { group_id: group_id },
          body: {
            name: name,
            user_ids: user_ids
          }
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Groups", id }],
    }),

    removeGroup: build.mutation({
      query: (params) => {
        let { group_id } = params;
        return {
          url: "/groups/remove",
          method: "DELETE",
          headers: {
            accept: "application/json",
          },
          params: { group_id: group_id }
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Groups", id }],
    }),

    // getGroupIdUsers: build.query({
    //   query: (id) => ({
    //     url: `/groups/${id}/users`,
    //     method: "GET",
    //     headers: {
    //       accept: "application/json",
    //     },
    //   }),
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: "Groups", id })),
    //           { type: "Groups", id: "LIST" },
    //         ]
    //       : [{ type: "Groups", id: "LIST" }],
    //   keepUnusedDataFor: 0.1,
    // }),
    // editGroupMembers: build.mutation({
    //   query: ({id, ...rest}) => ({
    //     url: `/groups/${id}/users`,
    //     method: "PUT",
    //     headers: {
    //       accept: "application/json",
    //     },
    //     body: rest,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    // }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  // useGetGroupIdUsersQuery,
  useAddGroupMutation,
  useEditGroupMutation,
  // useEditGroupMembersMutation,
  useRemoveGroupMutation,
} = groupsApi;
