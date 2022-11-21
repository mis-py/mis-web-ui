import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  tagTypes: ["Permissions"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getPermissions: build.query({
      query: () => ({
        url: `/permissions/`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      providesTags: ["Permissions"],
    }),
    getPermissionsUserId: build.query({
      query: (id) => ({
        url: `/permissions/user/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      providesTags: (result, error, id) => [{ type: "Permissions", id }],
    }),
    editUserPermission: build.mutation({
      query: ({ id, rest }) => ({
        url: `/permissions/user/${id}`,
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
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
} = permissionsApi;
