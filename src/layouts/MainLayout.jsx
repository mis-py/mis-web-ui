import React from "react";
import { Outlet } from "react-router-dom";

import SidebarDesktop from "../components/SidebarDesktop";

const MainLayout = () => {
  return (
    <>
      <SidebarDesktop />
      <div className="container">
        <div className="lg:ml-[345px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
