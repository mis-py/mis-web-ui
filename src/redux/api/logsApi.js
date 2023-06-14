import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const logsApi = createApi({
    reducerPath: "logsApi",
    tagTypes: ["Logs"],
    baseQuery: rtkDefaultQuery,
    endpoints: (build) => ({
      getLogs: build.query({
        query: () => ({
          url: `/logs/logs_files`,
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Logs", id })),
                { type: "Logs", id: "LIST" },
              ]
            : [{ type: "Logs", id: "LIST" }],
      }),
      getLogsDownload: build.query({
        query: () => ({
          url: `/logs/download_log`,
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Logs", id })),
                { type: "Logs", id: "LIST" },
              ]
            : [{ type: "Logs", id: "LIST" }],
      }),
    }),
  });

  export const {
    useGetLogsQuery ,
    useGetLogsDownloadQuery,
  } = logsApi;