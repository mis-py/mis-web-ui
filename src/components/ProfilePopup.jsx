import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import useOutsideClick from "../hooks/useOutsideClick";

const ProfilePopup = ({ userPopup, setUserPopup }) => {
  const navigate = useNavigate();
  const handleClickOutside = () => {
    setUserPopup(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("my-token");
    navigate("/singin");
  };

  return (
    <div
      ref={refPopup}
      onClick={(e) => e.stopPropagation()}
      className={`${
        userPopup ? "opacity-100 visible" : "opacity-0 invisible"
      } absolute duration-300 right-5 top-16`}
    >
      <ul>
        <Link
          className="flex bg-backGround drop-shadow-lg items-center px-5 gap-3 duration-300 group hover:bg-blackSecond"
          to="/profile"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiUser />
          </div>
          <h3 className="py-3 duration-300 group-hover:text-primary">
            Profile
          </h3>
        </Link>
        <Link
          className="flex bg-backGround drop-shadow-lg items-center px-5 gap-3 duration-300 group hover:bg-blackSecond"
          to="/settings"
        >
          <div className="duration-300 group-hover:text-primary">
            <FiSettings />
          </div>
          <h3 className="py-3 duration-300 group-hover:text-primary">
            Settings
          </h3>
        </Link>
        <button
          onClick={handleLogOut}
          className="flex bg-backGround drop-shadow-lg items-center px-5 gap-3 duration-300 group hover:bg-blackSecond"
          to="/profile"
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
