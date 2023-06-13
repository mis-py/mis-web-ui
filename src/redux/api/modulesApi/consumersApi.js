import { createApi } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const consumersApi = createApi({
    reducerPath: "consumersApi",
    tagTypes: ["Consumers"],
    baseQuery: rtkDefaultQuery,
    endpoints: (build) => ({
        getConsumers: build.query({
            query: () => ({
                url: `/consumers/`,
                method: "GET",
                headers: {
                    accept: "application/json"
                },
            }),
            providesTags: (result, error, id) => [{ type: "Consumers", id }],
        }),
        consumersPause: build.mutation({
            query: (tag) => ({
                url: `/consumers/${tag}/pause`,
                method: "POST",
                headers: {
                    accept: "application/json"
                },
            }),
            invalidatesTags: [{ type: "Consumers", id: "LIST" }],  
        }),
        consumersResume: build.mutation({
            query: (tag) => ({
                url: `/consumers/${tag}/resume`,
                method: "POST",
                headers: {
                    accept: "application/json"
                },
            }),
            invalidatesTags: [{ type: "Consumers", id: "LIST" }], 
        }),
    }),

});

export const {
    useGetConsumersQuery,
    useConsumersPauseMutation,
    useConsumersResumeMutation,
} = consumersApi;
