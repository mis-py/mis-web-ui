import React from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { useGetPermissionsUserIdQuery } from "../redux";

import SidebarDesktop from "../components/SidebarDesktop";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: getPermissionsUser } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  React.useEffect(() => {
    const linksAdmin = [
      "/add-user",
      "/add-team",
      "/add-team/permissions",
      "/add-team/members",
      "/add-group",
      "/apps/clone",
    ];

    if (
      localStorage.getItem("my-token") === null &&
      location.pathname !== "/signin"
    ) {
      navigate("/signin");
    }

    if (
      getPermissionsUser &&
      getPermissionsUser.length === 0 &&
      linksAdmin.includes(location.pathname)
    ) {
      navigate("/");
    }
  }, [location, getPermissionsUser]);

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
