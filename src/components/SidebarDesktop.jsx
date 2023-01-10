import React from "react";
import { NavLink } from "react-router-dom";
import { useGetModulesQuery } from "../redux";

import { FiSearch, FiBell, FiUser, FiUsers } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdGroups } from "react-icons/md";

import ProfilePopupDesktop from "./ProfilePopupDesktop";

const SidebarDesktop = () => {
  const { data: getModules } = useGetModulesQuery();
  const [userPopup, setUserPopup] = React.useState(false);

  const sidebar = [
    { icon: <BiUser />, title: "Users", url: "/users" },
    { icon: <FiUsers />, title: "Teams", url: "/teams" },
    { icon: <MdGroups />, title: "Groups", url: "/groups" },
    {
      icon: <AiOutlineAppstore />,
      title: "Applications",
      url: "/apps",
    },
  ];

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
            {getModules &&
              getModules.map(
                (item) =>
                  item.enabled && (
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `flex items-center px-5 gap-3 duration-300 group text-primary bg-blackSecond`
                          : `flex items-center px-5 gap-3 duration-300 group hover:bg-blackSecond`
                      }
                      to={item.name}
                      key={item.id}
                    >
                      <div className="duration-300 group-hover:text-primary">
                        <AiOutlineAppstore />
                      </div>
                      <h3 className="py-3 duration-300 group-hover:text-primary">
                        {item.name}
                      </h3>
                    </NavLink>
                  )
              )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarDesktop;
