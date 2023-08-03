import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const autoAdminApi = createApi({
    reducerPath: "autoAdminApi",
    tagTypes: ["AutoAdmin", "AutoAdminBalance"],
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
    }),

});

export const {
    useGetResellerBalanceQuery,
} = autoAdminApi;