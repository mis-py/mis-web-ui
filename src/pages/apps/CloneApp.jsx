import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

const CloneApp = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValue, setFormValue] = React.useState({});

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/applications">back</Link>
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
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </label>
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <button className="btn-primary">Clone</button>
      </div>
    </div>
  );
};

export default CloneApp;
