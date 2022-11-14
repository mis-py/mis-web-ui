import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetPermissionsUserIdQuery, useUserLogoutMutation } from "../redux";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import useOutsideClick from "../hooks/useOutsideClick";

const ProfilePopup = ({ userPopup, setUserPopup, toggleDrawer }) => {
  const navigate = useNavigate();
  const [userLogout] = useUserLogoutMutation();

  // const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
  //   localStorage.getItem("user_id")
  // );

  const handleClickOutside = () => {
    setUserPopup(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  const handleLogOut = async (e) => {
    e.preventDefault();
    await userLogout();
    toggleDrawer();
    setTimeout(() => {
      localStorage.removeItem("my-token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      navigate("/singin");
    }, 300);
  };

  return (
    <div
      ref={refPopup}
      onClick={(e) => e.stopPropagation()}
      className={`${
        userPopup ? "opacity-100 visible" : "opacity-0 invisible"
      } absolute duration-300 right-5 w-[175px] top-16`}
    >
      <ul>
        <div
          onClick={() => {
            navigate(`/profile/${localStorage.getItem("user_id")}`);
            toggleDrawer();
          }}
          className="flex bg-backGround drop-shadow-lg items-center px-5 w-full gap-3 duration-300 group hover:bg-blackSecond"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiUser />
          </div>
          <h3 className="py-3 duration-300 group-hover:text-primary">
            Profile
          </h3>
        </div>
        <button
          onClick={() => {
            navigate(`/settings/${localStorage.getItem("user_id")}`);
            toggleDrawer();
          }}
          className="flex bg-backGround drop-shadow-lg items-center px-5 w-full gap-3 duration-300 group hover:bg-blackSecond"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiSettings />
          </div>
          <h3 className="py-3 duration-300 group-hover:text-primary">
            Settings
          </h3>
        </button>
        <button
          onClick={handleLogOut}
          className="flex bg-backGround drop-shadow-lg items-center px-5 w-full gap-3 duration-300 group hover:bg-blackSecond"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiLogOut />
          </div>
          <h3 className="py-3 duration-300 group-hover:text-primary">
            Log out
          </h3>
        </button>
      </ul>
    </div>
  );
};

export default ProfilePopup;
