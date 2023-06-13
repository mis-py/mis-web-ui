import { createApi} from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const timerApi = createApi({
  reducerPath: "timerApi",
  tagTypes: ["Timer"],
  baseQuery: rtkDefaultQuery,
  endpoints: (build) => ({
    timerLead: build.mutation({
      query: (body) => ({
        url: `/timer/lead`,
        method: "POST",
        headers: {
          accept: "application/json"
        },
        body,
      }),
      invalidatesTags: [{ type: "Timer", id: "LIST" }],
    }),
  }),
});

export const { useTimerLeadMutation } = timerApi;
