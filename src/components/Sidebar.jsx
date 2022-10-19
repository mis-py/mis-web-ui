import React from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiBell, FiUser, FiUsers } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { AiOutlineAppstore, AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiOutlineDesktopComputer } from "react-icons/hi";

import ProfilePopup from "./ProfilePopup";

const Sidebar = ({ toggleDrawer }) => {
  const [userPopup, setUserPopup] = React.useState(false);

  const sidebar = [
    { icon: <BiUser />, title: "Users", url: "/users" },
    { icon: <FiUsers />, title: "Teams", url: "/teams" },
    {
      icon: <AiOutlineAppstore />,
      title: "Applications",
      url: "/applications",
    },
    {
      icon: <AiOutlineAppstoreAdd />,
      title: "Using applications",
      url: "/using-applications",
    },
    {
      icon: <HiOutlineDesktopComputer />,
      title: "WebCatalog",
      url: "/webcatalog",
    },
  ];

  return (
    <>
      <div className="fixed h-full w-full bg-backGround text-gray py-6">
        <div className="flex flex-col">
          <div className="relatie flex mb-4 px-5">
            <ProfilePopup userPopup={userPopup} setUserPopup={setUserPopup} />
            <div className="flex flex-auto gap-[10px]">
              <div className="flex flex-auto">
                <button className="flex justify-center items-center w-[32px] h-[32px] rounded-l bg-blackSecond">
                  <FiSearch />
                </button>
                <input className="bg-[#3F3F3F] rounded-r w-full" type="text" />
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
                onClick={toggleDrawer}
              >
                <div className="duration-300 group-hover:text-primary">
                  {link.icon}
                </div>
                <h3 className="py-3 duration-300 group-hover:text-primary">
                  {link.title}
                </h3>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
