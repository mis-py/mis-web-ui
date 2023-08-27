import React from "react";
import { Outlet } from "react-router-dom";
import SidebarDesktop from "layouts/Sidebar";

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
