import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/variables";

export const binomApi = createApi({
    reducerPath: "binomDomainApi",
    tagTypes: ["Binom"],
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (build) => ({
        getBinomId: build.query({
            query: () => ({
                url: `/binom_companion/domain/${id}`,
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, id) => [{ type: "binom", id }],
        }),
        updateBinomId: build.mutation({
            query: (tag) => ({
                url: `/binom_companion/domain/${id}`,
                method: "PUT",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: [{ type: "binom", id: "LIST" }],  
        }),
        binomResume: build.mutation({
            query: (tag) => ({
                url: `/binom/${tag}/resume`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: [{ type: "binom", id: "LIST" }], 
        }),
    }),

});

export const {
    
} = binomDomainApi;