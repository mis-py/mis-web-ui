import React from "react";
import { FiSearch, FiDownload, FiEdit, FiEye } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";

import FilterBar from "../../components/FilterBar";

import WebcatImg from "../../assets/img/webcat.jpg";

const Webcatalog = () => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [filterGrid, setFilterGrid] = React.useState(1);

  return (
    <>
      <FilterBar
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setFilterGrid={setFilterGrid}
      />
      <div className="py-6">
        <div className="flex flex-col">
          <div className="flex justify-between gap-3 mb-5">
            <div className="flex flex-auto">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`${
                  showSearch
                    ? "rounded-l-lg text-primary"
                    : "rounded-lg text-gray"
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
                  placeholder="Enter user name to search..."
                />
              </div>
            </div>
            <div
              onClick={() => setShowFilter(true)}
              className="px-5 flex items-center justify-center bg-blackSecond rounded-lg duration-200 cursor-pointer hover:bg-primary"
            >
              <BiFilterAlt />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div
              className={`${
                filterGrid === 1 ? "w-full" : "w-[calc(50%_-_8px)]"
              } relative duration-300 flex flex-col justify-between p-3 w-full h-[160px] rounded overflow-hidden`}
            >
              <div className="absolute bg-black/30 inset-0 z-10"></div>
              <img
                className="absolute w-full h-full object-cover inset-0"
                src={WebcatImg}
                alt=""
              />

              <div className="flex justify-between z-20">
                <div className="flex gap-3">
                  <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                    <FiDownload />
                  </button>
                  <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                    <FiEdit />
                  </button>
                </div>
                <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                  <FiEye />
                </button>
              </div>

              <div className="flex justify-between items-end z-20">
                <h3>Halyk Bank</h3>
                <div className="flex items-end gap-3">
                  <p className="body-2 text-gray">off19</p>
                  <button className="flex justify-center items-center text-sm w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                    KZ
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`${
                filterGrid === 1 ? "w-full" : "w-[calc(50%_-_8px)]"
              } relative duration-300 flex flex-col justify-between p-3 w-full h-[160px] rounded overflow-hidden`}
            >
              <div className="absolute bg-black/30 inset-0 z-10"></div>
              <img
                className="absolute w-full h-full object-cover inset-0"
                src={WebcatImg}
                alt=""
              />

              <div className="flex justify-between z-20">
                <div className="flex gap-3">
                  <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                    <FiDownload />
                  </button>
                  <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                    <FiEdit />
                  </button>
                </div>
                <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                  <FiEye />
                </button>
              </div>

              <div className="flex justify-between items-end z-20">
                <h3>Halyk Bank</h3>
                <div className="flex items-end gap-3">
                  <p className="body-2 text-gray">off19</p>
                  <button className="flex justify-center items-center text-sm w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                    KZ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Webcatalog;
