import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    tagTypes: ["Jobs"],
    baseQuery: RtkDefaultQuery,
    endpoints: (build) => ({
        getJobs: build.query({
            query: (params) => {
                let { task_id, user_id, team_id, job_id } = params;
                return {
                    url: "/jobs/all",
                    method: "GET",
                    params: { task_id: task_id, user_id: user_id, team_id: team_id, job_id: job_id }
                }
            },
            providesTags: ["Jobs"],
        }),
        addJob: build.mutation({
            query: (params) => {
                let {task_id, task_params, task_trigger} = params;

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
                    url: "/jobs/add",
                    method: "POST",
                    params: { task_id: task_id },
                    body: body,
                }
            },
            invalidatesTags: ["Jobs"],
        }),
        jobPause: build.mutation({
            query: (params) => {
                let { job_id } = params;
                return {
                    url: "/jobs/pause",
                    method: "POST",
                    params: { job_id: job_id }
                }
            },
            invalidatesTags: ["Jobs"],  
        }),
        jobResume: build.mutation({
            query: (params) => {
                let { job_id } = params;
                return {
                    url:"/jobs/resume",
                    method: "POST",
                    params: { job_id: job_id }
                }
            },
            invalidatesTags: ["Jobs"], 
        }),
        jobReschedule: build.mutation({
            query: (params) => {
                let { job_id, data } = params;
                return {
                    url: "/jobs/reschedule",
                    method: "POST",
                    params: { job_id: job_id },
                    body: {
                        // TODO need to fix that
                        // interval: 0,
                        cron: data.cron
                    },
                }
            },
            invalidatesTags: ["Jobs"], 
        }),
        jobRemove: build.mutation({
            query: (params) => {
                let { job_id } = params;
                    return {
                    url: "/jobs/remove",
                    method: "DELETE",
                    params: { job_id: job_id },
                }
            },
            invalidatesTags: ["Jobs"],  
        })
    }),

});

export const {
    useGetJobsQuery,
    useAddJobMutation,
    useJobPauseMutation,
    useJobResumeMutation,
    useJobRescheduleMutation,
    useJobRemoveMutation
} = jobsApi;
