import React from "react";
import { NavLink } from "react-router-dom";
import { useGetModulesQuery } from "redux/index";
import { firstUppercase } from "config/functions";

import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { RiAppsLine } from "react-icons/ri";

import ProfilePopupDesktop from "components/ProfilePopupDesktop";

import { sidebar } from "config/variables";

const SidebarDesktop = () => {
  const [userPopup, setUserPopup] = React.useState(false);
  const [showListApps, setShowListApps] = React.useState(false);

  const { data: getModules = [] } = useGetModulesQuery();

  return (
    <>
      <div className="hidden fixed h-full w-full bg-backGround text-gray py-6 lg:flex lg:w-[345px] lg:border-r lg:border-blackSecond lg:z-30">
        <div className="flex flex-col">
          <div className="relatie flex mb-4 px-5">
            <ProfilePopupDesktop
              userPopup={userPopup}
              setUserPopup={setUserPopup}
            />
            <div className="flex flex-auto gap-[10px]">
              <div className="flex flex-auto">
                <button className="flex justify-center items-center w-[32px] h-[32px] rounded-l bg-blackSecond">
                  <FiSearch />
                </button>
                <input
                  className="bg-[#3F3F3F] rounded-r w-full border-0 px-3 h-[32px] focus-visible:outline-none"
                  type="text"
                />
              </div>
              <div className="flex gap-[10px]">
                <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond">
                  <FiBell />
                </button>
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
              >
                <div className="duration-300 group-hover:text-primary">
                  {link.icon}
                </div>
                <h3 className="py-3 duration-300 group-hover:text-primary">
                  {link.title}
                </h3>
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
                <h3 className="py-3 duration-300 group-hover:text-primary">
                  List Apps
                </h3>
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
                      <h3 className="py-3 duration-300 group-hover:text-primary">
                        {firstUppercase(module.name)}
                      </h3>
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

export default SidebarDesktop;
