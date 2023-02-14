import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGetUserSettingsQuery } from "../../redux";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const EditUserSettings = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState("");
  const { data: getUserSettings } = useGetUserSettingsQuery();

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
        <form className="my-4">
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Enter setting name to search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>

          {getUserSettings
            ?.filter((set) =>
              set.app.name
                .toLowerCase()
                .includes(searchInput.toLowerCase().trim())
            )
            .map((setting) => (
              <label
                key={setting.id}
                className="flex flex-col gap-1 mb-4"
                htmlFor={setting.key}
              >
                {setting.app.name}
                <input
                  type={setting.type}
                  name={setting.key}
                  id={setting.key}
                  //   checked={checkSuperUser}
                  //   onChange={() => setCheckSuperUser(!checkSuperUser)}
                  className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
                />
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

export default EditUserSettings;
