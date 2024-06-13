import { misAPI } from "./misAPI";
import {
    createEntityAdapter,
    createSelector
  } from '@reduxjs/toolkit';

export const jobsApi = misAPI.injectEndpoints({
    endpoints: (build) => ({
        getJobs: build.query({
            query: ({ task_id=null, user_id=null, team_id=null, job_id=null } = {}) => {
                return {
                    url: "/jobs",
                    method: "GET",
                    params: { task_id, user_id, team_id, job_id }
                }
            },
            providesTags: ["Jobs"],
        }),
        addJob: build.mutation({
            query: ({name, task_name, trigger, extra={}, type="user"}) => {
                return {
                    url: "/jobs/add",
                    method: "POST",
                    body: { name, trigger, task_name, extra, type},
                }
            },
            invalidatesTags: ["Jobs"],
        }),
        // TODO 
        jobPause: build.mutation({
            query: ({ job_id }) => {
                return {
                    url: "/jobs/pause",
                    method: "POST",
                    params: { job_id }
                }
            },
            invalidatesTags: ["Jobs"],  
        }),
        jobResume: build.mutation({
            query: ({ job_id }) => {
                return {
                    url:"/jobs/resume",
                    method: "POST",
                    params: { job_id }
                }
            },
            invalidatesTags: ["Jobs"], 
        }),
        jobReschedule: build.mutation({
            query: ({ job_id, trigger }) => {
                return {
                    url: "/jobs/reschedule",
                    method: "POST",
                    params: { job_id },
                    body: { trigger },
                }
            },
            invalidatesTags: ["Jobs"], 
        }),
        jobRemove: build.mutation({
            query: ({ job_id }) => {
                return {
                    url: "/jobs/remove",
                    method: "DELETE",
                    params: { job_id },
                }
            },
            invalidatesTags: ["Jobs"],  
        })
    }),
});

export const filterJobsByStringSelector = () => {
    const emptyArray = [];
    return createSelector(
      items => items.data,
      (items, val) => val.toLowerCase().trim(),
      (items, val) => items?.filter(job => job.name.toLowerCase().includes(val)) ?? emptyArray
    ) 
}

export const {
    useGetJobsQuery,
    useAddJobMutation,
    useJobPauseMutation,
    useJobResumeMutation,
    useJobRescheduleMutation,
    useJobRemoveMutation
} = jobsApi;
