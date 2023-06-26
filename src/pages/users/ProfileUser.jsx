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
import Input from "components/Input"
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

  React.useEffect(() => {
    if (!location.pathname.includes(localStorage.getItem("user_id"))) {
      navigate(`/profile/${localStorage.getItem("user_id")}`);
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
  }, [loadingSettings, loadingUserId]);

  const handleSettingsChange = async (e, item) => {
    const newSettings = settingsValue.map(valueItem => {
      if (valueItem.id !== item.id) {
        return valueItem;
      }

      valueItem.value = e.target.value;
      return valueItem;
    });

    setSettingsValue(newSettings);
  };

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
          <Input 
          label="Username"
          type="text"
          id="username"
          autoComplete="off"
          value={getUserId && (getUserId.username === undefined ? "" : getUserId.username)}
          readOnly
          />

          <label htmlFor="team">
            Team
            <span className="block body-2 text-gray mb-4">
              {getUserId.team === null || getUserId.team === undefined || getUserId.team.name === undefined
                ? "No team"
                : getUserId.team.name
                }
            </span>
          </label>
          <label htmlFor="position">
            Position
            <span className="block body-2 text-gray">
              {getUserId?.position === null
                ? "Position name none"
                : getUserId?.position}
            </span>
          </label>
        </form>
        <h3 className="text-2xl font-bold mt-7 mb-5">Settings</h3>
        <form>
          <h1 className="h3 mb-5">Local settings</h1>
          {settingsValue?.map(
            (item) =>
              !item.is_global && (
                <Input
                  label={item.key}
                  key={item.id}
                  className="relative"
                  id={item.key}
                  type="text"
                  autoComplete="off"
                  value={item.value}
                  name={item.key}
                  changeValue={(e) => handleSettingsChange(e, item)}
                  hasDefault={item.default_value !== null}
                />
                //   {/* <div className="group absolute right-5 bottom-3 cursor-pointer">
                //     <Tooltip name={`Paste default value`} />
                //     <BiPaste className="text-gray" />
                //   </div>
                // </label> */}
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
