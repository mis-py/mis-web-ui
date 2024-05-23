import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const restrictedObjectsApi = createApi({
  reducerPath: "objectsApi",
  tagTypes: ["RestrictedObjects"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getRestrictedObjects: build.query({
      query: (params = {}) => {
        let { app_id, skip = 0, limit=100 } = params;
        return {
          url: "/restricted_objects",
          method: "GET",
          headers: {
            accept: "application/json",
          },
          params: { app_id: app_id, skip: skip, limit: limit }
        }
      },
      providesTags: (result, error, id) => [{ type: "RestrictedObjects", id }],
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return { [item.id]: item, ...acc };
        }, {});
  
        return { entities: newResponse, allIds: Object.keys(newResponse) };
      },
    }),
    // getGroupAllowedObjects: build.query({
    //   query: (id) => ({
    //     url: `/restricted_objects/${id}`,
    //     method: "GET",
    //     headers: {
    //       accept: "application/json",
    //     },
    //   }),
    //   providesTags: (result, error, id) => [{ type: "RestrictedObjects", id }],
    //   transformResponse: (response) => {
    //     let newResponse = response.reduce((acc, item) => {
    //       return { [item.id]: item, ...acc };
    //     }, {});
  
    //     return { entities: newResponse, allIds: Object.keys(newResponse) };
    //   },
    // }),
    // editGroupAllowedObjects: build.mutation({
    //   query: ({ id, rest }) => ({
    //     url: `/restricted_objects/${id}`,
    //     method: "PUT",
    //     headers: {
    //       accept: "application/json",
    //     },
    //     body: rest,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: "RestrictedObjects", id }],
    // }),
  }),
});

export const { 
  useGetRestrictedObjectsQuery,
  useGetGroupAllowedObjectsQuery,
  useEditGroupAllowedObjectsMutation
} = restrictedObjectsApi;
