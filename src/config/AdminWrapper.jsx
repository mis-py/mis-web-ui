import React from "react";
import { useGetPermissionsUserIdQuery } from "redux/index";
import { currentUserId } from "config/variables";

const AdminWrapper = ({ children }) => {
  const { data = [], isLoading } = useGetPermissionsUserIdQuery(currentUserId);

  console.log(data);

  if (
    !isLoading &&
    data.length !== 0 &&
    data[0].permission.scope === "core:sudo"
  ) {
    return <>{children}</>;
  } else if (data.length === 0) {
    return false;
  } else {
    return false;
  }
};

export default AdminWrapper;
