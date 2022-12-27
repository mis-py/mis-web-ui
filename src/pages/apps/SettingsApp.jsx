import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
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

  React.useEffect(() => {
    if (getSettingsAppId && getSettingsAppId.enabled) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [getSettingsAppId]);

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

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center justify-between text-gray">
          <div className="flex">
            <div className="flex items-center mr-2">
              <IoIosArrowBack />
            </div>
            <Link to="/apps">back</Link>
          </div>
          <button
            onClick={handleDeleteApp}
            className="bg-danger rounded-lg p-3 cursor-pointer text-white flex text-bold"
          >
            <BsTrash />
          </button>
        </div>

        <h3 className="h3 my-4">App name settings</h3>
        <h4 className="text-gray mb-5">General settings</h4>
        <div className="flex items-center gap-3 mb-5">
          <Switch onChange={handleChange} checked={active} />
          <p>Enable app</p>
        </div>

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
