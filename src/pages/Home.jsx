import React from "react";

import { FiSearch } from "react-icons/fi";

const Home = () => {
  return (
    <div className="h-screen py-6">
      <div className="flex flex-col h-full">
        <div className="flex items-center bg-blackSecond rounded w-full pl-3">
          <FiSearch className="text-lg text-gray" />
          <input
            className="bg-transparent border-none border-0 text-xs text-gray placeholder:text-gray duration-300 w-full focus:!shadow-none focus:ring-0"
            type="search"
            placeholder="Search..."
          />
        </div>
        <h2 className="text-center h-full h3 text-gray flex items-center justify-center">
          Nothing here <br /> for now
        </h2>
      </div>
    </div>
  );
};

export default Home;
