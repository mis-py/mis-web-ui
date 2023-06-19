import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetSettingsQuery } from "redux/index";
import {
  addUserSettings,
  renderSettings,
  addUserDefaultSettings,
  resetSettings,
} from "redux/slices/userSlice";

import Tooltip from "components/Tooltip";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BiPaste } from "react-icons/bi";

const AddUserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector((state) => state.user.settings);
  const { data: getSettings = [], isLoading: loadingGetSettings } =
    useGetSettingsQuery();

  const [searchValue, setSearchValue] = React.useState("");
  const [settingType, setSettingType] = React.useState("local");

  React.useEffect(() => {
    if (settings.length === 0) {
      dispatch(renderSettings(getSettings));
    }
  }, [loadingGetSettings]);

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    dispatch(addUserSettings({ id, value }));
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <Link
          onClick={() => dispatch(resetSettings())}
          to={-1}
          className="flex items-center text-gray"
        >
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <span>back</span>
        </Link>
        <h3 className="h3 mt-5">Settings</h3>

        <form className="my-4 pb-[50px]">
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Enter setting name to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>

          <div className="flex justify-end gap-4 mb-8">
            <p
              className={`${
                settingType === "local" ? "text-primary" : ""
              } cursor-pointer`}
              onClick={() => setSettingType("local")}
            >
              Local settings
            </p>
            <p>/</p>
            <p
              className={`${
                settingType === "global" ? "text-primary" : ""
              } cursor-pointer`}
              onClick={() => setSettingType("global")}
            >
              Global settings
            </p>
          </div>

          {settings
            ?.filter((el) =>
              el.key.toLowerCase().includes(searchValue.toLowerCase().trim())
            )
            ?.map((item, index) =>
              settingType === "local" && !item.is_global ? (
                <label
                  key={item.id}
                  className={`flex flex-col gap-1 mb-4 relative`}
                  htmlFor={item.key}
                >
                  {`${item.key} ( ${item.app.name} )`}
                  <input
                    autoComplete="off"
                    type="text"
                    className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                    name={item.key}
                    id={item.id}
                    value={item.value}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  {item.default_value !== null ?(
                   <div className="group absolute right-5 bottom-3 cursor-pointer">
                    <Tooltip name={`Paste default value`} />
                    <BiPaste
                      onClick={() => dispatch(addUserDefaultSettings(item))}
                      className="text-gray"
                    />
                  </div> 
                  ):(
                    false
                  )}
                </label>
              ) : settingType === "global" && item.is_global ? (
                <label
                  key={item.id}
                  className={`flex flex-col gap-1 mb-4 relative`}
                  htmlFor={item.key}
                >
                  {`${item.key} ( ${item.app.name} )`}
                  <input
                    autoComplete="off"
                    type="text"
                    className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                    name={item.key}
                    id={item.id}
                    value={item.value}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  {item.default_value !== null ?(
                   <div className="group absolute right-5 bottom-3 cursor-pointer">
                    <Tooltip name={`Paste default value`} />
                    <BiPaste
                      onClick={() => dispatch(addUserDefaultSettings(item))}
                      className="text-gray"
                    />
                  </div> 
                  ):(
                    false
                  )}
                  
                </label>
              ) : (
                false
              )
            )}
        </form>
      </div>

      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button
          onClick={() => {
            navigate(-1);
            toast.success("Settings have been saved");
          }}
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddUserSettings;
