import React from "react";

// import ProfilePopupDesktop from "components/ProfilePopupDesktop";
// import Notifications from "components/notifications/Notifications";

// import AdminWrapper from "config/AdminWrapper";
// import SidebarStyles from "assets/css/components/Sidebar.module.css";



const SidebarDesktop = ({sidebarNav}) => {
  return (
    <nav className="flex flex-col menu bg-base-100">
      <ul>
        {sidebarNav}
      </ul>
    </nav>
  );
};

export default SidebarDesktop;
