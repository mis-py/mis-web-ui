import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  tagTypes: ["Settings"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getSettingsAppId: build.query({
      query: (id) => ({
        url: `/settings/app/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      providesTags: ["Settings"],
    }),
    getSettingsUserId: build.query({
      query: (id) => ({
        url: `/settings/user/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      providesTags: ["Settings"],
    }),
    settingAppSet: build.mutation({
      query: (data) => ({
        url: `/settings/app/${data.id}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body: data.body,
      }),
      invalidatesTags: [{ type: "Settings", id: "LIST" }],
    }),
    settingUserSet: build.mutation({
      query: (data) => ({
        url: `/settings/user/${data.userId}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body: data.body,
      }),
      invalidatesTags: [{ type: "Settings", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSettingsAppIdQuery,
  useGetSettingsUserIdQuery,
  useSettingAppSetMutation,
  useSettingUserSetMutation,
} = settingsApi;
