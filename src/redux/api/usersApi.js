import { createApi } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: rtkDefaultQuery,
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: `/users/`,
        method: "GET"
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users", id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUserId: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getMe: build.query({
      query: () => ({
        url: `/users/me`,
        method: "GET"
      }),
      providesTags: () => [{ type: "Users" }],
    }),
    addUser: build.mutation({
      query: (body) => ({
        url: "/users/create",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    editUser: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    userLogout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMeQuery,
  useGetUserIdQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useUserLogoutMutation,
} = usersApi;
