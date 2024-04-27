import {
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'
import { misAPI } from "./misAPI";

export const modulesApi = misAPI.injectEndpoints({
  endpoints: (build) => ({
    getModules: build.query({
      query: (params = {}) => {
        let { module_id = null } = params;
        return {
          url: "/modules",
          method: "GET",
          headers: {
            accept: "application/json"
          },
          params: { module_id }
        }
      },
      providesTags: (result) => [{ type: "Modules", id: "LIST" }],
      transformResponse: result => result.items,
    }),
    initModule: build.mutation({
      query: (params ={}) => {
        let { module_id } = params;
        return {
          url: "/modules/init",
          method: "POST",
          params: { module_id }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    shutdownModule: build.mutation({
      query: (params = {}) => {
        let { module_id } = params;
        return {
          url: "/modules/shutdown",
          method: "POST",
          params: { module_id }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    startModule: build.mutation({
      query: (params = {}) => {
        let { module_id } = params;
        return {
          url: "/modules/start",
          method: "POST",
          params: { module_id }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
    stopModule: build.mutation({
      query: (params = {}) => {
        let { module_id } = params;
        return {
          url: "/modules/stop",
          method: "POST",
          params: { module_id }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Modules", id }],
    }),
  }),
});


export const selectFirstSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items) => {
      const [first] = items ?? [];
      return first ?? emptyArray
    }
  ) 
}


export const filterModulesByStringSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items, val) => val.toLowerCase().trim(),
    (items, val) => items?.filter(module => module.name.toLowerCase().includes(val)) ?? emptyArray
  ) 
}

export const {
  useGetModulesQuery,
  useInitModuleMutation,
  useShutdownModuleMutation,
  useStartModuleMutation,
  useStopModuleMutation,
} = modulesApi;
