import React from "react";

import { FiSearch } from "react-icons/fi";

const SearchInput = ({ searchValue, setSearchValue, placeholder }) => {
  return (
    <label
      className={`flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7`}
      htmlFor="search"
    >
      <input
        className={`w-full bg-transparent border-none focus:shadow-none focus:ring-0 `}
        type="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FiSearch className="w-12 text-gray" />
    </label>
  );
};

export default SearchInput;
