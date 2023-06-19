import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  tagTypes: ["Settings"],
  baseQuery: rtkDefaultQuery,
  endpoints: (build) => ({
    getSettings: build.query({
      query: () => ({
        url: `/settings/`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Settings", id })),
              { type: "Settings", id: "LIST" },
            ]
          : [{ type: "Settings", id: "LIST" }],
    }),
    getUserSettingsId: build.query({
      query: (id) => ({
        url: `/settings/user/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Settings", id })),
              { type: "Settings", id: "LIST" },
            ]
          : [{ type: "Settings", id: "LIST" }],
    }),
    getSettingsAppId: build.query({
      query: (id) => ({
        url: `/settings/app/${id}`,
        method: "GET",
        headers: {
          accept: "application/json"
        },
      }),
      providesTags: (result, error, id) => [{ type: "Settings", id }],
    }),
    getSettingsUserId: build.query({
      query: (id) => ({
        url: `/settings/user/${id}`,
        method: "GET",
        headers: {
          accept: "application/json"
        },
      }),
      providesTags: (result, error, id) => [{ type: "Settings", id }],
    }),
    getSettingsTeamId: build.query({
      query: (id) => ({
        url: `/settings/team/${id}`,
        method: "GET",
        headers: {
          accept: "application/json"
        },
      }),
      providesTags: (result, error, id) => [{ type: "Settings", id }],
    }),
    settingAppSet: build.mutation({
      query: (data) => ({
        url: `/settings/app/${data.id}`,
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: data.body,
      }),
      invalidatesTags: ["Settings"],
    }),
    settingUserSet: build.mutation({
      query: (data) => {
        return {
          url: `/settings/user/${data.userId}`,
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: data.settings,
        }
      },
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useGetUserSettingsIdQuery,
  useGetSettingsAppIdQuery,
  useGetSettingsUserIdQuery,
  useGetSettingsTeamIdQuery,
  useSettingAppSetMutation,
  useSettingUserSetMutation,
} = settingsApi;
