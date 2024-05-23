import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const logsApi = createApi({
  reducerPath: "logsApi",
  tagTypes: ["Logs", "JobLogs"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getAppLogs: build.query({
      query: ({ id, date, hour, display }) => {
        // Проверка обязательного параметра id
        if (!id) {
          throw new Error("Необходимо указать идентификатор (id).");
        }

        // Подстановка параметров в URL строку
        let url = `/logs/download/app?app_id=${id}`;

        // Проверка и подстановка дополнительных параметров
        if (date) {
          url += `&date=${date}`;
        }

        if (hour) {
          url += `&hour=${hour}`;
        }

        if (display === undefined) {
          display = true; // Значение по умолчанию для display
        }
        url += `&display=${display}`;

        return {
          url: url,
          method: "GET",
          headers: {
            accept: "text/plain"
          },
          responseHandler: "text",
        };
      },
      providesTags: (result, error, { id }) => {
        const tags = [{ type: "Logs", id: "LIST" }];

        if (id) {
          tags.push({ type: "Logs", id });
        }

        return tags;
      }
    }),
    getJobLogs: build.query({
      query: ({id, date, hour, display}) => {
        // Проверка обязательного параметра id
        if (!id) {
          throw new Error("Необходимо указать идентификатор (id).");
        }

        // Подстановка параметров в URL строку
        let url = `/logs/download/job?job_id=${id}`;

        // Проверка и подстановка дополнительных параметров
        if (hour) {
          url += `&hour=${hour}`;
        }

        if (date) {
          url += `&date=${date}`;
        }

        if (display === undefined) {
          display = true; // Значение по умолчанию для display
        }
        url += `&display=${display}`;

        return {
          url: url,
          method: "GET",
          headers: {
            accept: "text/plain"
          },
          responseHandler: "text",
        };
      },
      providesTags: (result, error, { id }) => {
        const tags = [{ type: "JobLogs", id: "LIST" }];

        if (id) {
          tags.push({ type: "JobLogs", id });
        }

        return tags;
      }
    }),
  }),
});

export const { 
  useGetAppLogsQuery,
  useGetJobLogsQuery,
} = logsApi;
