import React from "react";
import { Link } from "react-router-dom";
import AdminWrapper from "config/AdminWrapper";
import { useGetTeamsQuery } from "redux/index";

import { FiSearch } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import TeamList from "components/teams/TeamList";

const Teams = () => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [serchValue, setSearchValue] = React.useState("");
  const {
    data: getTeams = [],
    isLoading: loadingGetTeams,
    error: errorGetTeams,
  } = useGetTeamsQuery();

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex flex-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch
                  ? "rounded-l-lg text-primary"
                  : "rounded-l-lg text-gray"
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
                placeholder="Enter team name to search..."
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <AdminWrapper>
            <Link
              to="/add-team"
              className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <AiOutlineUsergroupAdd />
            </Link>
          </AdminWrapper>
        </div>

        <h3 className="h3 mb-5">Teams ({getTeams?.length})</h3>
        <TeamList
          getTeams={getTeams}
          loadingGetTeams={loadingGetTeams}
          errorGetTeams={errorGetTeams}
          serchValue={serchValue}
        />
      </div>
    </div>
  );
};

export default Teams;
