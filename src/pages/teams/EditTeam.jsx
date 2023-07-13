import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEditTeamMutation, useGetTeamIdQuery } from "redux/index";
import {
  addTeamName,
  addTeamPermissions,
  addTeamMembers,
  deleteTeamMembers,
  setTeamMembers,
} from "redux/slices/teamSlice";
import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

import TeamUsersShortList from "../../components/teams/TeamUsersShortList";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);
  const { data: getTeamId = [], isLoading: loadingTeamId } =
    useGetTeamIdQuery(id);
  const [editTeam] = useEditTeamMutation();

  React.useEffect(() => {
    let userIds = [];

    if (!(getTeamId === undefined || getTeamId.users === undefined || getTeamId.users.length === 0)) {
      userIds = getTeamId.users.map(user => user.id);
    }

    dispatch(setTeamMembers(userIds));
  }, [loadingTeamId]);

  const handleEditTeam = async (e) => {
    e.preventDefault();
    await editTeam({
      id,
      name: "",
      permissions: team.permissions,
      users_ids: team.members,
    }).then(() => {
      navigate("/teams");
      toast.success("Team updating");
    });
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <Link to={-1} className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <span>back</span>
        </Link>
        <h3 className="h3 mt-5">Editing Team</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="teamname">
            Team name
            <input
              className="bg-blackSecond text-gray border-none border-0 rounded px-3 py-2 focus-visible:outline-none"
              type="text"
              id="teamname"
              name="teamname"
              autoComplete="off"
              value={team.name === undefined ? "" : team.name}
              onChange={(e) => dispatch(addTeamName(e.target.value))}
            />
          </label>

          {getTeamId.users !== undefined && Array.isArray(getTeamId.users) && <TeamUsersShortList
              users={getTeamId.users}
              team={team.id}
          />}
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-6">
          <Link
            to={`/team/permissions/${id}`}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({team.permissions?.length})
            <AiOutlinePlusCircle className="text-xl" />
          </Link>
          <Link
            to={`/team/members/${id}`}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Members ({getTeamId.users?.length})
            <AiOutlinePlusCircle className="text-xl" />
          </Link>
        </div>
        <button onClick={handleEditTeam} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTeam;
