import React from "react";
import { Outlet, useLocation, Navigate, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import SidebarDesktop from "layouts/Sidebar";
import Notifications from "components/notifications/Notifications";
import TopBar from "layouts/TopBar";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery } from "redux/index";
// import webSocket from "../config/WebSocketConnection";
import { NavLink, Route } from "react-router-dom";
import { useGetModulesQuery } from "redux/index";
import { firstUppercase } from "config/functions";
import { RiAppsLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { BiTask, BiUser } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdGroups, MdTask } from "react-icons/md";
import { useGetMyPermissionsQuery } from "redux/index";
import { userRoutes } from "routes/users";
import { teamRoutes } from "routes/teams";
import { groupRoutes } from "routes/groups";
import { appRoutes } from "routes/apps";
import { taskRoutes } from "routes/tasks";
import { consumersRoutes } from "routes/consumers";
// import ProfilePopupDesktop from "components/ProfilePopupDesktop";
// import Notifications from "components/notifications/Notifications";

// import AdminWrapper from "config/AdminWrapper";
// import SidebarStyles from "assets/css/components/Sidebar.module.css";
import { FiHome, FiCpu } from "react-icons/fi";
import useModuleRoutes from "routes/modules";

export const sidebar = [
  { icon: <BiUser />, title: "Users", url: "/users" },
  { icon: <FiUsers />, title: "Teams", url: "/teams" },
  { icon: <MdGroups />, title: "Access Groups", url: "/groups" },
  { icon: <AiOutlineAppstore />, title: "Applications", url: "/apps", },
  { icon: <BiTask />, title: "Tasks", url: "/tasks", },
  { icon: <MdTask />, title: "Consumers", url: "/consumers", },
];

const MainLayout = () => {
  // const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  // const [notificationsCount, setNotificationsCount] = React.useState(0);

  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { theme: currentTheme } = useSelector((state) => state.profile);
  // load user information
  const {
    data: getUserId = [],
    isLoading: loadingUserId,
    refetch: refetchProfileData,
  } = useGetMeQuery({skip: !isAuthenticated});

  const modules = useModuleRoutes();

  const { data: myPermission = {}, isLoading } = useGetMyPermissionsQuery({skip: !isAuthenticated});

  // redirect to login if user not authorized
    if (!isAuthenticated) {
      return <Navigate to='/login' state={{from: location}} />
  }
    // webSocket.onopen = function (e) {
    //     webSocket.send('{"subscribe": "notifications"}');
    // }



  const hasSudoPermission = myPermission.allIds?.find((id)=> myPermission.entities[id].permission.scope === 'core:sudo') !== undefined;

  // if (!isLoading && data && data[0] !== undefined && data[0].permission.scope === "core:sudo") {
  //   return <>{children}</>;
  // } else if (data === []) {
  //   return false;
  // } else {
  //   return false;
  // }

  const adminNav = hasSudoPermission && 
  <li>
    <details open={false}>
      <summary>
        <FiCpu />
        Administration
      </summary>
      <ul>{sidebar.map((link) => (
        <li key={link.title}>
          <NavLink to={link.url}>
            {link.icon}{link.title}
          </NavLink>
        </li>))}
      </ul>
    </details>
  </li>

  let adminRoutes = [].concat(userRoutes, teamRoutes, groupRoutes, appRoutes, taskRoutes, consumersRoutes);
  adminRoutes =  hasSudoPermission && adminRoutes.map((item, index) => (<Route key={`${item.path}_${index}`} path={item.path} element={item.element}/>));

  const activeModules = modules?.filter((item) => item.enabled && item.id != 1);

  const modulesNav = activeModules?.map((item, index) =>(
    <NavLink to={`/${item.path}`}>
      <RiAppsLine />{firstUppercase(item.name)}
    </NavLink>
  ));

  const modulesRoutes = activeModules?.map((item, index) => (<Route key={`${item.path}_${index}`} path={item.path} element={item.element}/>));

  return (
      <>
        <div className="flex max-h-screen flex-row overflow-hidden" data-theme={currentTheme}>
          <SidebarDesktop adminNav={adminNav} modulesNav={modulesNav} />
          <div className="flex flex-col flex-5 overflow-y-auto">
            <TopBar />
            <div className="flex flex-row shadow-mis-tl-1 p-4 pb-0 overflow-hidden">
              {/* <Outlet /> */}
              <Routes>
                {adminRoutes}
                {modulesRoutes}
              </Routes>
            </div>
          </div>
          <ToastContainer />
        </div>

      </>
  );
};

export default MainLayout;
