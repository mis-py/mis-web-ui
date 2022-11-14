import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const SettingsUser = () => {
  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/users">back</Link>
        </div>

        <form className="my-7">
          <label
            className="flex items-center gap-2 text-gray body-2"
            htmlFor="notifications"
          >
            <input
              type="checkbox"
              name="checkbox-one"
              id="notifications"
              className="bg-transparent cursor-pointer 
    w-5 h-5 border border-primary focus:ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none active:!outline-none focus-visible:!outline-none rounded"
            />
            Enable PUSH notifications
          </label>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
};

export default SettingsUser;
