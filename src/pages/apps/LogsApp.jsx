import React from "react";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const LogsApp = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center cursor-pointer text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <div onClick={() => navigate(-1)}>back</div>
        </div>
        <h3 className="h3 mt-5">App name logs</h3>
        <form className="my-4">
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Search..."
            />
            <FiSearch className="w-12 text-gray" />
          </label>
        </form>
        {[...Array(10)].map((arr) => (
          <li>Line</li>
        ))}
      </div>
    </div>
  );
};

export default LogsApp;
