import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api_token = "_api_token";

//export const baseUrl = `${
//    process.env.NODE_ENV === "development" ? "http://10.10.102.3:8000" : "/api"
    //process.env.NODE_ENV === "development" ? "http://localhost:8000/" : "/api"
    // "http://dev.ng.lan/api"
//  }`;

export const baseUrl = `${window.location.origin}/api`;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Authorization', `Bearer ${localStorage.getItem(api_token)}`);
        headers.set('accept', "application/json");
        headers.set("content-type", "application/json");
        return headers;
    },
});

const RtkDefaultQuery = async (args, api, extraOptions) => {
    // if (localStorage.getItem(api_token) === null) {
    //     return {
    //         error: {
    //             status: 400,
    //             data: { message: "No token found" },
    //         },
    //     };
    // } else {
        if (args && args.hasOwnProperty('params')){
            // remove all nulls from params
            args.params = Object.fromEntries(Object.entries(args.params).filter(([_, v]) => v != null));
        }

        let { data } = await baseQuery(args, api, extraOptions);
        // TODO token expiry and token error
        // if (data.error !== undefined && data.error.status === 401) {
        //     localStorage.removeItem(api_token);

        //     if (window.location.pathname !== '/signin') {
        //         return <Navigate to="/signin" />;
        //     }
        // }

        if (data.status == false){
            return {error: data.result};
        }

        return {data: data.result};
    // }
};

export default RtkDefaultQuery;
