import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import {
  useGetSettingsAppIdQuery,
  useGetSettingsUserIdQuery,
  useUnloadAppModulesMutation,
  useStartAppMutation,
  useStopAppMutation,
  useSettingAppSetMutation,
  useSettingUserSetMutation,
} from "redux/index";

import AdminWrapper from "config/AdminWrapper";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import { currentUserId } from "config/variables";

const SettingsApp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [active, setActive] = React.useState(false);
  const [formGlobalValue, setFormGlobalValue] = React.useState([]);
  const [newGlobalSettings, setNewGlobalSettings] = React.useState({});
  const [formLocalValue, setFormLocalValue] = React.useState([]);
  const [newLocalSettings, setNewLocalSettings] = React.useState({});

  const { data: getSettingsAppId, isLoading: loadingGetSettingsAppId } =
    useGetSettingsAppIdQuery(id);
  const { data: getSettingsUserId = [], isLoading: loadingGetSettingsUserId } =
    useGetSettingsUserIdQuery(currentUserId);
  const [unloadAppModules] = useUnloadAppModulesMutation();
  const [startApp] = useStartAppMutation();
  const [stopApp] = useStopAppMutation();
  const [settingAppSet] = useSettingAppSetMutation();
  const [settingUserSet] = useSettingUserSetMutation();

  React.useEffect(() => {
    if (!loadingGetSettingsAppId && getSettingsAppId?.enabled) {
      setActive(true);
    } else {
      setActive(false);
    }

    !loadingGetSettingsAppId &&
      getSettingsAppId?.settings.map((setting) => {
        setFormGlobalValue((formGlobalValue) => [...formGlobalValue, setting]);
      });
  }, [loadingGetSettingsAppId]);

  React.useEffect(() => {
    !loadingGetSettingsUserId &&
      getSettingsUserId?.map((item) => {
        setFormLocalValue((formLocalValue) => [...formLocalValue, item]);
      });
  }, [loadingGetSettingsUserId]);

  const handleChange = async (nextChecked) => {
    if (nextChecked) {
      await startApp(id).unwrap();
      setActive(nextChecked);
    } else {
      await stopApp(id).unwrap();
      setActive(nextChecked);
    }
  };

  const handleDeleteApp = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Delete application",
      message: "Are you sure you want to delete this application?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await unloadAppModules(id);
            navigate("/apps");
            toast.success("Application deleted");
          },
        },
        {
          label: "No",
        },
      ],
      overlayClassName: "bg-blackSecond/70",
    });
  };

  const handleNewSettings = async (e) => {
    e.preventDefault();
    if (newGlobalSettings.length !== 0) {
      await settingAppSet({
        id,
        body: Object.values(newGlobalSettings),
      }).unwrap();
    }
    if (newLocalSettings !== 0) {
      await settingUserSet({
        currentUserId,
        body: Object.values(newLocalSettings),
      }).unwrap();
    }
    toast.success("Settings updated");
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center justify-between text-gray">
          <Link to={-1} className="flex items-center text-gray mb-5">
            <div className="flex mr-2">
              <IoIosArrowBack />
            </div>
            <span>back</span>
          </Link>
          {
            id !== '1' &&
          <AdminWrapper>
            <button
              onClick={handleDeleteApp}
              className="bg-danger rounded-lg p-3 cursor-pointer text-white flex text-bold"
            >
              <BsTrash />
            </button>
          </AdminWrapper>
          }
        </div>
        <AdminWrapper>
          <h4 className="text-2xl font-bold mb-5">General settings</h4>
          <div className="flex items-center gap-3 mb-5">
            <Switch onChange={handleChange} checked={active} />
            <p>Enable app</p>
          </div>
          {formGlobalValue.length !== 0 && (
            <h1 className="text-2xl font-bold">Global settings</h1>
          )}
          <form className="my-7">
            {formGlobalValue.map(
              (item, index) =>
                item.is_global && (
                  <label
                    key={item.id}
                    className="flex flex-col gap-1 mb-4"
                    htmlFor={item.key}
                  >
                    {item.key}
                    <input
                      className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
                      type={item.type}
                      id={item.id}
                      name={item.default_value}
                      autoComplete="off"
                      value={
                        item.default_value === null ? "" : item.default_value
                      }
                      onChange={(e) => {
                        let data = [...formGlobalValue];
                        data[index] = { ...data[index] };
                        data[index].default_value = e.target.value;

                        let data2 = { ...newGlobalSettings };
                        data2[e.target.id] = {
                          setting_id: data[index].id,
                          new_value:
                            data[index].default_value === ""
                              ? null
                              : data[index].default_value,
                        };
                        setFormGlobalValue(data);
                        setNewGlobalSettings(data2);
                      }}
                    />
                  </label>
                )
            )}
          </form>
        </AdminWrapper>

        <h1 className="text-2xl font-bold">User-local app settings</h1>
        <form className="my-7">
          {formLocalValue.map((item, index) => (
            <label
              key={item.setting.id}
              className="flex flex-col gap-1 mb-4"
              htmlFor={item.setting.key}
            >
              {item.setting.key}
              <input
                className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
                type={item.setting.type}
                id={item.setting.id}
                name={formLocalValue[index].value}
                autoComplete="off"
                value={formLocalValue[index].value}
                onChange={(e) => {
                  let data = [...formLocalValue];
                  data[index] = { ...data[index] };
                  data[index].value = e.target.value;

                  let data2 = { ...newLocalSettings };
                  data2[e.target.id] = {
                    setting_id: data[index].setting.id,
                    new_value:
                      data[index].value === "" ? null : data[index].value,
                  };
                  setFormLocalValue(data);
                  setNewLocalSettings(data2);
                }}
              />
            </label>
          ))}
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate(`/apps/settings/manage/${id}`)}
          className="flex justify-between items-center cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
        >
          Manage groups
          <AiOutlinePlusCircle className="text-xl" />
        </button>
        <button onClick={handleNewSettings} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsApp;
