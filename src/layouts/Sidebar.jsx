import React from "react";

// import ProfilePopupDesktop from "components/ProfilePopupDesktop";
// import Notifications from "components/notifications/Notifications";

// import AdminWrapper from "config/AdminWrapper";
// import SidebarStyles from "assets/css/components/Sidebar.module.css";



const SidebarDesktop = ({sidebarNav}) => {
  return (
    <nav className="min-h-screen flex flex-col menu bg-base-100 w-4/5 md:w-auto">
      <ul>
        {sidebarNav}
      </ul>
    </nav>
  );
};

export default SidebarDesktop;
