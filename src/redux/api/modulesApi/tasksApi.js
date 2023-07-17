import { createApi } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    tagTypes: ["Tasks"],
    baseQuery: rtkDefaultQuery,
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({
                url: `/tasks/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Tasks", id }],
        }),
        getTasksJobs: build.query({
            query: () => ({
                url: `/tasks/jobs`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Tasks", id }],
        }),
        tasksPause: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/pause`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }],  
        }),
        tasksResume: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/resume`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }], 
        }),
        tasksReschedule: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/reschedule`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }], 
        }),
        tasksJobsAdd: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/add-job`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }], 
        }),
    }),

});

export const {
    useGetTasksQuery,
    useTasksPauseMutation,
    useTasksResumeMutation,
    useTasksRescheduleMutation,
    useGetTasksJobsQuery,
    useTasksJobsAddMutation,
} = tasksApi;
