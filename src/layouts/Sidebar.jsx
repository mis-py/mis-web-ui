import React from "react";
import { NavLink } from "react-router-dom";
import { useGetModulesQuery } from "redux/index";
import { firstUppercase } from "config/functions";

import { IoIosArrowForward } from "react-icons/io";
import { RiAppsLine } from "react-icons/ri";

// import ProfilePopupDesktop from "components/ProfilePopupDesktop";
// import Notifications from "components/notifications/Notifications";

import { sidebar } from "config/variables";
// import AdminWrapper from "config/AdminWrapper";
import SidebarStyles from "assets/css/components/Sidebar.module.css";
import { FiHome, FiCpu } from "react-icons/fi";

const SidebarDesktop = () => {
  // const [userPopup, setUserPopup] = React.useState(false);
  const [showAdminSection, setShowAdminSection] = React.useState(true);

  const { data: getModules = [] } = useGetModulesQuery();
  // const handleButtonClick = () => {
  //   setIsPopupOpen(!isPopupOpen);
  //   setNotificationsCount(0);
  // };

  const adminMenu = sidebar.map((link) => (
    <li key={link.title}>
      <NavLink to={link.url}>
        {link.icon}{link.title}
      </NavLink>
    </li>
  ))

  const modulesMenu = getModules?.filter((item) => item.enabled && item.id != 1).map((module) =>(
    <li key={module.id}>
      <NavLink to={`/${module.name}`}>
        <RiAppsLine />{firstUppercase(module.name)}
      </NavLink>
    </li>
  ))

  return (
    <nav className="flex flex-col menu bg-base-100">
      <ul>
        <li>
          <NavLink to="/">
            <FiHome/>Home
          </NavLink>
        </li>
        <li>
          <details open={false}>
            <summary>
              <FiCpu />
              Administration
            </summary>
            <ul>{adminMenu}</ul>
          </details>
        </li>
      {modulesMenu}
      </ul>
    </nav>
  );
};

export default SidebarDesktop;
