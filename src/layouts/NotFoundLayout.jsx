import React from "react";
import { Outlet } from "react-router-dom";

const NotFoundLayout = () => {
  return (
    <div className="h-full container">
      <Outlet />
    </div>
  );
};

export default NotFoundLayout;
