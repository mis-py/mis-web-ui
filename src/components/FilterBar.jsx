import React from "react";

import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";

const FilterBar = ({
  filterGrid,
  showFilter,
  setShowFilter,
  setFilterGrid,
  geos,
  setGeo,
}) => {
  const [showGeo, setShowGeo] = React.useState(false);

  return (
    <div
      className={`${
        showFilter ? "translate-x-0" : "translate-x-full"
      } fixed duration-300 bg-blackSecond w-[300px] right-0 h-screen z-30 py-7 px-5`}
    >
      <IoIosClose
        onClick={() => setShowFilter(false)}
        className="absolute text-2xl right-3 top-3 cursor-pointer"
      />
      <h2 className="h4 text-gray mb-7">Sort by</h2>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilterGrid(2)}
          className={`${
            filterGrid === 2 ? "bg-primary" : "bg-backGround"
          } flex justify-center items-center w-[32px] h-[32px] rounded duration-300 hover:bg-primary`}
        >
          <BsGrid3X3GapFill />
        </button>
        <button
          onClick={() => setFilterGrid(1)}
          className={`${
            filterGrid === 1 ? "bg-primary" : "bg-backGround"
          } flex justify-center items-center w-[32px] h-[32px] rounded duration-300 hover:bg-primary`}
        >
          <BsListUl />
        </button>
      </div>
      <div className="flex flex-col">
        <div
          onClick={() => setShowGeo(!showGeo)}
          className="flex items-center gap-2 body-2 text-gray cursor-pointer mb-5"
        >
          <h2
            className={`${showGeo ? "text-primary" : "text-gray"} duration-300`}
          >
            Geolocation
          </h2>
          <IoIosArrowDown
            className={`${
              showGeo ? "rotate-180 text-primary" : "rotate-0 text-gray"
            } duration-300`}
          />
        </div>
        <div
          className={`${
            showGeo ? "opacity-100 visible" : "opacity-0 invisible"
          } flex gap-2 overflow-hidden duration-300 text-gray text-sm`}
        >
          {geos?.map((geo, index) => (
            <button
              key={geo}
              onClick={() => setGeo(geo)}
              className={`bg-backGround flex justify-center items-center w-[32px] h-[32px] rounded duration-300 text-white hover:bg-primary`}
            >
              {geo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
