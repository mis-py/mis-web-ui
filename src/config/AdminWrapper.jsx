import React from "react";
import { useGetPermissionsUserIdQuery } from "redux/index";
import { currentUserId } from "config/variables";

const AdminWrapper = ({ children }) => {
  const { data = [], isLoading } = useGetPermissionsUserIdQuery(currentUserId);

  if (
    !isLoading &&
    data.length !== 0 &&
    data[0].permission.scope === "core:sudo"
  ) {
    return <>{children}</>;
  } else {
    return false;
  }
};

export default AdminWrapper;
