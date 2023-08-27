import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => {
        let url = `/users/`;
        let queryParams = [];

        if (params !== undefined) {
          if (params.team_id !== undefined && params.team_id !== null) {
            queryParams.push(`team_id=${params.team_id}`);
          }
        }

        if (queryParams.length) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users", id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
      keepUnusedDataFor: 0.1,
    }),
    getUserId: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Users", id }],
      keepUnusedDataFor: 0.1,
    }),
    getMe: build.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Users" }],
      keepUnusedDataFor: 0.1,
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
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }, { type: "Users", id: "LIST" }],
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
    saveUserPhoto: build.mutation({
      query: ({ userId, formData }) => {
        return {
          url: `/users/${userId}/photo`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Users", id: "LIST" }, { type: "Users", id }],
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
    userResetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/change_password",
        method: "POST",
        body: data,
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
  useSaveUserPhotoMutation,
  useUserLogoutMutation,
  useUserResetPasswordMutation
} = usersApi;
