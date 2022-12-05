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
import { AiOutlineUsergroupAdd, AiOutlineSetting } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

import UserImg from "../../assets/img/user.png";

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const [serchValue, setSearchValue] = React.useState("");
  const {
    data: dataGetTeams = [],
    isLoading: loadingGetTeams,
    error: errorGetTeams,
  } = useGetTeamsQuery();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  const toggle = (index) => {
    if (showInfo === index) {
      setShowInfo(false);
      return;
    }
    setShowInfo(index);
  };

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
                    <div className="flex justify-between items-center pb-2 border-b border-backGround">
                      <div className="flex">
                        <img
                          className="w-[56px] h-[56px] mr-3"
                          src={UserImg}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <h4>App name</h4>
                          <h5 className="text-gray text-xs">Category</h5>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <CgFileDocument
                          onClick={() =>
                            navigate(`/applications/clone/${team.id}`)
                          }
                          className="text-2xl text-gray cursor-pointer"
                        />
                        <AiOutlineSetting
                          onClick={() =>
                            navigate(`/applications/settings/${team.id}`)
                          }
                          className="text-2xl text-gray cursor-pointer"
                        />
                      </div>
                    </div>
                    {showInfo === index && (
                      <div className={`duration-300 flex flex-col pt-4 gap-2`}>
                        <div className="flex justify-between">
                          <h3>Status:</h3>
                          <p className="text-gray">healthy/unhealthy</p>
                        </div>
                        <div className="flex justify-between">
                          <h3>Is active:</h3>
                          <p className="text-gray">true / false</p>
                        </div>
                      </div>
                    )}
                    <div
                      onClick={(e) => {
                        toggle(index);
                      }}
                      className="flex justify-center py-2 cursor-pointer"
                    >
                      <IoIosArrowDown
                        className={`${
                          showInfo === index ? "rotate-180" : "rotate-0"
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
