import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetSettingsQuery,
  useGetSettingsUserIdQuery,
  useSettingUserSetMutation,
} from "redux/index";
import {
  addUserSettings,
  addUserDefaultSettings,
  renderSettings,
  renderEditSettings,
} from "redux/slices/userSlice";

import Tooltip from "components/Tooltip";
import SearchInput from "components/SearchInput";

import { IoIosArrowBack } from "react-icons/io";
import { BiPaste } from "react-icons/bi";

const EditUserSettings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.user.settings);
  const [searchValue, setSearchValue] = React.useState("");
  const { data: getSettings = [], isLoading: loadingSettings } =
    useGetSettingsQuery();
  const { data: getSettingsUserId, isLoading: loadingSettingsUserId } =
    useGetSettingsUserIdQuery(id);
  const [editUserSettings] = useSettingUserSetMutation();

  React.useEffect(() => {
    if (!loadingSettings) {
      dispatch(renderSettings(getSettings));
      if (!loadingSettingsUserId) {
        dispatch(renderEditSettings(getSettingsUserId));
      }
    }
  }, [loadingSettings, loadingSettingsUserId]);

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    dispatch(addUserSettings({ id, value }));
  };

  const handleEditUserSettings = async (e) => {
    e.preventDefault();
    // await editUserSettings({
    //   id,
    //   body: settings
    //     .filter(
    //       (el) => el.value !== "" && { setting_id: el.id, new_value: el.value }
    //     )
    //     .map((item) => {
    //       return { setting_id: item.id, new_value: item.value };
    //     }),
    // }).unwrap();
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
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={"Enter setting name to search..."}
          />

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
                    {item.default_value !== null && (
                      <div className="group absolute right-5 bottom-3 cursor-pointer">
                        <Tooltip name={`Paste default value`} />
                        <BiPaste
                          onClick={() => dispatch(addUserDefaultSettings(item))}
                          className="text-gray"
                        />
                      </div>
                    )}
                  </label>
                )
            )}
        </form>
      </div>

      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleEditUserSettings} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUserSettings;
