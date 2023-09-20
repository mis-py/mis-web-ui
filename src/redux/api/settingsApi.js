import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  tagTypes: ["Settings"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getSettings: build.query({
      query: () => ({
        url: `/settings/`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result) => [{ type: "Settings" }],
      // normalize response
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return {[item.id]: item, ...acc}
        }, {});

        return { entities: newResponse, allIds: Object.keys(newResponse)}
      }
    }),
    getSettingsAppId: build.query({
      query: (id) => ({
        url: `/settings/app/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result, error, id) => [{ type: "Settings", id }],
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return { [item.id]: item, ...acc };
        }, {});
  
        return { entities: newResponse, allIds: Object.keys(newResponse) };
      },
    }),
  
    getSettingsUserId: build.query({
      query: (id) => ({
        url: `/settings/user/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result, error, id) => [{ type: "Settings", id }],
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return { [item.setting.id]: item, ...acc };
        }, {});
  
        return { entities: newResponse, allIds: Object.keys(newResponse) };
      },
    }),
  
    getSettingsTeamId: build.query({
      query: (id) => ({
        url: `/settings/team/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }),
      providesTags: (result, error, id) => [{ type: "Settings", id }],
      transformResponse: (response) => {
        let newResponse = response.reduce((acc, item) => {
          return { [item.id]: item, ...acc };
        }, {});
  
        return { entities: newResponse, allIds: Object.keys(newResponse) };
      },
    }),
  
    settingAppSet: build.mutation({
      query: (data) => ({
        url: `/settings/app/${data.id}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: data.body,
      }),
      invalidatesTags: [{ type: "Settings" }],
    }),
  
    settingUserSet: build.mutation({
      query: (data) => ({
        url: `/settings/user/${data.id}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: data.body,
      }),
      invalidatesTags: [{ type: "Settings" }],
    }),
  
    settingsTeamSet: build.mutation({
      query: (data) => ({
        url: `/settings/team/${data.id}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: data.settings,
      }),
      invalidatesTags: [{ type: "Settings" }],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useGetSettingsAppIdQuery,
  useGetSettingsUserIdQuery,
  useGetSettingsTeamIdQuery,
  useSettingAppSetMutation,
  useSettingUserSetMutation,
  useSettingsTeamSetMutation,
} = settingsApi;
