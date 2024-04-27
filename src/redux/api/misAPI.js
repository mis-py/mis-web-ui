import { createApi } from "@reduxjs/toolkit/query/react";
import RtkDefaultQuery from "redux/api/RtkDefaultQuery";

export const misAPI = createApi({
  reducerPath: "misAPI",
  tagTypes: ["Users", "Permissions", "Teams", "Variables", "Modules"],
  baseQuery: RtkDefaultQuery,
  endpoints: () => ({})
});