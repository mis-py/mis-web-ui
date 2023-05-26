import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "redux/index";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import useOutsideClick from "hooks/useOutsideClick";

import { currentUserId } from "config/variables";

const ProfilePopupDesktop = ({ userPopup, setUserPopup }) => {
  const navigate = useNavigate();
  const [userLogout] = useUserLogoutMutation();

  const handleClickOutside = () => {
    setUserPopup(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  const handleLogOut = async (e) => {
    await userLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/signin");
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
        <button
          onClick={() => {
            navigate(`/profile/${currentUserId}`);
          }}
          className="flex bg-backGround drop-shadow-lg items-center px-5 w-full gap-3 duration-300 group hover:bg-blackSecond"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiUser />
          </div>
          <h3 className="py-3 duration-300 group-hover:text-primary">
            Profile
          </h3>
        </button>
        <button
          onClick={() => {
            navigate(`/settings/${localStorage.getItem("user_id")}`);
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

export default ProfilePopupDesktop;
