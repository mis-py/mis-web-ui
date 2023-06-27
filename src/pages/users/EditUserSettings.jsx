import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetSettingsQuery,
  useGetUserSettingsIdQuery,
  useSettingUserSetMutation,
} from "redux/index";
import {
  addUserSettings,
  addUserDefaultSettings,
  renderSettings,
} from "redux/slices/userSlice";
import { toast } from "react-toastify";

import Tooltip from "components/Tooltip";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BiPaste } from "react-icons/bi";

const EditUserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const settings = useSelector((state) => state.user.settings);
  const { data: getSettings = [], isLoading: loadingGetSettings } =
    useGetSettingsQuery();
  const { data: getUserSettings = [], isLoading: loadingUserSettings } =
    useGetUserSettingsIdQuery(id);
  const [editUserSettingsSet] = useSettingUserSetMutation();

  const [searchValue, setSearchValue] = React.useState("");

  const handleSaveUser = async (e) => {
    e.preventDefault();

    let dataSettings = settings.reduce(function (result, item) {
      if (item.value !== "") {
        result.push({ setting_id: item.id, new_value: item.value });
      }
      return result;
    }, []);

    if (editUserSettingsSet === 0 || dataSettings.length === 0) {
      toast.error("Enter new settings");
    }

    await editUserSettingsSet({
      userId: id,
      settings: dataSettings,
    });
    navigate(`/users/${id}`);
    toast.success("Added new settings");
  };

  React.useEffect(() => {
    let test = getSettings.map((setting) => {
      const userSetting = getUserSettings.find(
        (userSetting) => userSetting.id === setting.id
      );

      if (userSetting) {
        return {
          ...setting,
          value: userSetting.value,
        };
      }

      return setting;
    });

    dispatch(renderSettings(test));
  }, [loadingGetSettings, loadingUserSettings]);

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    dispatch(addUserSettings({ id, value }));
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

          {settings
            ?.filter((el) =>
              el.key.toLowerCase().includes(searchValue.toLowerCase().trim())
            )
            ?.map(
              (item) =>
                !item.is_global && (
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
                    {item.default_value !== null ? (
                      <div className="group absolute right-5 bottom-3 cursor-pointer">
                        <Tooltip name={`Paste default value`} />
                        <BiPaste
                          onClick={() => dispatch(addUserDefaultSettings(item))}
                          className="text-gray"
                        />
                      </div>
                    ) : (
                      false
                    )}
                  </label>
                )
            )}
        </form>
      </div>

      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleSaveUser} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUserSettings;
