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
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Timer", id: "LIST" }],
    }),
<<<<<<< HEAD
    endpoints: (build) => ({
        leadEdpoint: build.mutation({
            query: () => ({
                url: `/timer/lead`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("my-token")}`,
                },
            }),
            invalidatesTags: [{ type: "Timer", id: "LIST" }],  
        })
    }),

});

export const {
    useLeadEdpointMutation
} = timerApi;
=======
  }),
});

export const { useTimerLeadMutation } = timerApi;
>>>>>>> 47e2534a4d687cadee5c3c14655564b1129a535a
