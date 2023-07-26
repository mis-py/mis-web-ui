import React from "react";
import { Outlet } from "react-router-dom";
import SidebarDesktop from "components/SidebarDesktop";

const NotFoundLayout = () => {
  return (
      <>
        <SidebarDesktop />
        <div className="h-full container">
          <Outlet />
        </div>
      </>
  );
};

export default NotFoundLayout;
