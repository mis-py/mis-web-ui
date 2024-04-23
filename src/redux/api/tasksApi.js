import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    tagTypes: ["Tasks"],
    baseQuery: RtkDefaultQuery,
    endpoints: (build) => ({
        getTasks: build.query({
            query: (params) => {
                let { task_id } = params;
                return {
                url: "/tasks",
                method: "GET",
                params: { task_id: task_id }
            }},
            providesTags: ["Tasks"],
        }),
    }),

});

export const {
    useGetTasksQuery,
} = tasksApi;
