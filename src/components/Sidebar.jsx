import React from "react";
import { NavLink } from "react-router-dom";
import { useGetModulesQuery } from "redux/index";
import { firstUppercase } from "config/functions";

import ProfilePopup from "components/ProfilePopup";

import { FiUser } from "react-icons/fi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { RiAppsLine } from "react-icons/ri";
import { sidebar } from "config/variables";

const Sidebar = ({ toggleDrawer }) => {
  const { data: getModules = [] } = useGetModulesQuery();
  const [userPopup, setUserPopup] = React.useState(false);
  const [showListApps, setShowListApps] = React.useState(false);

  return (
    <>
      <div className="fixed h-full w-full bg-backGround text-gray py-6">
        <div className="flex flex-col">
          <div className="relatie flex mb-4 px-5">
            <ProfilePopup
              userPopup={userPopup}
              setUserPopup={setUserPopup}
              toggleDrawer={toggleDrawer}
            />
            <div className="flex flex-auto gap-[10px]">
              <div className="flex flex-auto">
                <h2 className="text-white body-2">
                  ECRM - {localStorage.getItem("user_name")}
                </h2>
              </div>
              <div className="flex gap-[10px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserPopup(!userPopup);
                  }}
                  className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond"
                >
                  <FiUser />
                </button>
              </div>
            </div>
          </div>

          <ul>
            {sidebar.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `flex items-center px-5 gap-3 duration-300 group text-primary bg-blackSecond`
                    : `flex items-center px-5 gap-3 duration-300 group hover:bg-blackSecond`
                }
                to={link.url}
                key={link.title}
                onClick={toggleDrawer}
              >
                <div className="duration-300 group-hover:text-primary">
                  {link.icon}
                </div>
                <div className="py-3 duration-300 group-hover:text-primary">
                  {link.title}
                </div>
              </NavLink>
            ))}
            <div
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
            </div>
            <div
              className={`${
                showListApps ? "opacity-100 visible" : "opacity-0 invisible"
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
                      <div className="py-3 duration-300 group-hover:text-primary">
                        {firstUppercase(module.name)}
                      </div>
                    </NavLink>
                  )
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
