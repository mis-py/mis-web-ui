import React from "react";
import { useGetPermissionsUserIdQuery } from "redux/index";

const AdminWrapper = ({ children }) => {
  const { data = [], isLoading } = useGetPermissionsUserIdQuery(localStorage.getItem("user_id"));

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
