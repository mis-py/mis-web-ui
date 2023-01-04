import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  useCloneAppMutation,
  useGetModulesQuery,
  useCloneAppNameMutation,
} from "../../redux";

import { IoIosArrowBack } from "react-icons/io";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    color: state.isSelected ? "#ffffff" : "#757575",
    backgroundColor: state.isSelected ? "#1A69DF" : "#1d1d1d",
    borderRadius: "4px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#757575",
    backgroundColor: "#1d1d1d",
  }),
  control: (base, state) => ({
    ...base,
    background: "#1d1d1d",
    color: "#757575",
    borderColor: "none",
    borderWidth: "0",
    boxShadow: state.isFocused ? null : null,
  }),
  menu: (provided) => ({
    ...provided,
    padding: 10,
    backgroundColor: "#1d1d1d",
  }),
  input: (provided) => ({
    ...provided,
    color: "#757575",
    boxShadow: "none",
  }),
};

const CloneApp = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    url: "",
    branch: "",
  });
  const [formValueName, setFormValueName] = React.useState({
    id: 0,
    name: "",
    enabled: true,
  });

  const { data: getModules = [] } = useGetModulesQuery();
  const [cloneApp, { error: errorCloneApp }] = useCloneAppMutation();
  const [cloneAppName] = useCloneAppNameMutation();

  const options = getModules?.map((item, index) => {
    if (item.enabled) {
      return {
        value: item.name,
        label: item.name,
        id: item.id,
        enabled: true,
      };
    }
  });

  const handleCloneApp = async (e) => {
    e.preventDefault();
    if (!errorCloneApp || formValueName.name !== "") {
      await cloneApp({
        ...formValue,
      }).unwrap();
      navigate("/apps");
      toast.success("Added new app");
    }

    if (formValueName.name !== "") {
      await cloneAppName({ name: formValueName.name, ...formValueName });
      navigate("/apps");
      toast.success("Added new app");
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/apps">back</Link>
        </div>
        <h3 className="h3 mt-5">Clone app</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="url">
            Url
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="url"
              autoComplete="off"
              placeholder="Paste link to app"
              value={formValue.url}
              onChange={(e) =>
                setFormValue({ ...formValue, url: e.target.value })
              }
            />
          </label>

          <label className="flex flex-col gap-1 mb-4" htmlFor="branch">
            Branch
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="branch"
              autoComplete="off"
              placeholder="Enter branch name (default main)"
              value={formValue.branch}
              onChange={(e) =>
                setFormValue({ ...formValue, branch: e.target.value })
              }
            />
          </label>
        </form>

        <h3 className="h3 mt-5">Load app</h3>
        <label className="flex flex-col gap-1 mb-4" htmlFor="app">
          Name
          <Select
            options={options}
            styles={customStyles}
            placeholder="The app is not selected"
            id="app"
            onChange={(choice) =>
              setFormValueName({
                ...formValueName,
                id: choice.id,
                name: choice.value,
                enabled: choice.enabled,
              })
            }
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={handleCloneApp} className="btn-primary">
          Clone
        </button>
      </div>
    </div>
  );
};

export default CloneApp;
