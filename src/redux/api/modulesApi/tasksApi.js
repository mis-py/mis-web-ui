import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/variables";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    tagTypes: ["Tasks"],
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({
                url: `/tasks/`,
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, id) => [{ type: "Tasks", id }],
        }),
        tasksPause: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/pause`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }],  
        }),
        tasksResume: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/resume`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }], 
        }),
        tasksReschedule: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/reschedule`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }], 
        }),
        getTasksJobs: build.query({
            query: () => ({
                url: `/tasks/jobs`,
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, id) => [{ type: "Tasks", id }],
        }),
        tasksJobsAdd: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/add-job`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
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
