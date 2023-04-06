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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.user.settings);
  const { data: getSettings = [], isLoading: loadingGetSettings } =
    useGetSettingsQuery();

  const [searchValue, setSearchValue] = React.useState("");

  // React.useEffect(() => {
  //   const settingsList = getSettings?.reduce((prev, curr) => {
  //     return [
  //       ...prev,
  //       {
  //         id: curr.id,
  //         value: settings
  //           ?.map((el) => (el.setting_id === curr.id ? el.new_value : ""))
  //           .filter((empty) => !!empty)
  //           .toString(),
  //         key: curr.key,
  //         default_value: curr.default_value,
  //         is_global: curr.is_global,
  //         app: curr.app,
  //       },
  //     ];
  //   }, []);

  //   dispatch(addUserSettings(settingsList));
  //   dispatch(addUserSettings(settingsList));
  // }, [isLoading]);

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

          {getSettings
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
                  id={item.key}
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
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
};

export default AddUserSettings;
