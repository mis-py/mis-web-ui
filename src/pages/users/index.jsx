import React from "react";
import { toast } from "react-toastify";
import { useGetUsersQuery, useGetPermissionsUserIdQuery } from "../../redux";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FiSearch, FiUserPlus } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import UserImg from "../../assets/img/user.png";

const Users = () => {
  const navigate = useNavigate();
  const { data: dataGetUsers = [], error: errorGetUsers } = useGetUsersQuery();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  const [showSearch, setShowSearch] = React.useState(false);
  const [showUserInfo, setShowUserInfo] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  React.useEffect(() => {
    if (errorGetUsers) {
      toast.error("No users found");
    }
  }, [errorGetUsers]);

  const toggle = (index) => {
    if (showUserInfo === index) {
      setShowUserInfo(false);
      return;
    }
    setShowUserInfo(index);
  };
  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(false);
      return;
    }
    setShowEdit(index);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex flex-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch ? "rounded-l-lg" : "rounded-lg"
              } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
            >
              <FiSearch />
            </button>
            <input
              className={`${
                showSearch ? "w-full px-3" : "w-0 px-0"
              } bg-[#3F3F3F] duration-300 rounded-r w-full focus-visible:outline-none focus:outline-none`}
              type="text"
            />
          </div>
          {getPermissionsUserId && getPermissionsUserId.length !== 0 ? (
            <Link
              to="/add-user"
              className="px-5 flex items-center justify-center bg-blackSecond rounded-lg"
            >
              <FiUserPlus />
            </Link>
          ) : (
            false
          )}
        </div>

        <h3 className="h3 mb-5">Users ({dataGetUsers.length})</h3>
        <div className="flex flex-col gap-4">
          {dataGetUsers &&
            dataGetUsers.map((user, index) => (
              <div
                key={user.id}
                className="flex flex-col relative bg-blackSecond px-4 py-2 rounded lg:p-6"
              >
                <div
                  ref={refPopup}
                  className={`${
                    showEdit === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-16`}
                >
                  <div
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="px-7 py-1 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                  >
                    Profile
                  </div>
                  {getPermissionsUserId && getPermissionsUserId.length !== 0 ? (
                    <div
                      onClick={(e) => navigate(`/users/${user.id}`)}
                      className="px-7 py-1 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                    >
                      Editing
                    </div>
                  ) : (
                    false
                  )}
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-backGround lg:border-none lg:pb-0">
                  <div className="lg:flex lg:items-center">
                    <div className="flex flex-col lg:pr-[40px] lg:border-r lg:border-gray">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-[32px] h-[32px]"
                          src={UserImg}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <h5 className="text-gray text-xs">Name:</h5>
                          <h4>{user.username}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-col px-[40px] text-center lg:border-r lg:border-gray">
                      <div
                        className={`duration-300 flex flex-col pt-4 lg:pt-0`}
                      >
                        <p className="text-gray text-xs">Team or position : </p>
                        <p>{user.team === null ? "NO TEAM" : user.team.name}</p>
                      </div>
                    </div>
                    <div className="hidden lg:flex lg:pl-[40px] lg:pr-5 gap-3">
                      <div
                        className={`${
                          user.signed_in ? "border-primary" : "border-danger"
                        } border rounded-full text-center py-1 px-5 text-sm text-gray`}
                      >
                        Sing in:
                        {user.signed_in ? (
                          <p className="text-base text-white">Active</p>
                        ) : (
                          <p className="text-base text-white">Disabled</p>
                        )}
                      </div>
                      <div
                        className={`${
                          user.signed_in ? "border-primary" : "border-danger"
                        } border rounded-full text-center py-1 px-5 text-sm text-gray`}
                      >
                        Status:
                        {user.disabled ? (
                          <p className="text-base text-white">Active</p>
                        ) : (
                          <p className="text-base text-white">Disabled</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <BiDotsVerticalRounded
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEdit(index);
                    }}
                    className="text-3xl text-gray cursor-pointer"
                  />
                </div>
                {showUserInfo === index && (
                  <div className={`duration-300 flex flex-col pt-4 lg:hidden`}>
                    <p className="pb-4">
                      Team or position :{" "}
                      {user.team === null ? "NO TEAM" : user.team.name}
                    </p>
                    <div className="flex gap-3">
                      <div
                        className={`${
                          user.signed_in ? "border-primary" : "border-danger"
                        } w-1/2 border rounded-full text-center py-1 text-sm text-gray`}
                      >
                        Sing in:
                        {user.signed_in ? (
                          <p className="text-base text-white">Active</p>
                        ) : (
                          <p className="text-base text-white">Disabled</p>
                        )}
                      </div>
                      <div
                        className={`${
                          user.signed_in ? "border-primary" : "border-danger"
                        } w-1/2 border rounded-full text-center py-1 text-sm text-gray`}
                      >
                        Status:
                        {user.disabled ? (
                          <p className="text-base text-white">Active</p>
                        ) : (
                          <p className="text-base text-white">Disabled</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex justify-center py-2 lg:hidden"
                  onClick={() => toggle(index)}
                >
                  <IoIosArrowDown
                    className={`${
                      showUserInfo === index ? "rotate-180" : "rotate-0"
                    } duration-300 text-gray text-base`}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
