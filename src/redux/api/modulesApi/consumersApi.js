import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/variables";

export const consumersApi = createApi({
    reducerPath: "consumersApi",
    tagTypes: ["Consumers"],
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (build) => ({
        getConsumers: build.query({
            query: () => ({
                url: `/consumers/`,
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("my-token")}`,
                },
            }),
            providesTags: (result, error, id) => [{ type: "Consumers", id }],
        }),
        consumersPause: build.mutation({
            query: (tag) => ({
                url: `/consumers/${tag}/pause`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("my-token")}`,
                },
            }),
            invalidatesTags: [{ type: "Consumers", id: "LIST" }],  
        }),
        consumersResume: build.mutation({
            query: (tag) => ({
                url: `/consumers/${tag}/resume`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("my-token")}`,
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
