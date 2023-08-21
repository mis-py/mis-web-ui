import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    tagTypes: ["Tasks", "Jobs"],
    baseQuery: RtkDefaultQuery,
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({
                url: `/tasks/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Tasks", id }],
        }),
        getJobs: build.query({
            query: (id) => {
                return {
                    url: `/tasks/jobs?task_id=${id}`,
                    method: "GET",
                }
            },
            providesTags: (result, error, id) => [{ type: "Tasks", id }],
        }),
        getJobById: build.query({
            query: (id) => {
                return {
                    url: `/tasks/jobs/${id}`,
                    method: "GET",
                }
            },
            providesTags: (result, error, id) => [{ type: "Jobs", id }],
        }),
        getTaskById: build.query({
            query: (id) => {
                return {
                    url: `/tasks/${id}`,
                    method: "GET",
                }
            },
            providesTags: (result, error, id) => [{ type: "Tasks", id }],
        }),
        jobsPause: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/pause`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }],  
        }),
        jobsResume: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}/resume`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }], 
        }),
        jobsReschedule: build.mutation({
            query: (data) => ({
                url: `/tasks/${data.id}/reschedule`,
                method: "POST",
                body :{
                    // interval: 0,
                    cron: data.cron
                },
            }),
            invalidatesTags: ["Tasks"], 
        }),
        tasksJobsAdd: build.mutation({
            query: (data) => {
                const body = {
                    trigger: {},
                };

                if (data.extra !== undefined) {
                    body.extra = data.extra;
                }

                if (data.cronString !== undefined) {
                    body.trigger.cron = data.cronString;
                }

                return {
                    url: `/tasks/${data.id}/add-job`,
                    method: "POST",
                    body,
                }
            },
            invalidatesTags: [{ type: "Tasks", id: "LIST" }],
        }),
    }),

});

export const {
    useGetTasksQuery,
    useJobsPauseMutation,
    useJobsResumeMutation,
    useJobsRescheduleMutation,
    useGetJobsQuery,
    useTasksJobsAddMutation,
    useGetJobByIdQuery,
    useGetTaskByIdQuery,
} = tasksApi;
