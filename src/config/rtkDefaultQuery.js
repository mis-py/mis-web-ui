import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./variables";

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
        return headers;
    },
});

const rtkDefaultQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error !== undefined && result.error.status === 401) {
      localStorage.removeItem('token');

      if (window.location.pathname !== '/signin') {
          window.location.reload();
      }
    }

    return result;
};

export default rtkDefaultQuery;
