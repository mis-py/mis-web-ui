import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "config/RtkDefaultQuery";

export const teamsApi = createApi({
  reducerPath: "teamsApi",
  tagTypes: ["Teams"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    getTeams: build.query({
      query: () => ({
        url: `/teams/`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Teams", id })),
              { type: "Teams", id: "LIST" },
            ]
          : [{ type: "Teams", id: "LIST" }],
    }),
    getTeamId: build.query({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
      }),
      providesTags: (result, error, id) => [{ type: "Teams", id }],
    }),
    addTeam: build.mutation({
      query: (body) => ({
        url: "/teams/create",
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body,
      }),
      invalidatesTags: [{ type: "Teams", id: "LIST" }],
    }),
    editTeam: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/teams/${id}`,
        method: "PUT",
        headers: {
          accept: "application/json"
        },
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Teams", id }],
    }),
    deleteTeam: build.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
        headers: {
          accept: "application/json"
        },
      }),
      invalidatesTags: [{ type: "Teams", id: "LIST" }],
    }),
    editTeamMembers: build.mutation({
      query: ({ id, members }) => ({
        url: `/teams/${id}/users`,
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        body: members,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Teams", id }],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamIdQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
  useEditTeamMembersMutation,
} = teamsApi;
