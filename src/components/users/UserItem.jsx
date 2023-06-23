import React from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useOutsideClick from "hooks/useOutsideClick";
import { useDeleteUserMutation } from "redux/index";

import AdminWrapper from "config/AdminWrapper";

import { BiDotsVerticalRounded } from "react-icons/bi";

const UserItem = ({ user, index, showEdit, setShowEdit }) => {
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

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
    <div
      key={user.id}
      className="flex flex-col relative bg-blackSecond px-4 py-[10px] rounded lg:p-6"
    >
      <AdminWrapper>
        <div
          ref={refPopup}
          className={`${
            showEdit === index ? "opacity-100 visible" : "opacity-0 invisible"
          } duration-300 absolute top-1 w-[175px] z-10 right-1 bg-backGround shadow lg:top-3`}
        >
          <div
            onClick={(e) => navigate(`/users/${user.id}`)}
            className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
          >
            Edit
          </div>
          <div
            onClick={() => handleDeleteUser(user.id)}
            className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
          >
            Remove
          </div>
        </div>
      </AdminWrapper>
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
                <h5 className="text-white mb-[10px]">{user.username}</h5>
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
        <AdminWrapper>
          <BiDotsVerticalRounded
            onClick={(e) => {
              e.stopPropagation();
              toggleEdit(index);
            }}
            className="text-3xl text-gray cursor-pointer"
          />
        </AdminWrapper>
      </div>
    </div>
  );
};

export default UserItem;
