import { misAPI } from "./misAPI";
import {
    createEntityAdapter,
    createSelector
  } from '@reduxjs/toolkit';

export const tasksApi = misAPI.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query({
            query: ({ task_id=null } = {}) => {
                return {
                url: "/tasks",
                method: "GET",
                params: { task_id }
            }},
            providesTags: ["Tasks"],
        }),
    }),
});

export const selectFirstTaskSelector = () => {
    const emptyArray = [];
    return createSelector(
      items => items.data,
      (items) => {
        const [first] = items ?? [];
        return first ?? emptyArray
      }
    ) 
  }


export const filterTasksByStringSelector = () => {
    const emptyArray = [];
    return createSelector(
      items => items.data,
      (items, val) => val.toLowerCase().trim(),
      (items, val) => items?.filter(task => task.id.toLowerCase().includes(val) || task.name.toLowerCase().includes(val)) ?? emptyArray
    ) 
}

export const {
    useGetTasksQuery,
} = tasksApi;
