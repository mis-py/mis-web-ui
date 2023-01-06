import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetPermissionsUserIdQuery, useCloneAppMutation } from "../../redux";

import { IoIosArrowBack } from "react-icons/io";

const AddFirewall = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    name: "",
    ip: "",
  });
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );
  const [cloneApp, { error: errorCloneApp }] = useCloneAppMutation();

  React.useEffect(() => {
    if (getPermissionsUserId && getPermissionsUserId.length === 0) {
      navigate("/firewall");
    }
  }, []);

  const handleCloneApp = async (e) => {
    e.preventDefault();
    if (!errorCloneApp) {
      if (formValue.url === "") {
        toast.error("URL required field");
      } else if (formValue.branch === "") {
        toast.error("Branch required field");
      } else {
        await cloneApp({
          ...formValue,
        }).unwrap();
        navigate("/firewall");
        toast.success("Added new app");
      }
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/firewall">back</Link>
        </div>
        <h3 className="h3 mt-5">Add ip to firewall</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="name">
            Name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="name"
              autoComplete="off"
              placeholder="Name of the service"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>

          <label className="flex flex-col gap-1 mb-4" htmlFor="ip">
            IP
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="ip"
              autoComplete="off"
              placeholder="IP Address to allow"
              value={formValue.ip}
              onChange={(e) =>
                setFormValue({ ...formValue, ip: e.target.value })
              }
            />
          </label>
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={handleCloneApp} className="btn-primary">
          Add
        </button>
      </div>
    </div>
  );
};

export default {
  routeProps: {
    path: "/add-firewall",
    component: <AddFirewall />,
  },
  name: "firewall",
  sidebar: false,
};
