import React from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useDeleteTeamMutation } from "redux/index";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "hooks/useOutsideClick";
import AdminWrapper from "config/AdminWrapper";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";

import ListItemWrapper from "components/common/ListItemWrapper";
import TeamUsersShortList from "components/teams/TeamUsersShortList";

const TeamItem = ({ getTeams, serchValue }) => {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = React.useState(false);
  const [deleteTeam] = useDeleteTeamMutation();

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

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

  return getTeams
    ?.filter((el) =>
      el.name.toLowerCase().includes(serchValue.toLowerCase().trim())
    )
    .map((team, index) => (
      <ListItemWrapper key={team.id}>
        <div
          ref={refPopup}
          className={`${
            showEdit === index ? "opacity-100 visible" : "opacity-0 invisible"
          } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
        >
          <Link
            to={`/teams/${team.id}`}
            className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
          >
            Editing
          </Link>
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
              <div className="text-gray text-xs">Name of the department:</div>
              <h4>{team.name}</h4>
            </div>
          </div>
          <AdminWrapper>
            <div className="flex gap-3 items-center">
              <Link to={`/team/settings/${team.id}`}>
                <AiOutlineSetting className="text-2xl text-gray cursor-pointer" />
              </Link>

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
        <div className="duration-300 flex flex-col pt-3">
          <p className="mb-2">Members of the department:</p>
          {team.users !== undefined && Array.isArray(team.users) && (
            <TeamUsersShortList users={team.users} team={team.id} />
          )}
        </div>
      </ListItemWrapper>
    ));
};

export default TeamItem;
