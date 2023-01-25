import React from "react";
import { NavLink } from "react-router-dom";
import { useGetModulesQuery } from "redux/index";
import { firstUppercase } from "config/functions";

import { FiUser, FiUsers } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdGroups } from "react-icons/md";

import ProfilePopup from "components/ProfilePopup";

const Sidebar = ({ toggleDrawer }) => {
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
                      to={`/api${item.front_bundle_path}`}
                      key={item.id}
                    >
                      <div className="duration-300 group-hover:text-primary">
                        <AiOutlineAppstore />
                      </div>
                      <h3 className="py-3 duration-300 group-hover:text-primary">
                        {firstUppercase(item.name)}
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

export default Sidebar;
