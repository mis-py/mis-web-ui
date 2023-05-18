import React from "react";
import useOutsideClick from "hooks/useOutsideClick";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetPermissionsUserIdQuery,
} from "redux/index";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { resetUser } from "redux/slices/userSlice";

import "react-confirm-alert/src/react-confirm-alert.css";

import { FiSearch, FiUserPlus } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";

import AdminWrapper from "config/AdminWrapper";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: getUsers = [],
    isLoading: loadingGetUser,
    error: errorGetUsers,
  } = useGetUsersQuery();
  const { data: getPermissionsUser, isLoading: loadingPermissionsUser } =
    useGetPermissionsUserIdQuery(localStorage.getItem("user_id"));

  const [deleteUser] = useDeleteUserMutation();

  const [showSearch, setShowSearch] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [serchValue, setSearchValue] = React.useState("");

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  React.useEffect(() => {
    dispatch(resetUser());
    if (errorGetUsers) {
      toast.error("No users found");
    }
  }, [getUsers, errorGetUsers, serchValue]);

  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(false);
      return;
    }
    setShowEdit(index);
  };

  const handleDeleteUser = async (id) => {
    confirmAlert({
      title: "Delete user",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await deleteUser(id);
            navigate("/users");
            toast.success("User deleted");
          },
        },
        {
          label: "No",
        },
      ],
      overlayClassName: "bg-blackSecond/70",
    });
  };

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex flex-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch
                  ? "rounded-l-lg text-primary"
                  : "rounded-lg text-gray"
              } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
            >
              <FiSearch />
            </button>
            <div className="relative h-[32px] w-full duration-300">
              <input
                className={`${
                  showSearch ? "w-full px-3" : "w-0 px-0"
                } bg-blackSecond h-full text-xs text-gray border-none placeholder:text-gray duration-300 rounded-r w-full focus:shadow-none focus:ring-0`}
                type="search"
                placeholder="Enter user name to search..."
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          {/* <AdminWrapper> */}
          {!loadingPermissionsUser &&
          getPermissionsUser &&
          getPermissionsUser[0].permission.scope === "core:sudo" ? (
            <Link
              to="/add-user"
              className="px-3 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <FiUserPlus />
            </Link>
          ) : false ? (
            getPermissionsUser === undefined
          ) : (
            false
          )}
          {/* </AdminWrapper> */}
        </div>

        <h3 className="h3 mb-5">Users ({getUsers?.length})</h3>
        {loadingGetUser ? (
          <PulseLoader
            size={15}
            cssOverride={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            color="#757575"
          />
        ) : (
          <div className="flex flex-col gap-4">
            {getUsers
              ?.filter((el) =>
                el.username
                  .toLowerCase()
                  .includes(serchValue.toLowerCase().trim())
              )
              .map((user, index) => (
                <div
                  key={user.id}
                  className="flex flex-col relative bg-blackSecond px-4 py-[10px] rounded lg:p-6"
                >
                  <div
                    ref={refPopup}
                    className={`${
                      showEdit === index
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    } duration-300 absolute top-1 w-[175px] z-10 right-1 bg-backGround shadow lg:top-3`}
                  >
                    {/* <AdminWrapper> */}
                    <div
                      onClick={(e) => navigate(`/users/${user.id}`)}
                      className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                    >
                      Edit
                    </div>
                    {/* </AdminWrapper> */}
                    <div
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                    >
                      Remove
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="lg:flex lg:items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-[56px] h-[56px]"
                            src={require("assets/img/user.png")}
                            alt=""
                          />
                          <div className="flex flex-col">
                            <h5 className="text-white mb-[10px]">
                              {user.username}
                            </h5>
                            <h4
                              className={`${
                                user.team === null ? "text-danger" : "text-gray"
                              } text-xs mb-[6px]`}
                            >
                              {user.team === null ? "No team" : user.team.name}
                            </h4>
                            <h4 className="text-gray text-xs">
                              {user.position === null
                                ? "Position name none"
                                : user.position}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <AdminWrapper> */}
                    <BiDotsVerticalRounded
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit(index);
                      }}
                      className="text-3xl text-gray cursor-pointer"
                    />
                    {/* </AdminWrapper> */}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
