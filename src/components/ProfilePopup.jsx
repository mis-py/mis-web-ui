import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "redux/index";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import useOutsideClick from "hooks/useOutsideClick";

const ProfilePopup = ({ userPopup, setUserPopup, toggleDrawer }) => {
  const navigate = useNavigate();
  const [userLogout] = useUserLogoutMutation();

  const handleClickOutside = () => {
    setUserPopup(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  const handleLogOut = async (e) => {
    e.preventDefault();
    await userLogout().then(() => {
      toggleDrawer();
      localStorage.removeItem("my-token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");

      // setTimeout(() => {
        navigate("/signin");
      // }, 100);
    });
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
            navigate(`/profile/${localStorage.getItem('user_id')}`);
            toggleDrawer();
          }}
          className="flex bg-backGround drop-shadow-lg items-center px-5 w-full gap-3 duration-300 group hover:bg-blackSecond"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiUser />
          </div>
          <span className="py-3 duration-300 group-hover:text-primary">
            Profile
          </span>
        </button>
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
          <span className="py-3 duration-300 group-hover:text-primary">
            Settings
          </span>
        </button>
        <button
          onClick={handleLogOut}
          className="flex bg-backGround drop-shadow-lg items-center px-5 w-full gap-3 duration-300 group hover:bg-blackSecond"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiLogOut />
          </div>
          <span className="py-3 duration-300 group-hover:text-primary">
            Log out
          </span>
        </button>
      </ul>
    </div>
  );
};

export default ProfilePopup;
