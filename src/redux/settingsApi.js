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
    settingAppSet: build.mutation({
      query: ({ id, rest }) => ({
        url: `/settings/app/${id}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body: rest,
      }),
      invalidatesTags: [{ type: "Settings", id: "LIST" }],
    }),
    settingUserSet: build.mutation({
      query: ({ id, body }) => ({
        url: `/settings/user/${id}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Settings", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSettingsAppIdQuery,
  useSettingAppSetMutation,
  useSettingUserSetMutation,
} = settingsApi;
