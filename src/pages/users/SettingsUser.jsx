import React from "react";
import { Link } from "react-router-dom";
import { useGetSettingsQuery } from "redux/index";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import PageHeader from "../../components/common/PageHeader";

const SettingsUser = () => {
  const { data: getSettings = [], isLoading: loadingSettings } =
    useGetSettingsQuery();

  const [searchInput, setSearchInput] = React.useState("");
  const [formValue, setFormValue] = React.useState([]);
  const [newFormValue, setNewFormValue] = React.useState([]);

  React.useEffect(() => {
    setFormValue(getSettings);
    const settingsList = getSettings?.reduce(function (prev, curr) {
      return [
        ...prev,
        { id: curr.id, name: curr.key, value: "", default_value: "" },
      ];
    }, []);
    setNewFormValue(settingsList);
  }, [loadingSettings]);

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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>

          {newFormValue
            ?.filter((set) =>
              set.name.toLowerCase().includes(searchInput.toLowerCase().trim())
            )
            .map((item) => (
              <label
                key={item.id}
                className="flex flex-col gap-1 mb-4"
                htmlFor={item.key}
              >
                {item.name}
                <input
                  type={item.type}
                  name={item.key}
                  id={item.key}
                  autoComplete="off"
                  className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
                  value={item.value}
                  readOnly
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

export default SettingsUser;
