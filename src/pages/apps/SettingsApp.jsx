import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import {
  useGetSettingsAppIdQuery,
  useUnloadAppModulesMutation,
  useStartAppMutation,
  useStopAppMutation,
} from "../../redux";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const SettingsApp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [active, setActive] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    name: "",
  });

  const { data: getSettingsAppId } = useGetSettingsAppIdQuery(id);
  const [unloadAppModules] = useUnloadAppModulesMutation();
  const [startApp] = useStartAppMutation();
  const [stopApp] = useStopAppMutation();

  console.log(getSettingsAppId && getSettingsAppId);

  const handleChange = (nextChecked) => {
    setActive(nextChecked);
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

        <h3 className="h3 my-4">App name settings</h3>
        <h4 className="text-gray mb-5">General settings</h4>
        <div className="flex items-center gap-3 mb-5">
          <Switch onChange={handleChange} checked={active} />
          <p>Enable app</p>
        </div>
        <button
          onClick={() => unloadAppModules(id)}
          className="bg-danger rounded-lg py-3 cursor-pointer text-white flex text-bold justify-center items-center gap-3 w-[150px] mb-10"
        >
          <BsTrash /> Unload
        </button>
        <h1>Global settings</h1>
        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Setting name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="name"
              autoComplete="off"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Setting name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="name"
              autoComplete="off"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Setting name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="name"
              autoComplete="off"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>
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
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
};

export default SettingsApp;
