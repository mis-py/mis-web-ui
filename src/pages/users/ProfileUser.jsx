import React from "react";

import {
  useGetMeQuery,
  useGetSettingsQuery,
  useSettingUserSetMutation,
} from "redux/index";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "components/Input";
import PageHeader from "../../components/common/PageHeader";
import "react-confirm-alert/src/react-confirm-alert.css";
import AvatarUser from "../../components/users/AvatarUser";

const ProfileUser = () => {
  const {
    data: getUserId = [],
    isLoading: loadingUserId,
    refetch: refetchProfileData,
  } = useGetMeQuery();
  const { data: getSettings = [], isLoading: loadingSettings } =
    useGetSettingsQuery();

  const [editUserSettingsSet] = useSettingUserSetMutation();
  const [settingsValue, setSettingsValue] = React.useState([]);
  const { id } = useParams();
  const setDefaultSetting = function (item) {
    setSettingsValue(
      settingsValue.map((settingValue) => {
        if (settingValue.id === item.id) {
          settingValue.value = settingValue.default_value;
        }

        return settingValue;
      })
    );
  };

  React.useEffect(() => {
    if (getSettings !== undefined && getSettings.length) {
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
    }
  }, [loadingSettings, loadingUserId, getSettings, getUserId]);

  const handleSettingsChange = async (e, item) => {
    if (settingsValue !== undefined && settingsValue.length) {
      const newSettings = settingsValue.map((valueItem) => {
        if (valueItem.id !== item.id) {
          return valueItem;
        }

        valueItem.value = e.target.value;
        return valueItem;
      });

      setSettingsValue(newSettings);
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();

    let dataSettings = settingsValue.map(function (item) {
      return { setting_id: item.id, new_value: item.value };
    });

    await editUserSettingsSet({
      id: id,
      body: dataSettings,
    }).then((data) => {
      if (
        data.error !== undefined &&
        (data.error.data.message !== undefined ||
          data.error.data.detail !== undefined)
      ) {
        console.error(
          data.error.data.message === undefined
            ? data.error.data.detail
            : data.error.data.message
        );
        toast.error("Settings were not saved");
      } else {
        toast.success("Settings were saved");
      }
    });
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col pb-[60px]">
        <PageHeader header="Profile" />
        <AvatarUser
          userData={getUserId}
          userRefetch={refetchProfileData}
          userId={id}
          icon={true}
        />

        <form className="mt-7">
          <Input
            label="Username"
            type="text"
            id="username"
            autoComplete="off"
            value={
              getUserId &&
              (getUserId.username === undefined ? "" : getUserId.username)
            }
            readOnly
          />

          <label htmlFor="team">
            Team
            <span className="block body-2 text-gray mb-4">
              {getUserId.team === null ||
              getUserId.team === undefined ||
              getUserId.team.name === undefined
                ? "No team"
                : getUserId.team.name}
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
          {settingsValue.length &&
            settingsValue?.map(
              (item) =>
                item !== undefined &&
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
                    hasDefault={
                      typeof item.default_value === "string" &&
                      item.default_value.length !== 0
                    }
                    setDefault={() => setDefaultSetting(item)}
                  />
                )
            )}
        </form>
      </div>
      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround w-full lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleSaveUser} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileUser;
