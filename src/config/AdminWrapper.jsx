import React from "react";
import { useGetPermissionsUserIdQuery } from "../redux";
import { currentUserId } from "../config/variables";

const AdminWrapper = ({ children }) => {
  const { data, isLoading } = useGetPermissionsUserIdQuery(currentUserId);

  if (
    !isLoading &&
    data.length !== 0 &&
    data[0].permission.scope === "core:sudo"
  ) {
    return <>{children}</>;
  } else if (data && data.length === 0) {
    return false;
  } else {
    return false;
  }
};

export default AdminWrapper;
