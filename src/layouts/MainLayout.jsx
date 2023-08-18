import React from "react";
import { Outlet } from "react-router-dom";

import SidebarDesktop from "components/SidebarDesktop";

import Notifications from "components/Notifications";
import TopBar from "components/TopBar";
// import webSocket from "../config/WebSocketConnection";

const MainLayout = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [notificationsCount, setNotificationsCount] = React.useState(0);

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
