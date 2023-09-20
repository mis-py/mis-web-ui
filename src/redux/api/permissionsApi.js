import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  tagTypes: ["Permissions"],
  baseQuery: RtkDefaultQuery,
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
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return {[item.id]: item, ...acc}
        }, {});
        
        return { entities: newResponse, allIds:Object.keys(newResponse) }
      }
    }),
    getPermissionsUserId: build.query({
      query: (id) => ({
        url: `/permissions/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Permissions", id }],      
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return {[item.permission.id]: item, ...acc}
        }, {});

        return { entities: newResponse, allIds:Object.keys(newResponse) }
      }
    }),

    getMyPermissions: build.query({
      query: () => ({
        url: "/permissions/my",
        method: "GET",
      }),
      providesTags: () => [{ type: "Permissions" }],
      transformResponse: (response)=> {
        let newResponse = response.reduce((acc, item) => {
          return {[item.id]: item, ...acc}
        }, {});

        return { entities: newResponse, allIds:Object.keys(newResponse) }
      }
    }),
    getPermissionsTeamId: build.query({
      query: (id) => ({
        url: `/permissions/team/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Permissions", id }],
    }),
    editUserPermission: build.mutation({
      // pass all permissions that must user has access
      query: ({ id, scopesList }) => ({
        url: `/permissions/user/${id}`,
        method: "PUT",
        credentials: "include",
        headers: {
        },
      }),
    }),
    
    getPermissionsTeamId: build.query({
      query: (id) => ({
        url: `/permissions/team/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Permissions", id }],
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return { [item.permission.id]: item, ...acc };
        }, {});
  
        return { entities: newResponse, allIds: Object.keys(newResponse) };
      },
    }),
    
    editUserPermission: build.mutation({
      query: ({ id, scopesList }) => ({
        url: `/permissions/user/${id}`,
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json",
        },
        body: scopesList,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Permissions", id }],
    }),
    
    editTeamPermission: build.mutation({
      query: ({ teamId, scopesList }) => ({
        url: `/permissions/team/${teamId}`,
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json",
        },
        body: scopesList,
      }),
      invalidatesTags: (result, error, { teamId }) => [{ type: "Permissions", id: teamId }],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionsUserIdQuery,
  useGetMyPermissionsQuery,
  useGetPermissionsTeamIdQuery,
  useEditUserPermissionMutation,
  useEditTeamPermissionMutation,
} = permissionsApi;
