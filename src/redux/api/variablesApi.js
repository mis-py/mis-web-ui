import { misAPI } from "./misAPI";
import {
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';

export const settingsApi = misAPI.injectEndpoints({
  endpoints: (build) => ({

    getGlobalVariables: build.query({
      query: (params = {}) => {
        let { module_id = null, page=1, size=50 } = params;

        return {
          url: "/variables/",
          method: "GET",
          params: { module_id, page, size }
        }},
      providesTags: (result) => [{ type: "Variables" }],
      transformResponse: response => response.items
    }),

    getLocalVariables: build.query({
      query: (params = {}) => {
        let { team_id = null, user_id = null, page=1, size=50 } = params;
        return {
          url: "/variables/values",
          method: "GET",
          params: { team_id, user_id, page, size }
        }
      },
      providesTags: (result) => [{ type: "Variables" }],
      transformResponse: response => response.items
    }),
  
    getMyVariables: build.query({
      query: (params) => {
        let { page=1, size=50 } = params;
        return {
          url: "/variables/my",
          method: "GET",
          params: { page, size }
        }
      },
      providesTags: (result) => [{ type: "Variables" }],
      transformResponse: response => response.items
    }),
  
    editGlobalVariables: build.mutation({
      query: (params) => {
        let { module_id, variables } = params;
        return {
          url: "/variables/",
          method: "PUT",
          params: { module_id },
          body: variables,
        }
      },
      invalidatesTags: [{ type: "Variables" }],
    }),
  
    editLocalVariables: build.mutation({
      query: (params) => {
        let { team_id=null, user_id=null, variables } = params;
        return {
          url: "/variables/values",
          method: "PUT",
          params: { team_id, user_id },
          body: variables,
        }
      },
      invalidatesTags: [{ type: "Variables" }],
    }),
  
    editMyVariables: build.mutation({
      query: (params) => {
        let { variables } = params;
        return {
          url: "/variables/my",
          method: "PUT",
          body: variables,
        }
      },
      invalidatesTags: [{ type: "Variables" }],
    }),
  }),
});

export const filterVariableByStringSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items, val) => val.toLowerCase().trim(),
    (items, val) => items?.filter(variable => variable.key.toLowerCase().includes(val)) ?? emptyArray
  ) 
}

export const {
  useGetGlobalVariablesQuery,
  useGetLocalVariablesQuery,
  useGetMyVariablesQuery,
  useEditGlobalVariablesMutation,
  useEditLocalVariablesMutation,
  useEditMyVariablesMutation,
} = settingsApi;
