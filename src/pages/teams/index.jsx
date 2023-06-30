import React from "react";
import { toast } from "react-toastify";

import { confirmAlert } from "react-confirm-alert";
import { useGetTeamsQuery, useDeleteTeamMutation } from "redux/index";
import { resetTeam } from "redux/slices/teamSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useOutsideClick from "hooks/useOutsideClick";

import Tooltip from "components/Tooltip";
import AdminWrapper from "config/AdminWrapper";

import { FiSearch } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineUsergroupAdd, AiOutlineSetting } from "react-icons/ai";

import ListItemWrapper from "../../components/common/ListItemWrapper";
import SpinnerLoader from "../../components/common/SpinnerLoader";

const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: getTeams = [],
    isLoading: loadingGetTeams,
    error: errorGetTeams,
  } = useGetTeamsQuery();
  const [deleteTeam] = useDeleteTeamMutation();

  const [showSearch, setShowSearch] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [serchValue, setSearchValue] = React.useState("");

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  React.useEffect(() => {
    dispatch(resetTeam());
    if (errorGetTeams) {
      toast.error("Teams not found");
    }
  }, [getTeams, errorGetTeams]);

  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(false);
      return;
    }
    setShowEdit(index);
  };

  const handleDeleteTeam = async (id) => {
    confirmAlert({
      title: "Delete team",
      message: "Are you sure you want to delete this team?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await deleteTeam(id);
            navigate("/teams");
            toast.success("Team deleted");
          },
        },
        {
          label: "No",
        },
      ],
      overlayClassName: "bg-blackSecond/70",
    });
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
        {loadingGetTeams ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-4">
            {getTeams
              ?.filter((el) =>
                el.name.toLowerCase().includes(serchValue.toLowerCase().trim())
              )
              .map((team, index) => (
                  <ListItemWrapper key={team.id}>
                    <div
                        ref={refPopup}
                        className={`${
                            showEdit === index
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                        } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
                    >
                      {/* <Link
                      className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      to="/teams"
                    >
                      Granting privileges
                    </Link> */}
                      <div
                          onClick={() => navigate(`/teams/${team.id}`)}
                          className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Editing
                      </div>

                      <div
                          onClick={() => handleDeleteTeam(team.id)}
                          className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Remove
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-backGround">
                      <div className="flex items-center gap-4">
                        <img
                            className="w-[56px] h-[56px]"
                            src={require("assets/img/groups.png")}
                            alt=""
                        />
                        <div className="flex flex-col">
                          <h5 className="text-gray text-xs">
                            Name of the department:
                          </h5>
                          <h4>{team.name}</h4>
                        </div>
                      </div>
                      <AdminWrapper>
                        <div className="flex gap-3 items-center">
                          {/*<AiOutlineSetting*/}
                          {/*    onClick={() => navigate(`/team/settings/${team.id}`)}*/}
                          {/*    className="text-2xl text-gray cursor-pointer"*/}
                          {/*/>*/}
                          <BiDotsVerticalRounded
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleEdit(index);
                              }}
                              className="text-3xl text-gray cursor-pointer"
                          />
                        </div>
                      </AdminWrapper>
                    </div>
                    <div className={`duration-300 flex flex-col pt-3`}>
                      <p className="mb-2">Members of the department:</p>
                      <div className="flex">
                        {team.users.length ? (
                            team.users.map((item) => (
                                <div
                                    key={item.id}
                                    className="group cursor-pointer shadow relative"
                                >
                                  <img
                                      className="w-[35px] h-[35px]"
                                      src={require("assets/img/user.png")}
                                      alt=""
                                  />
                                  <Tooltip name={item.username} />
                                </div>
                            ))
                        ) : (
                            <p className="text-danger">No users</p>
                        )}
                      </div>
                    </div>
                  </ListItemWrapper>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
