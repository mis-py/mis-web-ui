import React from "react";

import { FiSearch } from "react-icons/fi";

const SearchInputBtn = ({ searchValue, setSearchValue, placeholder }) => {
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <div className="flex flex-auto">
      <button
        onClick={() => setShowSearch(!showSearch)}
        className={`${
          showSearch ? "rounded-l-lg text-primary" : "rounded-l-lg text-gray"
        } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
      >
        <FiSearch />
      </button>
      <div className="relative h-[32px] w-full duration-300">
        <input
          className={`${
            showSearch ? "w-full px-3" : "w-0 px-0"
          } bg-blackSecond h-full text-xs text-gray border-none placeholder:text-gray duration-300 rounded-r w-full focus:shadow-none focus:ring-0`}
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
