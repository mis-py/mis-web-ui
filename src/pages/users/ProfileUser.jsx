import React from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { addUserSettings } from "redux/slices/userSlice";
import {
  useDeleteUserMutation,
  useGetUserIdQuery,
  useUserLogoutMutation,
  useGetSettingsQuery,
} from "redux/index";

import Tooltip from "components/Tooltip";

import { BiPaste } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import USER from "assets/img/user.png";
import { currentUserId } from "config/variables";

import "react-confirm-alert/src/react-confirm-alert.css";

const ProfileUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: getUserId = [], isLoading: loadingUserId } =
    useGetUserIdQuery(id);
  const { data: getSettings = [], isLoading: loadingSettings } =
    useGetSettingsQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userLogout] = useUserLogoutMutation();

  const [settingsValue, setSettingsValue] = React.useState([]);

  console.log(settingsValue);

  React.useEffect(() => {
    if (!location.pathname.includes(currentUserId)) {
      navigate(`/profile/${currentUserId}`);
    }

    const userSettings = getSettings?.reduce((prev, curr) => {
      return [
        ...prev,
        {
          id: curr.id,
          value: getUserId.settings
            ?.map((el) => (el.setting.id === curr.id ? el.value : ""))
            .filter((empty) => !!empty)
            .toString(),
          key: curr.key,
          default_value: curr.default_value,
          is_global: curr.is_global,
          app: curr.app,
        },
      ];
    }, []);

    setSettingsValue(userSettings);
  }, [loadingSettings, getUserId]);

  // const handleDeleteUser = async (e) => {
  //   e.preventDefault();
  //   confirmAlert({
  //     title: "Delete profile",
  //     message: "Are you sure you want to delete your profile?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: async () => {
  //           await deleteUser(id);
  //           await userLogout();
  //           localStorage.removeItem("my-token");
  //           localStorage.removeItem("user_id");
  //           localStorage.removeItem("user_name");
  //           navigate("/signin");
  //           toast.success("Profile deleted");
  //         },
  //       },
  //       {
  //         label: "No",
  //       },
  //     ],
  //     overlayClassName: "bg-blackSecond/70",
  //   });
  // };

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
          src={USER}
          alt=""
        />

        <form className="mt-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Username
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 border-none border-0 focus-visible:outline-none"
              type="text"
              id="username"
              value={getUserId && getUserId?.username}
              readOnly
            />
          </label>

          <label htmlFor="team">
            Team
            <h3 className="body-2 text-gray mb-4">
              {getUserId.team === null ? "No team" : getUserId.team}
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
          <h1 className="h3 mb-5">Local settings</h1>
          {settingsValue?.map(
            (item, index) =>
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
                    value={item.value}
                    onChange={(e) =>
                      setSettingsValue([...settingsValue, {...item, value: e.target.value }])
                    }
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
