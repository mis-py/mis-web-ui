import React from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  useGetTeamsQuery,
  useGetPermissionsUserIdQuery,
  useDeleteTeamMutation,
} from "../../redux";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";

import UserImg from "../../assets/img/user.png";

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = React.useState(false);
  const [showTeamInfo, setShowTeamInfo] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [serchValue, setSearchValue] = React.useState("");
  const {
    data: dataGetTeams = [],
    isLoading: loadingGetTeams,
    error: errorGetTeams,
  } = useGetTeamsQuery();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

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
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          {getPermissionsUserId && getPermissionsUserId.length !== 0 ? (
            <Link
              to="/add-team"
              className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <AiOutlineUsergroupAdd />
            </Link>
          ) : (
            false
          )}
        </div>

        <h3 className="h3 mb-5">Teams ({dataGetTeams.length})</h3>
        {loadingGetTeams ? (
          <h2 className="text-2xl mx-auto">Loading...</h2>
        ) : (
          <div className="flex flex-col gap-4">
            {dataGetTeams &&
              dataGetTeams
                .filter((el) =>
                  el.name
                    .toLowerCase()
                    .includes(serchValue.toLowerCase().trim())
                )
                .map((team, index) => (
                  <div
                    key={team.id}
                    className="flex flex-col relative bg-blackSecond px-4 py-2 rounded"
                  >
                    <div
                      className={`${
                        showEdit === index
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
                    >
                      <Link
                        className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                        to="/teams"
                      >
                        Granting privileges
                      </Link>
                      {getPermissionsUserId &&
                      getPermissionsUserId.length !== 0 ? (
                        <div
                          onClick={(e) => navigate(`/teams/${team.id}`)}
                          className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                        >
                          Editing
                        </div>
                      ) : (
                        false
                      )}
                      <div className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary">
                        Remove
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-backGround">
                      <div className="flex flex-col">
                        <h5 className="text-gray text-xs">
                          Name of the department:
                        </h5>
                        <h4>{team.name}</h4>
                      </div>
                      <BiDotsVerticalRounded className="text-3xl text-gray cursor-pointer" />
                    </div>
                    {showTeamInfo === index && (
                      <div className={`duration-300 flex flex-col pt-4`}>
                        <p className="pb-4">Members of the department:</p>
                        <div className="flex">
                          {!loadingGetTeams && team.users.length ? (
                            team.users.map((item) => (
                              <img
                                key={item.id}
                                className="w-[29px] h-[29px] shadow -ml-1"
                                src={UserImg}
                                alt=""
                              />
                            ))
                          ) : (
                            <p className="text-danger">NO USERS</p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-center py-2 cursor-pointer">
                      <IoIosArrowDown
                        className={`${
                          showTeamInfo === index ? "rotate-180" : "rotate-0"
                        } duration-300 text-gray text-base`}
                      />
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
