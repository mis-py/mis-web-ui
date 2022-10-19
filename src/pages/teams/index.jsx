import React from "react";
import { toast } from "react-toastify";
import { useGetTeamsQuery } from "../../redux";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FiSearch, FiUserPlus } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import UserImg from "../../assets/img/user.png";

const Teams = () => {
  const navigate = useNavigate();
  const {
    data: dataGetTeams = [],
    isLoading: loadingGetTeams,
    error: errorGetTeams,
  } = useGetTeamsQuery();

  const [showSearch, setShowSearch] = React.useState(false);
  const [showTeamInfo, setShowTeamInfo] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  React.useEffect(() => {
    if (errorGetTeams) {
      toast.error("🦄 Wow so easy!");
    }
  }, [errorGetTeams]);

  const toggle = (index) => {
    if (showTeamInfo === index) {
      setShowTeamInfo(false);
      return;
    }
    setShowTeamInfo(index);
  };
  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(false);
      return;
    }
    setShowEdit(index);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex flex-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch ? "rounded-l-lg" : "rounded-lg"
              } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
            >
              <FiSearch />
            </button>
            <input
              className={`${
                showSearch ? "w-full" : "w-0"
              } bg-[#3F3F3F] duration-300 rounded-r w-full" type="text`}
            />
          </div>
          <Link
            to="/add-team"
            className="px-5 flex items-center justify-center bg-blackSecond rounded-lg"
          >
            <FiUserPlus />
          </Link>
        </div>

        <h3 className="h3 mb-5">Teams ({dataGetTeams.length})</h3>
        <div className="flex flex-col gap-4">
          {dataGetTeams &&
            dataGetTeams.map((team, index) => (
              <div
                key={team.id}
                className="flex flex-col relative bg-blackSecond px-4 py-2 rounded"
              >
                <div
                  ref={refPopup}
                  className={`${
                    showEdit === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-16`}
                >
                  <Link
                    className="px-5 py-1 block text-gray duration-300 hover:bg-blackSecond hover:text-primary"
                    to="/teams"
                  >
                    Granting privileges
                  </Link>
                  <div
                    onClick={(e) => navigate(`/teams/${team.id}`)}
                    className="px-5 py-1 block text-gray duration-300 hover:bg-blackSecond hover:text-primary"
                  >
                    Editing
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-backGround">
                  <div className="flex flex-col">
                    <h5 className="text-gray text-xs">
                      Name of the department:
                    </h5>
                    <h4>{team.name}</h4>
                  </div>
                  <BiDotsVerticalRounded
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEdit(index);
                    }}
                    className="text-3xl text-gray cursor-pointer"
                  />
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
                <div
                  className="flex justify-center py-2"
                  onClick={(e) => {
                    toggle(index);
                  }}
                >
                  <IoIosArrowDown
                    className={`${
                      showTeamInfo === index ? "rotate-180" : "rotate-0"
                    } duration-300 text-gray text-base`}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
