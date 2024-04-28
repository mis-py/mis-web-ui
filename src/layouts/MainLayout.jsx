import { useEffect, useState, React, useMemo } from "react";
import { NavLink, Route, Outlet, useLocation , Navigate, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import SidebarDesktop from "layouts/Sidebar";
import Notifications from "components/notifications/Notifications";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
//import { useGetMeQuery } from "redux/index";
// import webSocket from "../config/WebSocketConnection";
import { useGetModulesQuery } from "redux/index";
import { firstUppercase } from "config/functions";
import { RiAppsLine } from "react-icons/ri";
import { BiTask, BiUser, BiNotification } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdGroups, MdTask } from "react-icons/md";
import { useGetMyGrantedPermissionsQuery, filterHasCoreSudoSelector } from "redux/api/permissionsApi";
import { userRoutes } from "routes/users";
import { teamRoutes } from "routes/teams";
import { groupRoutes } from "routes/groups";
import { appRoutes } from "routes/apps";
import { taskRoutes } from "routes/tasks";
import { consumersRoutes } from "routes/consumers";
import { notificationsRoutes } from 'routes/notifications';
import { FiHome, FiCpu, FiUsers, FiMoreVertical } from "react-icons/fi";
import useModuleRoutes from "routes/modules";
import Home from "modules/core/Home";
import 'react-confirm-alert/src/react-confirm-alert.css';
import TopBar from "layouts/TopBar";

let adminNavs = [
  { icon: <BiUser />, title: "Users", url: "/users" },
  { icon: <FiUsers />, title: "Teams", url: "/teams" },
  // { icon: <MdGroups />, title: "Access Groups", url: "/groups" },
  { icon: <AiOutlineAppstore />, title: "Modules", url: "/modules" },
  { icon: <BiTask />, title: "Jobs", url: "/jobs" },
  // { icon: <MdTask />, title: "Consumers", url: "/consumers", },
  // { icon: <BiNotification />, title: "Notifications", url: "/notifications" }
];

const getNavLink = (displayName, path, icon) => <NavLink to={path}>{icon}{displayName}</NavLink>

// TODO prevent reload page if location not changed
const MainLayout = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    // const [notificationsCount, setNotificationsCount] = React.useState(0);
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);

    const [transitionStage, setTransistionStage] = useState("fadeIn");

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { theme: currentTheme } = useSelector((state) => state.profile);

    const modules = useModuleRoutes(isAuthenticated);

    const userHasCoreSudoPermissions = useMemo(filterHasCoreSudoSelector, []);

    const { data: myPermission = {}, isLoading, isSuccess, error, hasCoreSudo } = useGetMyGrantedPermissionsQuery({skip: !isAuthenticated}, {
      selectFromResult: (result) => ({
        ...result,
        hasCoreSudo: userHasCoreSudoPermissions(result)
      })
    });

    useEffect(() => {
      if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    // redirect to login if user not authorized
    if (!isAuthenticated) {
      return <Navigate to='/login' state={{from: location}} />
    }
      // webSocket.onopen = function (e) {
      //     webSocket.send('{"subscribe": "notifications"}');
      // }

    let mainNavBar = [<li onClick={() => setIsDrawerOpened(false)} key={0}>{getNavLink("Home", "/home", <FiHome/>)}</li>];
    let routes = [<Route index key="home" path="/home" element={<Home/>} />];

    if (hasCoreSudo){
      let adminRoutes = [].concat(userRoutes, teamRoutes, groupRoutes, appRoutes, taskRoutes, consumersRoutes, notificationsRoutes);
      //let menuIsOpen = adminRoutes.filter(item => item.path.includes(location.pathname)).length > 0;
      let menuIsOpen = true;
      mainNavBar.push(<li onClick={() => setIsDrawerOpened(false)} key={mainNavBar.length}>
          <details open={menuIsOpen}>
            <summary><FiCpu />Administration</summary>
            <ul>{adminNavs.map((link) => (
              <li key={link.title}>
                <NavLink 
                  to={link.url}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "disabled"
                  }  
                >
                  {link.icon}{link.title}
                </NavLink>
              </li>))}
            </ul>
          </details>
        </li>
      );

      adminRoutes = adminRoutes.map((item, index) => (<Route key={`${item.path}_${index}`} path={item.path} element={item.element}/>));

      routes = routes.concat(adminRoutes);
    }

    const activeModules = modules?.filter((item) => item.enabled && item.id != 1);
    
    if (activeModules.length){
      activeModules.forEach((item, index) =>(
        mainNavBar.push(<li onClick={() => setIsDrawerOpened(false)} key={index+mainNavBar.length}>
          <NavLink to={`/${item.path}`}>
            <RiAppsLine />{firstUppercase(item.name)}
          </NavLink>
        </li>)
      ));

      let modulesRoutes = activeModules.map((item, index) => (<Route key={`${item.path}_${index}`} path={`${item.path}/*`} element={item.element}/>));

      routes = routes.concat(modulesRoutes);
    }

    return (
        <div className="max-h-screen overflow-hidden drawer md:drawer-open" data-theme={currentTheme}>
          <input id="sidebar" type="checkbox" checked={isDrawerOpened} className="drawer-toggle" readOnly />

          <div className="drawer-content">
            <div className="flex flex-col overflow-y-auto max-h-screen">
              <TopBar>
                {/* <label htmlFor="sidebar" className="drawer-button md:hidden"> */}
                  <FiMoreVertical className="md:hidden" onClick={() => setIsDrawerOpened(true)} />
                  {/* </label> */}
              </TopBar>

              <div className="flex flex-row shadow-mis-tl-1 p-4 pb-0 h-screen overflow-hidden">
                <div 
                  className={`flex flex-col flex-grow overflow-y-hidden ${transitionStage}`} 
                  onAnimationEnd={() => {
                    if (transitionStage === "fadeOut") {
                      setTransistionStage("fadeIn");
                      setDisplayLocation(location);
                    }
                  }}
                >
                  <Routes location={displayLocation}>{routes}</Routes>
                </div>
              </div>
            </div>
          </div>

          <div className="drawer-side">
            <label 
              // htmlFor="sidebar" 
              // aria-label="close sidebar" 
              className="drawer-overlay" 
              onClick={() => setIsDrawerOpened(false)} />

            <SidebarDesktop sidebarNav={mainNavBar} />
          </div>

          <ToastContainer />
        </div>
    );
};

export default MainLayout;
