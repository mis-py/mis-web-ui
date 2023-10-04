import { useEffect, useState, React } from "react";
import { Outlet, useLocation , Navigate, Routes } from "react-router-dom";
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
import { FiHome, FiCpu, FiUsers } from "react-icons/fi";
import useModuleRoutes from "routes/modules";
import Home from "modules/core/Home";

let adminNavs = [
  { icon: <BiUser />, title: "Users", url: "/users" },
  { icon: <FiUsers />, title: "Teams", url: "/teams" },
  { icon: <MdGroups />, title: "Access Groups", url: "/groups" },
  { icon: <AiOutlineAppstore />, title: "Applications", url: "/apps", },
  { icon: <BiTask />, title: "Tasks", url: "/tasks", },
  { icon: <MdTask />, title: "Consumers", url: "/consumers", },
];

const getNavLink = (displayName, path, icon) => <NavLink to={path}>{icon}{displayName}</NavLink>

// TODO prevent reload page if location not changed
const MainLayout = () => {
    // const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    // const [notificationsCount, setNotificationsCount] = React.useState(0);
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);

    const [transitionStage, setTransistionStage] = useState("fadeIn");

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { theme: currentTheme } = useSelector((state) => state.profile);
    // load user information
    // const {
    //   data: getUserId = [],
    //   isLoading: loadingUserId,
    //   refetch: refetchProfileData,
    // } = useGetMeQuery({skip: !isAuthenticated});

    const modules = useModuleRoutes();

    const { data: myPermission = {}, isLoading } = useGetMyPermissionsQuery({skip: !isAuthenticated});

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

    let mainNavBar = [<li key={0}>{getNavLink("Home", "/home", <FiHome/>)}</li>];
    let routes = [<Route index key="home" path="/home" element={<Home/>} />];

    const hasSudoPermission = myPermission.allIds?.find((id)=> myPermission.entities[id].permission.scope === 'core:sudo') !== undefined;

    if (hasSudoPermission){
      let adminRoutes = [].concat(userRoutes, teamRoutes, groupRoutes, appRoutes, taskRoutes, consumersRoutes);
      //let menuIsOpen = adminRoutes.filter(item => item.path.includes(location.pathname)).length > 0;
      let menuIsOpen = true;
      mainNavBar.push(<li key={mainNavBar.length}>
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
        mainNavBar.push(<li key={index+mainNavBar.length}>
          <NavLink to={`/${item.path}`}>
            <RiAppsLine />{firstUppercase(item.name)}
          </NavLink>
        </li>)
      ));

      let modulesRoutes = activeModules.map((item, index) => (<Route key={`${item.path}_${index}`} path={item.path} element={item.element}/>));

      routes = routes.concat(modulesRoutes);
    }

    return (
        <>
          <div className="flex max-h-screen flex-row overflow-hidden" data-theme={currentTheme}>
            <SidebarDesktop sidebarNav={mainNavBar} />
            <div className="flex flex-col flex-5 overflow-y-auto">
              <TopBar />
              <div className="flex flex-row shadow-mis-tl-1 p-4 pb-0 h-screen overflow-hidden">
                <div 
                  className={`flex flex-5 flex-col flex-grow overflow-y-hidden ${transitionStage}`} 
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
            <ToastContainer />
          </div>
        </>
    );
};

export default MainLayout;
