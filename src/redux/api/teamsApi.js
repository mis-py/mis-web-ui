import { misAPI } from "./misAPI";
import {
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';

export const teamsApi = misAPI.injectEndpoints({
  endpoints: (build) => ({

    getTeams: build.query({
      query: (params = {}) => {
        let { page = 1, size=50 } = params;
        return {
          url: "/teams",
          method: "GET",
          params: { page, size }
        };
      },
      providesTags: (result, error, id) =>  [{ type: "Teams", id }],
      transformResponse: response => response.items
    }),

    getTeam: build.query({
      query: (params) => {
        let { team_id } = params;
        return {
          url: "/teams/get",
          method: "GET",
          params: { team_id }
        }
      },
      providesTags: (result, error, id) => [{ type: "Teams", id }],
    }),

    addTeam: build.mutation({
      query: (params) => {
        let { name, permissions, users_ids, variables } = params; 
        return {
          url: "/teams/add",
          method: "POST",
          body: {
            name,
            permissions,
            users_ids,
            variables
          },
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Teams", id }],
    }),
    // TODO invalidate users(all) also becoz after user changed team it is still cached
    editTeam: build.mutation({
      query: (params) => {
        let { team_id, name, permissions, users_ids, variables } = params; 
        console.log(params);
        return {
          url: "/teams/edit",
          method: "PUT",
          params: { team_id },
          body: {
            name,
            permissions,
            users_ids,
            variables
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Teams", id }],
    }),

    removeTeam: build.mutation({
      query: (params) => {
        let { team_id } = params;
        return {
          url: "/teams/remove",
          method: "DELETE",
          params: { team_id }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Teams", id }],
    }),

    editTeamMembers: build.mutation({
      query: (params) => {
        let { team_id, users_ids } = params;
        return {
          url: "/teams/edit/users",
          method: "PUT",
          params: { team_id },
          body: users_ids,
        }},
      invalidatesTags: (result, error, { id }) => [{ type: "Teams", id }],
    }),
  }),
});


export const filterTeamsByStringSelector = () => {
  const emptyArray = [];
  return createSelector(
    items => items.data,
    (items, val) => val.toLowerCase().trim(),
    (items, val) => items?.filter(team => team.name.toLowerCase().includes(val)) ?? emptyArray
  ) 
}

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useRemoveTeamMutation,
  useEditTeamMembersMutation,
} = teamsApi;
