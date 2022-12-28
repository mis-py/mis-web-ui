import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetPermissionsUserIdQuery } from "../redux";

const AdminWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

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
