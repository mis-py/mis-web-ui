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
    }),

    getGrantedPermissions: build.query({
      query: (params) => {
        let { user_id=null, team_id=null } = params;
        return {
          url: "/permissions/granted",
          method: "GET",
          params: { user_id, team_id }
        }
      },
      providesTags: (result, error, id) => [{ type: "Permissions", id }],      
      transformResponse: response => response.items,
    }),

    editGrantedPermission: build.mutation({
      query: (params) => {
        let { user_id=null, team_id=null, scopesList } = params;
        return {
          url: "/permissions/granted",
          method: "PUT",
          params: { user_id, team_id },
          body: scopesList,
      }},
      invalidatesTags: (result, error, id ) => [{ type: "Permissions", id }],
    }),

    getMyGrantedPermissions: build.query({
      query: () => {
        return {
          url: "/permissions/granted/my",
          method: "GET",
        }
      },
      providesTags: () => [{ type: "Permissions" }],
      transformResponse: response => response.items,
    }),
  }),
});

export const filterPermissionByStringSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items, val) => val.toLowerCase().trim(),
    (items, val) => items?.filter(permission => permission.app.name.toLocaleLowerCase().includes(val) || permission.scope.toLocaleLowerCase().includes(val)) ?? emptyArray
  ) 
}



export const filterHasCoreSudoSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items) => items?.filter(item => item.permission.scope === 'core:sudo') ?? emptyArray
    
  ) 
}

export const {
  useGetPermissionsQuery,
  useGetGrantedPermissionsQuery,
  useEditGrantedPermissionMutation,
  useGetMyGrantedPermissionsQuery,
} = permissionsApi;
