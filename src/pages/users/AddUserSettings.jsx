import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSettingsQuery } from "redux/index";
import {
  addUserSettings,
  renderSettings,
  addUserDefaultSettings,
} from "redux/slices/userSlice";

import SearchInput from "components/SearchInput";
import Input from "components/Input";

import PageHeader from "../../components/common/PageHeader";

const AddUserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector((state) => state.user.settings);
  const { data: getSettings = [], isLoading: loadingGetSettings } =
    useGetSettingsQuery();

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    if (settings.length === 0) {
      dispatch(renderSettings(getSettings));
    }
  }, [loadingGetSettings, getSettings, dispatch, settings]);

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
                  <Input
                    label={`${item.key} ( ${item.app.name} )`}
                    key={item.id}
                    className="relative"
                    id={item.key}
                    type="text"
                    autoComplete="off"
                    changeValue={(e) => handleInputChange(e, item.id)}
                    value={item.value}
                    name={item.key}
                    hasDefault={item.default_value !== null && item.default_value.length > 0}
                    setDefault={() => dispatch(addUserDefaultSettings(item))}
                  />
                )
            )}
        </form>
      </div>

      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround w-full lg:max-w-[-webkit-fill-available] lg:left-[345px]">
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
