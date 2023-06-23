import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEditTeamMutation, useGetTeamIdQuery } from "redux/index";
import {
  addTeamName,
  addTeamPermissions,
  addTeamMembers,
} from "redux/slices/teamSlice";
import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

import Tooltip from "components/Tooltip";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);
  const { data: getTeamId = [], isLoading: loadingTeamId } =
    useGetTeamIdQuery(id);
  const [editTeam] = useEditTeamMutation();

  React.useEffect(() => {
    dispatch(addTeamName(getTeamId?.name));
    getTeamId.users?.map((user) =>
      !team.members.includes(user.id) ? dispatch(addTeamMembers(user.id)) : null
    );
    dispatch(addTeamPermissions(getTeamId?.permissions));
  }, [loadingTeamId]);

  const handleEditTeam = async (e) => {
    e.preventDefault();
    await editTeam({
      id,
      name: "",
      permissions: team.permissions,
      users_ids: team.members,
    }).unwrap();
    navigate("/teams");
    toast.success("Team updating");
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
              value={team.name}
              onChange={(e) => dispatch(addTeamName(e.target.value))}
            />
          </label>

          <div className="flex">
            {getTeamId.users?.map((item) => (
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
            ))}
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-6">
          <button
            onClick={() => navigate(`/team/permissions/${id}`)}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({team.permissions?.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          <button
            onClick={() => navigate(`/team/members/${id}`)}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Members ({team.members?.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
        </div>
        <button onClick={handleEditTeam} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
