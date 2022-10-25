import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import {
  useDeleteUserMutation,
  useGetUserIdQuery,
  useGetPermissionsUserIdQuery,
} from "../../redux";
import { IoIosArrowBack } from "react-icons/io";

import UserImg from "../../assets/img/user.png";

import "react-confirm-alert/src/react-confirm-alert.css";

const ProfileUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: getUserId, isLoading } = useGetUserIdQuery(id);
  const [deleteUser] = useDeleteUserMutation();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
    team: {},
  });

  React.useEffect(() => {
    if (!isLoading) {
      setFormValue({
        username: getUserId.username,
        password: "",
        team: {
          id: getUserId.team === null ? 0 : getUserId.team.id,
          name: getUserId.team === null ? "NO TEAM" : getUserId.team.name,
        },
      });
    }
  }, [isLoading]);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
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
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/users">back</Link>
        </div>
        <h3 className="h3 my-5">Profile</h3>

        <img className="w-[64px] h-[64px]" src={UserImg} alt="" />

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Username
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none"
              type="text"
              id="username"
              value={formValue.username}
              readOnly
            />
          </label>

          <label className="flex flex-col gap-1 mb-4" htmlFor="new-password">
            Password
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none"
              type="password"
              id="new-password"
              placeholder="Enter a password"
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </label>
          <label htmlFor="team">
            Team
            <h3 className="body-2 text-gray mb-4">{formValue.team.name}</h3>
          </label>
          <label htmlFor="position">
            Position
            <h3 className="body-2 text-gray">Job title</h3>
          </label>
        </form>
      </div>
      {getPermissionsUserId && getPermissionsUserId.length !== 0 ? (
        <div className="flex flex-col gap-4">
          <button onClick={() => navigate("/users")} className="btn-primary">
            Save
          </button>
          <button onClick={handleDeleteUser} className="btn-danger">
            Delete user
          </button>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default ProfileUser;
