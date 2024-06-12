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
            query: ({ page=1, size=50, history_limit=20, is_active=true } = {}) => ({
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

        editBulkProxyDomains: build.mutation({
            query: ({ proxy_domains }) => ({
                url: "/binom_companion/proxy_domains/edit_bulk",
                method: "PUT",
                body: { proxy_domains }
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
            invalidatesTags: ({id}) => [{type: "ReplacementHistory"}, {type: "ReplacementGroup"}, {type: "ProxyDomain"}]
        })
    }),
});

export const filterProxyByStringSelector = () => {
    const emptyArray = [];
    return createSelector(
        items => items.data,
        (items, searchValue) => searchValue.toLowerCase().trim(),
        (items, searchValue, serverNameValue) => serverNameValue.toLowerCase().trim(),
        (items, searchValue, serverNameValue, trackerInstanceValue) => trackerInstanceValue.toLowerCase().trim(),
        (items, searchValue, serverNameValue, trackerInstanceValue, allReady) => allReady,
        (items, searchValue, serverNameValue, trackerInstanceValue, allReady, allInvalid) => allInvalid,
        (items, searchValue, serverNameValue, trackerInstanceValue, allReady, allInvalid) => {
            let filters = [
                (item) => item.server_name.toLowerCase().includes(serverNameValue),
                (item) => item.tracker_instance.name.toLowerCase().includes(trackerInstanceValue),
                (item) => item.name.toLowerCase().includes(searchValue),
            ];
            if (allInvalid != undefined){
                filters = filters.concat([(item) => item.is_invalid == allInvalid])
            }
            if (allReady != undefined){
                filters = filters.concat([(item) => item.is_ready == allReady])
            }

            let result = items?.filter(proxy => filters.every(f => f(proxy)));

            return result ?? emptyArray;
        }
    ) 
}

export const {
    useGetTrackerInstancesQuery,
    useGetReplacementGroupsQuery,
    useGetProxyDomainsQuery,
    useAddBulkProxyDomainsMutation,
    useEditBulkProxyDomainsMutation,
    useGetServerNamesQuery,
    useGetAvailableProxyDomainsForGroupsQuery,
    useChangeProxyDomainMutation
} = binomApi;