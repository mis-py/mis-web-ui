import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const statabotApi = createApi({
  reducerPath: "statabotApi",
  tagTypes: ["Statabot"],
  baseQuery: RtkDefaultQuery,
  endpoints: (build) => ({
    inviteUserToStatabot: build.mutation({
      query: (id) => {
        return {
          url: "/statabot/users/invite",
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: {
            user_id: id,
          },
        };
      },
      providesTags: (result, error, id) => {
        const tags = [{ type: "Statabot", id: "LIST" }];

        if (id) {
          tags.push({ type: "Statabot", id });
        }

        return tags;
      }
    }),
    createUsertoStatabot: build.mutation({
      query: (data) => {
        return {
          url: "/statabot/users/create",
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: data,
        };
      },
      providesTags: (result, error, id) => {
        const tags = [{ type: "Statabot", id: "LIST" }];

        if (id) {
          tags.push({ type: "Statabot", id });
        }

        return tags;
      }
    }),
  }),
});

export const { 
  useInviteUserToStatabotMutation,
  useCreateUsertoStatabotMutation,
} = statabotApi;
