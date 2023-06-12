import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  tagTypes: ["Permissions"],
  baseQuery: rtkDefaultQuery,
  endpoints: (build) => ({
    getPermissions: build.query({
      query: () => ({
        url: `/permissions/`,
        method: "GET",
        headers: {
          accept: "application/json"
        },
      }),
      providesTags: ["Permissions"],
    }),
    getPermissionsUserId: build.query({
      query: (id) => ({
        url: `/permissions/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Permissions", id }],
    }),
    getPermissionsTeamId: build.query({
      query: (id) => ({
        url: `/permissions/team/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Permissions", id }],
    }),
    editUserPermission: build.mutation({
      query: ({ id, rest }) => ({
        url: `/permissions/user/${id}`,
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json"
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Permissions", id }],
    }),
    editTeamPermission: build.mutation({
      query: ({ id, rest }) => ({
        url: `/permissions/team/${id}`,
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json"
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Permissions", id }],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionsUserIdQuery,
  useEditUserPermissionMutation,
  useGetPermissionsTeamIdQuery,
  useEditTeamPermissionMutation,
} = permissionsApi;
