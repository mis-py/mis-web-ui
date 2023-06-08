import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/variables";

export const binomApi = createApi({
    reducerPath: "binomApi",
    tagTypes: ["binom"],
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (build) => ({
        endpointLead: build.query({
            query: () => ({
                url: `/binom_companion/lead`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: [{ type: "Consumers", id: "LIST" }], 
        }),
    }),

});

export const {
    
} = consumersApi;