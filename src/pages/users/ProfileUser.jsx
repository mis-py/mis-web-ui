import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import {
  useDeleteUserMutation,
  useGetUserIdQuery,
  useUserLogoutMutation,
  useGetSettingsQuery,
  useGetPermissionsUserIdQuery,
  useGetSettingsUserIdQuery,
} from "redux/index";

import Tooltip from "components/Tooltip";

import { BiPaste } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

import { currentUserId } from "config/variables";

import "react-confirm-alert/src/react-confirm-alert.css";

const ProfileUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: getUserId = [], isLoading: loadingUserId } =
    useGetUserIdQuery(id);
  const { data: getUserPermissions = [] } =
    useGetPermissionsUserIdQuery(currentUserId);
  const { data: getSettings = [], isLoading: loadingSettings } =
    useGetSettingsQuery();
  const { data: getSettingsUserId = [] } = useGetSettingsUserIdQuery(id);
  const [deleteUser] = useDeleteUserMutation();
  const [userLogout] = useUserLogoutMutation();

  const [formValue, setFormValue] = React.useState({
    username: "",
    team: "",
  });
  const [settingsGlobalValue, setSettingsGlobalValue] = React.useState([]);

  console.log(getSettingsUserId);

  React.useEffect(() => {
    if (!loadingUserId) {
      setFormValue({
        username: getUserId.username,
        team: getUserId.team === null ? null : getUserId.team.name,
      });
    }

    if (!loadingSettings) {
      setSettingsGlobalValue([...getSettings]);
    }
  }, [loadingUserId, loadingSettings]);

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
      <div className="flex flex-col pb-[60px]">
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

        <form className="mt-7">
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
            <h3 className="body-2 text-gray mb-4">
              {formValue.team === null ? "No team" : formValue.team}
            </h3>
          </label>
          <label htmlFor="position">
            Position
            <h3 className="body-2 text-gray">
              {getUserId?.position === null
                ? "Position name none"
                : getUserId?.position}
            </h3>
          </label>
        </form>
        <h3 className="text-2xl font-bold mt-7 mb-5">Settings</h3>
        <form>
          {getUserPermissions[0]?.permission.scope === "core:sudo" && (
            <h1 className="h3 mb-5">Global settings</h1>
          )}
          {getSettings?.map(
            (item) =>
              getUserPermissions[0]?.permission.scope === "core:sudo" &&
              item.is_global && (
                <label
                  key={item.id}
                  className={`flex flex-col gap-1 mb-4 relative`}
                  htmlFor={item.key}
                >
                  {item.key}
                  <input
                    autoComplete="off"
                    type="text"
                    className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                    name={item.key}
                    id={item.key}
                  />
                  <div className="group absolute right-5 bottom-3 cursor-pointer">
                    <Tooltip name={`Paste default value`} />
                    <BiPaste className="text-gray" />
                  </div>
                </label>
              )
          )}
        </form>
        <form>
          <h1 className="h3 mb-5">Local settings</h1>
          {getSettings?.map(
            (item) =>
              !item.is_global && (
                <label
                  key={item.id}
                  className={`flex flex-col gap-1 mb-4 relative`}
                  htmlFor={item.key}
                >
                  {item.key}
                  <input
                    autoComplete="off"
                    type="text"
                    className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                    name={item.key}
                    id={item.key}
                  />
                  <div className="group absolute right-5 bottom-3 cursor-pointer">
                    <Tooltip name={`Paste default value`} />
                    <BiPaste className="text-gray" />
                  </div>
                </label>
              )
          )}
        </form>
      </div>
      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
};

export default ProfileUser;
