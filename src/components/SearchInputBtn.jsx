import React from "react";

import { FiSearch } from "react-icons/fi";

const SearchInputBtn = ({ searchValue, setSearchValue, placeholder }) => {
  return (
    <div className="flex flex-auto">
      <button
        className={`rounded-l-lg text-primary flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
      >
        <FiSearch />
      </button>
      <div className="relative h-[32px] w-full duration-300">
        <input
          className={`w-full px-3 bg-blackSecond h-full text-xs text-gray border-none placeholder:text-gray duration-300 rounded-r focus:shadow-none focus:ring-0`}
          type="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInputBtn;
