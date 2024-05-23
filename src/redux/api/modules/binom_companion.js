import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";
import { misAPI } from "redux/api/misAPI";
import {
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';

export const binomApi = misAPI.enhanceEndpoints({addTagTypes: ["TrackerInstance", "ProxyDomain", "ReplacementGroup", "ReplacementHistory"]}).injectEndpoints({
    endpoints: (build) => ({
        getTrackerInstances: build.query({
            query: ({ page=1, size=50 } = {}) => ({
                url: "/binom_companion/tracker_instance",
                method: "GET",
                params: { page, size }
            }),
            providesTags: ({id}) => [{type: "TrackerInstance", id}],
            transformResponse: response => response.items
        }),

        getReplacementGroups: build.query({
            query: ({ page=1, size=50, history_limit=10, is_active=true } = {}) => ({
                url: "/binom_companion/replacement_group",
                method: "GET",
                params: { page, size, history_limit, is_active }
            }),
            providesTags: ({id}) => [{type: "ReplacementGroup", id}],
            transformResponse: response => response.items
        }),

        getProxyDomains: build.query({
            query: ({page=1, size=50} = {}) => ({
                url: "/binom_companion/proxy_domains",
                method: "GET",
                params: { page, size }
            }),
            providesTags: ({id}) => [{type: "ProxyDomain", id}],
            transformResponse: response => response.items
        }),

        addBulkProxyDomains: build.mutation({
            query: ({ domain_names, tracker_instance_id, server_name }) => ({
                url: "/binom_companion/proxy_domains/add_bulk",
                method: "POST",
                body: { domain_names, tracker_instance_id, server_name }
            }),
            invalidatesTags: ["ProxyDomain"]
        }),

        getServerNames: build.query({
            query: () => ({
                url: "/binom_companion/proxy_domains/get_server_names",
                method: "GET",
            }),
        }),
        getAvailableProxyDomainsForGroups: build.query({
            query: ({ replacement_group_ids } = {}) => ({
                url: "/binom_companion/proxy_domains/get_available_proxy_domains_for_groups",
                method: "GET",
                params: { replacement_group_ids },
            }),
            providesTags: ({id}) => [{type: "ProxyDomain", id}],
            // transformResponse: response => response.items
        }),

        changeProxyDomain: build.mutation({
            query: ({replacement_group_ids}) => ({
                url: "/binom_companion/replacement_group/change_proxy",
                method: "POST",
                body: { replacement_group_ids }
            }),
            invalidatesTags: ({id}) => ["ReplacementHistory"]
        })
    }),
});

export const filterProxyByStringSelector = () => {
    const emptyArray = [];
    return createSelector(
        items => items.data,
        (items, val) => val.toLowerCase().trim(),
        (items, val) => items?.filter(proxy => 
            proxy.name.toLowerCase().includes(val) ||
            proxy.server_name.toLowerCase().includes(val) ||
            proxy.tracker_instance.name.toLowerCase().includes(val)
        ) ?? emptyArray
    ) 
}

export const {
    useGetTrackerInstancesQuery,
    useGetReplacementGroupsQuery,
    useGetProxyDomainsQuery,
    useAddBulkProxyDomainsMutation,
    useGetServerNamesQuery,
    useGetAvailableProxyDomainsForGroupsQuery,
    useChangeProxyDomainMutation
} = binomApi;