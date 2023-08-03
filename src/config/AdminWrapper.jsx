import React from "react";
import { useGetMyPermissionsQuery } from "redux/index";

const AdminWrapper = ({ children }) => {
  const { data = [], isLoading } = useGetMyPermissionsQuery(null, {
    skip: window.localStorage.getItem("token") === null,
  });

  if (!isLoading && data && data[0] !== undefined && data[0].permission.scope === "core:sudo") {
    return <>{children}</>;
  } else if (data === []) {
    return false;
  } else {
    return false;
  }
};

export default AdminWrapper;
