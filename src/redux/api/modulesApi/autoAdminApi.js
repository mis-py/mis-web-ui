import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const autoAdminApi = createApi({
    reducerPath: "autoAdminApi",
    tagTypes: ["AutoAdmin", "AutoAdminBalance", "AutoAdminExtensions"],
    baseQuery: RtkDefaultQuery,
    endpoints: (build) => ({
        getResellerBalance: build.query({
            query: (data) => {
                let url = "/auto_admin/reseller/balance";
                let params = {};

                if (data.team !== undefined) {
                    params.team_id = data.team;
                }

                if (data.service === undefined) {
                    params.service = 'openprovider';
                } else {
                    params.service = data.service;
                }

                return {
                    url: url,
                    method: "POST",
                    headers: {
                        accept: "application/json",
                    },
                    body: params
                };
            },
            providesTags: (result, error, data) => {
                const params = [];

                if (data.team !== undefined) {
                    params.push(`team_id=${data.team}`);
                }

                if (data.service === undefined) {
                    params.push(`service=openprovider`);
                } else {
                    params.push(`service=${data.service}`);
                }

                return [{ type: "AutoAdminBalance", id: params.join('-') }];
            },
        }),
        getAutoAdminExtensions: build.query({
            query: () => {
                return {
                    url: "/auto_admin/setup/extensions",
                    method: "GET",
                    headers: {
                        accept: "application/json",
                    },
                };
            },
            providesTags: (result, error) => [{type: "AutoAdminExtensions", id: "LIST"}],
        }),
        findAutoAdminDomains: build.mutation({
            query: (data) => {
                const body = {
                    reseller: {
                        service: "openprovider",
                        team_id: data.team_id,
                    },
                    words: data.q.split(" ").join("-"),
                    extensions: data.zones.join("-"),
                    max_price: data.max_price,
                    price_currency: "USD",
                    quantity: data.quantity || 10,
                };

                return {
                    url: "/auto_admin/setup/find_domains",
                    method: "POST",
                    headers: {
                        accept: "application/json",
                    },
                    body,
                };
            },
            providesTags: (result, error) => [{type: "AutoAdminDomains", id: "LIST"}],
        }),
    }),
});

export const {
    useGetResellerBalanceQuery,
    useGetAutoAdminExtensionsQuery,
    useFindAutoAdminDomainsMutation
} = autoAdminApi;