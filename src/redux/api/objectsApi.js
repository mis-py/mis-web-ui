import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const objectsApi = createApi({
  reducerPath: "objectsApi",
  tagTypes: ["RestrictedObjects"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getRestrictedObjects: build.query({
      query: () => ({
        url: `/restricted_objects/`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      // providesTags: (result, error, id) => [{ type: "RestrictedObjects", id }],
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return { [item.id]: item, ...acc };
        }, {});
  
        return { entities: newResponse, allIds: Object.keys(newResponse) };
      },
    }),
    getGroupAllowedObjects: build.query({
      query: (id) => ({
        url: `/restricted_objects/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result, error, id) => [{ type: "RestrictedObjects", id }],
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return { [item.id]: item, ...acc };
        }, {});
  
        return { entities: newResponse, allIds: Object.keys(newResponse) };
      },
    }),
    editGroupAllowedObjects: build.mutation({
      query: ({ id, rest }) => ({
        url: `/restricted_objects/${id}`,
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "RestrictedObjects", id }],
    }),
  }),
});

export const { 
  useGetRestrictedObjectsQuery,
  useGetGroupAllowedObjectsQuery,
  useEditGroupAllowedObjectsMutation
} = objectsApi;
