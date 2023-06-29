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

import SearchInput from "components/SearchInput";
import Input from "components/Input";

import { IoIosArrowBack } from "react-icons/io";

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
                    hasDefault={item.default_value !== null && item.default_value.length}
                    setDefault={() => dispatch(addUserDefaultSettings(item))}
                  />
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
