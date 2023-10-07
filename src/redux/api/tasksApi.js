import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    tagTypes: ["Tasks", "Jobs"],
    baseQuery: RtkDefaultQuery,
    endpoints: (build) => ({
        getTasks: build.query({
            query: (task_id) => ({
                url: `/tasks/${task_id ? '?task_id='+task_id : ''}`,
                method: "GET",
            }),
            providesTags: ["Tasks"],
        }),
        getJobs: build.query({
            query: (job_id) => {
                return {
                    url: `/tasks/jobs${job_id ? '/?task_id='+job_id : ''}`,
                    method: "GET",
                }
            },
            providesTags: ["Jobs"],
        }),
        getJob: build.query({
            query: (job_id) => {
                return {
                    url: `/tasks/jobs/${job_id}`,
                    method: "GET",
                }
            },
            providesTags: ["Jobs"],
        }),
        addJob: build.mutation({
            query: ({task_id, task_params, task_trigger}) => {
                const body = {
                    trigger: {},
                };

                if (task_params !== undefined) {
                    body.extra = task_params;
                }
                
                // if interval value - dispatch interval value with extra values
                // othervise if specified cron values - dispatch cron values with extra values
                // othervise use default interval
                // if default value not specified raise a toast that trigger must be specified

                if (task_trigger !== undefined) {

                    if (task_trigger.interval !== undefined){
                        body.trigger.interval = task_trigger.interval;
                    } else {
                        body.trigger.cron = task_trigger;
                    }
                }

                return {
                    url: `/tasks/${task_id}/add-job`,
                    method: "POST",
                    body,
                }
            },
            invalidatesTags: ["Jobs"],
        }),
        jobPause: build.mutation({
            query: (job_id) => ({
                url: `/tasks/${job_id}/pause`,
                method: "POST",
            }),
            invalidatesTags: ["Jobs"],  
        }),
        jobResume: build.mutation({
            query: (job_id) => ({
                url: `/tasks/${job_id}/resume`,
                method: "POST",
            }),
            invalidatesTags: ["Jobs"], 
        }),
        jobReschedule: build.mutation({
            query: (data) => ({
                url: `/tasks/${data.id}/reschedule`,
                method: "POST",
                body: {
                    // interval: 0,
                    cron: data.cron
                },
            }),
            invalidatesTags: ["Jobs"], 
        }),
        jobRemove: build.mutation({
            query: (job_id) => ({
                url: `/tasks/${job_id}/remove`,
                method: "DELETE",
            }),
            invalidatesTags: ["Jobs"],  
        })
    }),

});

export const {
    useGetTasksQuery,
    useGetJobsQuery,
    useGetJobQuery,
    useAddJobMutation,
    useJobPauseMutation,
    useJobResumeMutation,
    useJobRescheduleMutation,
    useJobRemoveMutation
} = tasksApi;
