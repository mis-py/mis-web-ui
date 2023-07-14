import { createApi } from "@reduxjs/toolkit/query/react";
import rtkDefaultQuery from "config/rtkDefaultQuery";

export const logsApi = createApi({
  reducerPath: "logsApi",
  tagTypes: ["Logs"],
  baseQuery: rtkDefaultQuery,
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
      // transformResponse: (response, meta, arg) => {
      //   meta.response.headers.forEach(item => {
      //     console.log(item)
      //   })
      //
      //   console.log(meta);
      //
      //   // console.log({filename: meta.response.headers.entries(), response});
      //
      //   return {filename: meta.response.headers.filename, response};
      // },
      providesTags: (result, error, { id }) => {
        const tags = [{ type: "Logs", id: "LIST" }];

        if (id) {
          tags.push({ type: "Logs", id });
        }

        return tags;
      }
    }),
  }),
});

export const { 
  useGetAppLogsQuery,
} = logsApi;
