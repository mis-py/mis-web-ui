import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  tagTypes: ["Notifications"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getNotifications: build.query({
      query: () => ({
        url: `/notifications/routing_keys/`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Notifications", id })),
              { type: "Notifications", id: "LIST" },
            ]
          : [{ type: "Notifications", id: "LIST" }],
    }),
    getNotificationsMy: build.query({
      query: () => ({
        url: `/notifications/routing_keys/my`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Notifications", id }],
    }),
    keySubscribe: build.mutation({
      query: (data) => ({
            url: `/notifications/routing_keys/set-subscriptions/`,
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: data.body,
          }),
          invalidatesTags: (result, error, { id }) => [{ type: "Notifications", id }],
    })

    // editNotifications: build.mutation({
    //   query: ({ key_id }) => ({
    //     url: `/notifications/routing_keys/${key_id}`,
    //     method: "PUT",
    //     headers: {
    //       accept: "application/json",
    //     },
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: "Notifications", id }],
    // }),
    // subscribeNotifications: build.mutation({
    //   query: ({ key_id }) => ({
    //     url: `/notifications/routing_keys/${key_id}`,
    //     method: "POST",
    //     headers: {
    //       accept: "application/json",
    //     },
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: "Notifications", id }],
    // }),
    // deleteNotications: build.mutation({
    //   query: (key_id) => ({
    //     url: `/notifications/routing_keys/${key_id}`,
    //     method: "DELETE",
    //     headers: {
    //       accept: "application/json",
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Notifications", id: "LIST" }],
    // }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationsMyQuery,
  useKeySubscribeMutation,
  // useEditNotificationsMutation,
  // useSubscribeNotificationsMutation,
  // useDeleteNoticationsMutation,
} = notificationsApi;
