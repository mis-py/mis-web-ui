import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import SidebarDesktop from "layouts/Sidebar";
import Notifications from "components/Notifications";
import TopBar from "layouts/TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import webSocket from "../config/WebSocketConnection";

const MainLayout = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [notificationsCount, setNotificationsCount] = React.useState(0);

  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // redirect to login if user not authorized
  if (!isAuthenticated) {
      return <Navigate to='/login' state={{from: location}} />
  }

    // webSocket.onopen = function (e) {
    //     webSocket.send('{"subscribe": "notifications"}');
    // }

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-none">
          <SidebarDesktop />
        </div>
        <div className="flex flex-col flex-grow">
          <TopBar />
          <div className="py-1">
            <div className="flex flex-col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
