import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "redux/index";
import { FiUser, FiLogOut } from "react-icons/fi";
import useOutsideClick from "hooks/useOutsideClick";

const ProfilePopupDesktop = ({ userPopup, setUserPopup }) => {
  const navigate = useNavigate();
  const [userLogout] = useUserLogoutMutation();

  const handleClickOutside = () => {
    setUserPopup(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  const handleLogOut = async (e) => {
    await userLogout().then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      window.location.reload();
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

export default ProfilePopupDesktop;
