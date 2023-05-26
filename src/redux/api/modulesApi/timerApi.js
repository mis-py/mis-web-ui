import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/variables";

export const timerApi = createApi({
  reducerPath: "timerApi",
  tagTypes: ["Timer"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    timerLead: build.mutation({
      query: (body) => ({
        url: `/timer/lead`,
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Timer", id: "LIST" }],
    }),
  }),
});

export const { useTimerLeadMutation } = timerApi;
