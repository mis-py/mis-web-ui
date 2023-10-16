import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const proxyApi = createApi({
    reducerPath: "proxyApi",
    tagTypes: ["Proxy"],
    baseQuery: RtkDefaultQuery,
    endpoints: (build) => ({
        getProxies: build.query({
            query: () => ({
                url: `/proxy/proxies/`,
                method: "GET",
            }),
            providesTags: ["Proxy"],
        }),
        addProxy: build.mutation({
            query: (body) => ({
                url: `/proxy/proxies/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Proxy"],
        }),
        proxyCheck: build.mutation({
            query: (body) => ({
                url: `/proxy/proxies/check`,
                method: "POST",
                body,
            }),
        }),
        proxyChangeIP: build.mutation({
            query: (proxy_id) => ({
                url: `/proxy/proxies/change-ip/${proxy_id}`,
                method: "POST",
            }),
        }),
        getProxy: build.query({
            query: (proxy_id) => ({
                url: `/proxy/proxies/${proxy_id}`,
                method: "GET",
            }),
            providesTags: ["Proxy"],
        }),
        editProxy: build.mutation({
            query: ({id, ...rest}) => ({
                url: `/proxy/proxies/${id}`,
                method: "PUT",
                headers: {
                    accept: "application/json",
                },
                body: rest
            }),
            invalidatesTags: ["Proxy"],
        }),
        deleteProxy: build.mutation({
            query: (proxy_id) => ({
                url: `/proxy/proxies/${proxy_id}`,
                method: "DELETE",
                headers: {
                    accept: "application/json",
                },
            }),
            invalidatesTags: ["Proxy"],
        }),
    }),
});

export const {
    useGetProxiesQuery,
    useAddProxyMutation,
    useProxyCheckMutation,
    useProxyChangeIPMutation,
    useGetProxyQuery,
    useEditProxyMutation,
    useDeleteProxyMutation
} = proxyApi;