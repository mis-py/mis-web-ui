import { misAPI } from "./misAPI";
import {
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';

export const permissionsApi = misAPI.injectEndpoints({
  endpoints: (build) => ({
    getPermissions: build.query({
      query: (params = {}) => {
        let { page = 1, size = 50 } = params;

        return {
          url: "/permissions",
          method: "GET",
          params: { page, size }
        }
      },
      providesTags: (result, error, id) => [{ type: "Permissions", id }],
      transformResponse: response => response.items
      // transformResponse: (response) => {
      //   let newResponse = response.reduce((acc, item) => {
      //     return {[item.id]: item, ...acc}
      //   }, {});
        
      //   return { entities: newResponse, allIds:Object.keys(newResponse) }
      // }
    }),

    getUserPermissions: build.query({
      query: (params) => {
        let { user_id } = params;
        return {
          url: "/permissions/get/user",
          method: "GET",
          params: { user_id }
        }
      },
      providesTags: (result, error, id) => [{ type: "Permissions", id }],      
      // transformResponse: (response) => {
      //   let newResponse = response.reduce((acc, item) => {
      //     return {[item.permission.id]: item, ...acc}
      //   }, {});

      //   return { entities: newResponse, allIds:Object.keys(newResponse) }
      // }
      transformResponse: response => response.items,
    }),

    editUserPermission: build.mutation({
      query: (params) => {
        let { user_id, scopesList } = params;
        return {
          url: "/permissions/edit/user",
          method: "PUT",
          credentials: "include",
          params: { user_id },
          body: scopesList,
      }},
      invalidatesTags: (result, error, { id }) => [{ type: "Permissions", id }],
    }),

    getMyPermissions: build.query({
      query: () => {
        return {
          url: "/permissions/my",
          method: "GET",
        }
      },
      providesTags: () => [{ type: "Permissions" }],
      transformResponse: response => response.items,
      // transformResponse: (response)=> {
      //   let newResponse = response.items.reduce((acc, item) => {
      //     return {[item.id]: item, ...acc}
      //   }, {});

      //   return { entities: newResponse, allIds:Object.keys(newResponse) }
      // }
    }),
    // response.reduce((acc, curr) => {
    //   acc[curr.id] = curr
    //   return acc
    // }, {})
    getTeamPermissions: build.query({
      query: (params) => {
        let { team_id } = params;
        return {
          url: "/permissions/get/team",
          method: "GET",
          params: { team_id }
        }
      },
      providesTags: (result, error, id) => [{ type: "Permissions", id }],
      transformResponse: response => response.items,
      // transformResponse: (response) => {
      //   let newResponse = response.reduce((acc, item) => {
      //     return { [item.permission.id]: item, ...acc };
      //   }, {});
  
      //   return { entities: newResponse, allIds: Object.keys(newResponse) };
      // },
    }),
    
    editTeamPermissions: build.mutation({
      query: (params) => {
        let { team_id, scopesList } = params;
        return {
          url: "/permissions/edit/team",
          method: "PUT",
          params: { team_id },
          body: scopesList,
        }
      },
      invalidatesTags: (result, error, { teamId }) => [{ type: "Permissions", id: teamId }],
    }),
  }),
});

export const filterHasCoreSudoSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items) => items?.filter(item => item.permission.scope === 'core:sudo') ?? emptyArray
    
  ) 
}

export const {
  useGetPermissionsQuery,
  useGetUserPermissionsQuery,
  useEditUserPermissionMutation,
  useGetMyPermissionsQuery,
  useGetTeamPermissionsQuery,
  useEditTeamPermissionsMutation,
} = permissionsApi;
