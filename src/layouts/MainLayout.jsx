import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import SidebarDesktop from "layouts/Sidebar";
import Notifications from "components/notifications/Notifications";
import TopBar from "layouts/TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery } from "redux/index";
// import webSocket from "../config/WebSocketConnection";

const MainLayout = () => {
  // const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  // const [notificationsCount, setNotificationsCount] = React.useState(0);

  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // load user information
  const {
    data: getUserId = [],
    isLoading: loadingUserId,
    refetch: refetchProfileData,
  } = useGetMeQuery({skip: !isAuthenticated});


  // redirect to login if user not authorized
    if (!isAuthenticated) {
      return <Navigate to='/login' state={{from: location}} />
  }
    // webSocket.onopen = function (e) {
    //     webSocket.send('{"subscribe": "notifications"}');
    // }

  return (
      <div className="flex max-h-screen flex-row overflow-hidden">
        <SidebarDesktop />
        <div className="flex flex-col flex-5 overflow-y-auto">
          <TopBar />
          <div className="flex flex-row shadow-mis-tl-1 p-4 pb-0 overflow-hidden">
            <Outlet />
            <SidebarDesktop />
          </div>
        </div>
        <ToastContainer />
      </div>
  );
};

export default MainLayout;
