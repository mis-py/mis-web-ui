import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetWebcatQuery } from "../../redux";

import FilterBar from "../../components/FilterBar";

import { FiSearch, FiDownload, FiEdit, FiEye } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";

const Webcatalog = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [filterGrid, setFilterGrid] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [geo, setGeo] = React.useState("");

  const { data: getWebcat, isLoading: loadingWebcat } = useGetWebcatQuery(
    `?geo=${geo}`
  );

  return (
    <>
      <FilterBar
        filterGrid={filterGrid}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setFilterGrid={setFilterGrid}
        geos={getWebcat && getWebcat.geos}
        setGeo={setGeo}
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
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
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

          <h2
            onClick={() => setGeo("")}
            className="cursor-pointer text-gray ml-auto mb-3"
          >
            Сбросить фильтр
          </h2>

          <div className="flex flex-wrap gap-4">
            {loadingWebcat ? (
              <h2 className="text-2xl mx-auto">Loading...</h2>
            ) : (
              getWebcat &&
              getWebcat.landings
                .filter(
                  (el) =>
                    el.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim()) ||
                    el.branch_name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim())
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      filterGrid === 1 ? "w-full" : "w-[calc(50%_-_8px)]"
                    } relative duration-300 flex flex-col justify-between p-3 w-full h-[160px] rounded overflow-hidden md:h-[300px]`}
                  >
                    <div className="absolute bg-black/30 inset-0 z-10"></div>
                    <img
                      className="absolute w-full h-full object-cover inset-0"
                      src={`data:image/webp;base64, ${item.thumbnail}`}
                      alt=""
                    />

                    <div className="flex justify-between z-20">
                      <div className="flex gap-3">
                        <a
                          href={item.clone_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary"
                        >
                          <FiDownload />
                        </a>
                        <button
                          onClick={() => navigate(`/webcatalog/${item.id}`)}
                          className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary"
                        >
                          <FiEdit />
                        </button>
                      </div>
                      <button className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary">
                        <FiEye />
                      </button>
                    </div>

                    <div className="flex justify-between items-end z-20">
                      <h3>{item.name}</h3>
                      <div className="flex items-end gap-3">
                        <p className="body-2 text-gray">{item.branch_name}</p>
                        <button
                          onClick={() => setGeo(item.geo)}
                          className="flex justify-center items-center text-sm w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary"
                        >
                          {item.geo}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Webcatalog;
