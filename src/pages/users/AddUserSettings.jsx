import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useGetSettingsQuery } from "redux/index";
import { addUserSettings } from "redux/slices/userSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const AddUserSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.user.settings);
  const { data: getSettings = [], isLoading } = useGetSettingsQuery();

  const [searchValue, setSearchValue] = React.useState("");
  const [formGlobalValue, setFormGlobalValue] = React.useState([]);
  const [newGlobalSettings, setNewGlobalSettings] = React.useState([]);

  React.useEffect(() => {
    const settingsList = getSettings?.reduce(function (prev, curr) {
      return [...prev, { id: curr.id, name: curr.key, value: "" }];
    }, []);

    console.log(formGlobalValue);

    setFormGlobalValue([...settingsList]);
  }, [isLoading]);

  const handleFormChange = (e, index) => {
    let data = [...formGlobalValue];
    data[index] = { ...data[index] };
    data[index].value = e.target.value;

    let data2 = [...newGlobalSettings];
    data2[index] = {
      setting_id: data[index].id,
      new_value: data[index].value === "" ? null : data[index].value,
    };
    setFormGlobalValue(data);
    setNewGlobalSettings(data2);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    dispatch(
      addUserSettings(newGlobalSettings.filter((el) => el !== undefined))
    );
    navigate(-1);
    toast.success("User settings saved");
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

          {formGlobalValue
            ?.filter((el) =>
              el.name.toLowerCase().includes(searchValue.toLowerCase().trim())
            )
            ?.map((item, index) => (
              <label
                key={item.id}
                className="flex flex-col gap-1 mb-4"
                htmlFor={item.name}
              >
                {item.name}
                <input
                  autoComplete="off"
                  type="text"
                  className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
                  name={item.name}
                  id={item.name}
                  value={item.value}
                  onChange={(e) => {
                    handleFormChange(e, index);
                  }}
                />
              </label>
            ))}
        </form>
      </div>

      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleSaveSettings} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddUserSettings;
