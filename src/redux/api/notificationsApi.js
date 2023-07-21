import { createApi } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const notificationsApiApi = createApi({
    reducerPath: "notificationsApi",
    tagTypes: ["Notifications"],
    baseQuery: rtkDefaultQuery,
    endpoints: (build) => ({
        getNotifications: build.query({
            query: () => ({
                url: `/notifications/routing_keys/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Notifications", id }],
        }),
        getMyNotifications: build.query({
            query: () => ({
              url: "/notifications/routing_keys/my",
              method: "GET",
            }),
            providesTags: () => [{ type: "Notifications" }],
            forceRefetch() {
              return localStorage.getItem('user_id') === null;
            },
          }),
    }),

});

export const {
    useGetNotificationsQuery,
    
} = notificationsApiApi;
