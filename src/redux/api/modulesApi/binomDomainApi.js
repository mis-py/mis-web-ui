import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const binomApi = createApi({
    reducerPath: "binomDomainApi",
    tagTypes: ["BinomDomains"],
    baseQuery: RtkDefaultQuery,
    endpoints: (build) => ({
        getBinomDomainById: build.query({
            query: (id) => ({
                url: `/binom_companion/domain/${id}`,
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }),
            providesTags: (result, error, id) => [{ type: "binom", id }],
        }),
        updateBinomDomainById: build.mutation({
            query: (id) => ({
                url: `/binom_companion/domain/${id}`,
                method: "PUT",
                headers: {
                    accept: "application/json",
                },
            }),
            invalidatesTags: [{ type: "binom", id: "LIST" }],  
        }),
        // delete domain

        // Get domains list
        getBinomDomains: build.query({
            query: (data) => {
                return {
                    url: `/binom_companion/domain`,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                    },
                };
            },
            providesTags: () => [{ type: "BinomDomains", id: "LIST" }],
        }),

        // get GEOs list
        getGeosList: build.query({
            query: () => {
                return {
                    url: `/binom_companion/geo`,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                    },
                };
            },
            providesTags: () => [{ type: "Geo", id: "LIST" }],
        }),
    }),

});

export const {
    useGetBinomDomainsQuery,
    useGetGeosListQuery,
} = binomApi;