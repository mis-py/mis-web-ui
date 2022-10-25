import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  tagTypes: ["Permissions"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://65.21.238.213:8000" }),
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
    //   query: (body) => ({
    //     url: "/users/create",
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("my-token")}`,
    //     },
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),
    editUserPermission: build.mutation({
      query: (id, rest) => ({
        url: `/permissions/user/${id}`,
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Permissions", id }],
    }),
    // deleteUser: build.mutation({
    //   query: (id) => ({
    //     url: `/users/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       accept: "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("my-token")}`,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionsUserIdQuery,
  useEditUserPermissionMutation,
} = permissionsApi;
