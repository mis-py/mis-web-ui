import React from "react";
import { useGetPermissionsUserIdQuery } from "redux/index";
import { currentUserId } from "config/variables";
import { useLocation, useNavigate } from "react-router-dom";

const AdminWrapper = ({ children }) => {
  const { data = [], isLoading } = useGetPermissionsUserIdQuery(currentUserId);

  if (
    !isLoading &&
    data?.length !== 0 &&
    data[0].permission.scope === "core:sudo"
  ) {
    return <>{children}</>;
  } else if (data && data?.length === 0) {
    return false;
  } else {
    return false;
  }
};

export default AdminWrapper;
