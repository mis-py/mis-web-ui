import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./variables";
import { Navigate } from "react-router-dom";
import React from "react";

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
        return headers;
    },
});

const RtkDefaultQuery = async (args, api, extraOptions) => {
    if (localStorage.getItem("token") === null) {
        return {
            error: {
                status: 400,
                data: { message: "No token found" },
            },
        };
    } else {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error !== undefined && result.error.status === 401) {
            localStorage.removeItem('token');

            if (window.location.pathname !== '/signin') {
                return <Navigate to="/signin" />;
            }
        }

        return result;
    }
};

export default RtkDefaultQuery;
