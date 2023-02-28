import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import {
  useDeleteUserMutation,
  useGetUserIdQuery,
  useUserLogoutMutation,
} from "redux/index";
import { IoIosArrowBack } from "react-icons/io";

import "react-confirm-alert/src/react-confirm-alert.css";

const ProfileUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: getUserId = [], isLoading } = useGetUserIdQuery(id);
  const [deleteUser] = useDeleteUserMutation();
  const [userLogout] = useUserLogoutMutation();

  const [formValue, setFormValue] = React.useState({
    username: "",
    team: {},
  });

  React.useEffect(() => {
    if (!isLoading) {
      setFormValue({
        username: getUserId.username,
        team: {
          id: getUserId.team === null ? 0 : getUserId.team.id,
          name: getUserId.team === null ? "No team" : getUserId.team.name,
        },
      });
    }
  }, [isLoading]);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Delete profile",
      message: "Are you sure you want to delete your profile?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await deleteUser(id);
            await userLogout();
            localStorage.removeItem("my-token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_name");
            navigate("/signin");
            toast.success("Profile deleted");
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
        <Link to={-1} className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <span>back</span>
        </Link>
        <h3 className="h3 my-5">Profile</h3>

        <img
          className="w-[64px] h-[64px]"
          src={require("assets/img/user.png")}
          alt=""
        />

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Username
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 border-none border-0 focus-visible:outline-none"
              type="text"
              id="username"
              value={formValue.username}
              readOnly
            />
          </label>

          <label htmlFor="team">
            Team
            <h3 className="body-2 text-gray mb-4">{formValue.team.name}</h3>
          </label>
          <label htmlFor="position">
            Position
            <h3 className="body-2 text-gray">{getUserId?.position === null ? "Position name none" : getUserId?.position}</h3>
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <button onClick={handleDeleteUser} className="btn-danger">
          Delete my profile
        </button>
      </div>
    </div>
  );
};

export default ProfileUser;
