import React from "react";
import { NavLink } from "react-router-dom";
import { useGetModulesQuery } from "redux/index";
import { firstUppercase } from "config/functions";

import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { RiAppsLine } from "react-icons/ri";

import ProfilePopupDesktop from "components/ProfilePopupDesktop";
import Notifications from "./Notifications";

import { sidebar } from "config/variables";
import AdminWrapper from "config/AdminWrapper";
import SidebarStyles from "../assets/css/components/Sidebar.module.css";

const SidebarDesktop = () => {
  // const [userPopup, setUserPopup] = React.useState(false);
  const [showListApps, setShowListApps] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [notificationsCount, setNotificationsCount] = React.useState(0);

  const { data: getModules = [] } = useGetModulesQuery();
  // const handleButtonClick = () => {
  //   setIsPopupOpen(!isPopupOpen);
  //   setNotificationsCount(0);
  // };

  return (
    <>
      {/* <div className="hidden fixed h-full w-full bg-backGround text-gray py-6 lg:flex lg:w-[200px] lg:border-r lg:border-blackSecond lg:z-30"> */}
        <div className="flex flex-col">
          <ul className={`${SidebarStyles.sidebar} overflow-auto`}>
            <AdminWrapper>
            {sidebar.map((link) => (
              <li key={link.title}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center px-5 gap-3 duration-300 group text-primary bg-blackSecond`
                      : `flex items-center px-5 gap-3 duration-300 group hover:bg-blackSecond`
                  }
                  to={link.url}
                >
                  <div className="duration-300 group-hover:text-primary">
                    {link.icon}
                  </div>
                  <h3 className="py-3 duration-300 group-hover:text-primary">
                    {link.title}
                  </h3>
                </NavLink>
              </li>
            ))}
            </AdminWrapper>
            <li
              className={`flex items-center justify-between px-5 gap-3 duration-300 group cursor-pointer hover:bg-blackSecond`}
              onClick={() => setShowListApps(!showListApps)}
            >
              <div className="flex items-center gap-3">
                <div className="duration-300 group-hover:text-primary">
                  <AiOutlineAppstoreAdd />
                </div>
                <div className="py-3 duration-300 group-hover:text-primary">
                  List Apps
                </div>
              </div>
              <IoIosArrowForward
                className={`${showListApps ? "rotate-90" : ""} duration-300`}
              />
            </li>
            <li
              className={`${showListApps ? "opacity-100 visible" : "h-0 opacity-0 invisible"
                } flex flex-col duration-300`}
            >
              {getModules?.map(
                (module) =>
                  module.enabled && (
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `flex items-center pl-11 pr-5 gap-3 duration-300 group text-primary bg-blackSecond`
                          : `flex items-center pl-11 pr-5 gap-3 duration-300 group hover:bg-blackSecond`
                      }
                      to={`/${module.name}`}
                      key={module.id}
                    >
                      <div className="duration-300 group-hover:text-primary">
                        <RiAppsLine />
                      </div>
                      <h3 className="py-3 duration-300 group-hover:text-primary">
                        {firstUppercase(module.name)}
                      </h3>
                    </NavLink>
                  )
              )}
            </li>
          </ul>
        </div>
      {/* </div> */}
    </>
  );
};

export default SidebarDesktop;
