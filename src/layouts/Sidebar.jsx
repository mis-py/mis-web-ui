import React from "react";
import { NavLink } from "react-router-dom";
// import ProfilePopupDesktop from "components/ProfilePopupDesktop";
// import Notifications from "components/notifications/Notifications";

// import AdminWrapper from "config/AdminWrapper";
// import SidebarStyles from "assets/css/components/Sidebar.module.css";
import { FiHome } from "react-icons/fi";



const SidebarDesktop = ({adminNav, modulesNav }) => {
  // const [userPopup, setUserPopup] = React.useState(false);

  //const { data: getModules = [] } = useGetModulesQuery();
  // const handleButtonClick = () => {
  //   setIsPopupOpen(!isPopupOpen);
  //   setNotificationsCount(0);
  // };

  return (
    <nav className="flex flex-col menu bg-base-100">
      <ul>
        <li>
          <NavLink to="/">
            <FiHome/>Home
          </NavLink>
        </li>
        {adminNav}
        {modulesNav.map((item, index)=> <li key={index}>{item}</li>)}
      </ul>
    </nav>
  );
};

export default SidebarDesktop;
