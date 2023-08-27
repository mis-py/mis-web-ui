import React from "react";
import { Link } from "react-router-dom";
import AdminWrapper from "config/AdminWrapper";
import { useGetTeamsQuery } from "redux/index";

import TeamList from "components/teams/TeamList";
import SearchInputBtn from "components/SearchInputBtn";

import { AiOutlineUsergroupAdd } from "react-icons/ai";

const Teams = () => {
  const [serchValue, setSearchValue] = React.useState("");
  const {
    data: getTeams = [],
    isLoading: loadingGetTeams,
    error: errorGetTeams,
  } = useGetTeamsQuery();

  return (
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <SearchInputBtn
            setSearchValue={setSearchValue}
            serchValue={serchValue}
            placeholder={"Enter team name to search..."}
          />
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
  );
};

export default Teams;
