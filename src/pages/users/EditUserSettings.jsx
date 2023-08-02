import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { FiSearch } from "react-icons/fi";

import Input from "components/Input";
import PageHeader from "../../components/common/PageHeader";

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
      const userSetting = getUserSettings.find(
          (userSetting) => userSetting.setting.id === item.id
      );

      if (item.value !== "" || (userSetting !== undefined && userSetting.value.length)) {
        result.push({ setting_id: item.id, new_value: item.value });
      }
      return result;
    }, []);

    if (editUserSettingsSet === 0 || dataSettings.length === 0) {
      toast.error("Enter new settings");
    }

    await editUserSettingsSet({
      id: id,
      body: dataSettings,
    }).then((data) => {
      if (data.error !== undefined && data.error.data.message !== undefined) {
        console.error(data.error.data.message);
        toast.error("Settings were not saved");
      } else {
        navigate(`/users/${id}`);
        toast.success("Added new settings");
      }
    });
  };

  React.useEffect(() => {
    let _settings = getSettings.map((setting) => {
      const userSetting = getUserSettings.find(
          (userSetting) => userSetting.setting.id === setting.id
      );

      if (userSetting) {
        return {
          ...setting,
          value: userSetting.value,
        };
      }

      return setting;
    });

    dispatch(renderSettings(_settings));
  }, [loadingGetSettings, loadingUserSettings, dispatch, getUserSettings, getSettings]);

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    dispatch(addUserSettings({ id, value }));
  };

  return (
      <div className="py-6 min-h-screen h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <PageHeader
              header="Settings"
          />
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
                            <Input
                                key={item.id}
                                label={`${item.key} ( ${item.app.name} )`}
                                id={`${item.key}-${item.app.name}`.toLowerCase()}
                                type="text"
                                autoComplete="off"
                                changeValue={(e) => handleInputChange(e, item.id)}
                                value={item.value === undefined ? "" : item.value}
                                name={item.key}
                                hasDefault={item.default_value !== null && item.default_value.length}
                                setDefault={() => dispatch(addUserDefaultSettings(item))}
                            />
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
