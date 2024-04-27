import { misAPI } from "./misAPI";
import {
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'

export const usersApi = misAPI.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params = {}) => {
        let { team_id, page = 1, size=50 } = params;
        return {
          url: "/users",
          method: "GET",
          params: { team_id, page, size }
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
      transformResponse: response => response.items
      // transformResponse: (response)=> {
        // let newResponse = response.items.reduce((acc, item) => {
        //   return {[item.id]: item, ...acc}
        // }, {});

        // return { entities: newResponse, allIds:Object.keys(newResponse) }
      // }
    }),

    getUserMy: build.query({
      query: () => {
        return {
          url: "/users/my",
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    editUserMy: build.mutation({
      query: (params) => {
        let { username } = params;
        return {
          url: "/users/my",
          method: "PUT",
          body: { username }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    addUser: build.mutation({
      query: (params) => {
        let { username, password, team_id, settings, position, permissions } = params;
        return {
          url: "/users/add",
          method: "POST",
          body: {
            username,
            password,
            team_id,
            settings,
            position,
            permissions,
          }
        }
      },
      providesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    getUser: build.query({
      query: (params) => {
        let { user_id } = params;
        return {
          url: "/users/get",
          method: "GET",
          params: { user_id }
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    editUser: build.mutation({
      query: (params) => {
        let { user_id, username, team_id, new_password, disabled, position } = params;
        return {
          url: "/users/edit",
          method: "PUT",
          params: { user_id },
          body: {
            username,
            team_id,
            new_password,
            disabled,
            position
          }
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    removeUser: build.mutation({
      query: (params) => {
        let { user_id } = params;
        return {
          url: "/users/remove",
          method: "DELETE",
          params: { user_id }
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    // saveUserPhoto: build.mutation({
    //   query: ({ userId, formData }) => {
    //     return {
    //       url: `/users/${userId}/photo`,
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: (result, error, id) => [{ type: "Users", id: "LIST" }, { type: "Users", id }],
    // }),
    // userLogout: build.mutation({
    //   query: () => ({
    //     url: "/auth/logout",
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),
    // userResetPassword: build.mutation({
    //   query: (data) => ({
    //     url: "/auth/change_password",
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),
  }),
});

// Initial selector
// export const selectUsersResult = usersApi.endpoints.getUsers.select();

// const emptyUsers = [];

// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   usersResult => {
//     console.log(usersResult);
//     return usersResult?.items ?? emptyUsers;
//   }
// )

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state, userId) => userId,
//   (users, userId) => users.find(user => user.id === userId)
// )

export const filterUsersByStringSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items, val) => val.toLowerCase().trim(),
    (items, val) => items?.filter(user => user.username.toLowerCase().includes(val)) ?? emptyArray
  ) 
}

export const {
  useGetUsersQuery,
  useGetUserMyQuery,
  useEditUserMyMutation,
  useAddUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useRemoveUserMutation,
  // useSaveUserPhotoMutation,
  // useUserLogoutMutation,
  // useUserResetPasswordMutation
} = usersApi;
