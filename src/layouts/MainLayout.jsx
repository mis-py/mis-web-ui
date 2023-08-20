import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import SidebarDesktop from "components/SidebarDesktop";
import Notifications from "components/Notifications";
import TopBar from "components/TopBar";
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
      {/* <div className={`${isPopupOpen ? "flex" : "hidden"} absolute rounded-lg block text-gray duration-300 cursor-pointer bg-blackSecond hover:bg-blackSecond`}>
        <Notifications isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} notificationsCount={notificationsCount} setNotificationsCount={setNotificationsCount} className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"/>
      </div> */}
      <div className="flex flex-row">
        <div className="flex flex-none">
          <SidebarDesktop />
        </div>
        <div className="flex flex-col flex-grow">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
