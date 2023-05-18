import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useGetSettingsQuery } from "redux/index";
import { addUserSettings } from "redux/slices/userSlice";

import Tooltip from "components/Tooltip";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BiPaste } from "react-icons/bi";

const AddUserSettings = () => {
  const items = [
    {
      id: 1,
      value: "",
      key: "key1",
      defaultValue: "bla bla1",
    },
    {
      id: 2,
      value: "",
      key: "key2",
      defaultValue: "tra ta2",
    },
    {
      id: 3,
      value: "",
      key: "key3",
      defaultValue: "chece ceh3",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.user.settings);
  // const { data: getSettings = [], isLoading: loadingGetSettings } =
  //   useGetSettingsQuery();

  const [searchValue, setSearchValue] = React.useState("");
  const [settingsValue, setSettingsValue] = React.useState([]);

  settings.map((el) => {
    for (let _item in items) {
      if (items[_item].id == el.setting_id) {
        items[_item].value = el.new_value;
        return;
      }
    }
  });

  React.useEffect(() => {
    setSettingsValue(items);

    settings.map((item) => {
      const newSettings = settingsValue.find((el) => el.id === item.id);

      if (newSettings && !settingsValue.includes(newSettings)) {
        setSettingsValue([...settingsValue, newSettings]);
      }
    });
  }, [settings]);

  const handleNameChange = (index, event) => {
    const { value } = event.target;
    setSettingsValue((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].value = value;
      return updatedItems;
    });
  };

  const saveNewSettings = () => {
    settingsValue.map((item) => {
      if (item.value.trim().length !== 0) {
        dispatch(
          addUserSettings({ setting_id: item.id, new_value: item.value })
        );
      }
    });
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

          {settingsValue
            ?.filter((el) =>
              el.key.toLowerCase().includes(searchValue.toLowerCase().trim())
            )
            ?.map((item, index) => (
              <label
                key={item.id}
                className={`flex flex-col gap-1 mb-4 relative`}
                htmlFor={item.key}
              >
                {item.key}
                <input
                  autoComplete="off"
                  type="text"
                  className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                  name={item.key}
                  id={item.id}
                  value={item.value}
                  onChange={(event) => handleNameChange(index, event)}
                />
                <div className="group absolute right-5 bottom-3 cursor-pointer">
                  <Tooltip name={`Paste default value`} />
                  <BiPaste className="text-gray" />
                </div>
              </label>
            ))}
        </form>
      </div>

      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={saveNewSettings} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddUserSettings;
