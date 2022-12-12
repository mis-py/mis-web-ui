import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const firewallApi = createApi({
  reducerPath: "firewallApi",
  tagTypes: ["Firewall"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://crm.nullgravity.net/api" }),
  endpoints: (build) => ({
    getFirewall: build.query({
      query: () => ({
        url: `/firewall/`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Firewall", id })),
                { type: "Firewall", id: "LIST" },
              ]
            : [{ type: "Firewall", id: "LIST" }],
      }),
    }),
    editFirewall: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/firewall/${id}`,
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Firewall", id }],
    }),
    deleteFirewall: build.mutation({
      query: (id) => ({
        url: `/firewall/${id}`,
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("my-token")}`,
        },
      }),
      invalidatesTags: [{ type: "Firewall", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFirewallQuery,
  useEditFirewallMutation,
  useDeleteFirewallMutation,
} = firewallApi;
