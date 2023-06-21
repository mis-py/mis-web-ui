import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddTeamMutation } from "redux/index";
import { addTeamName } from "redux/slices/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

const AddTeam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);
  const [addTeam, { error: errorAddTeam }] = useAddTeamMutation();

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!errorAddTeam) {
      if (team.name < 1) {
        toast.error("Team name too short");
      } else {
        await addTeam({
          name: team.name,
          permissions: team.permissions,
          users_ids: team.members,
        }).unwrap();
        navigate("/teams");
        toast.success("Added new team");
      }
    }
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
        <h3 className="h3 mt-5">New team</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="name">
            Team name
            <input
              className="bg-blackSecond text-gray rounded border-none border-0 px-3 py-2 focus-visible:outline-none"
              type="text"
              id="name"
              placeholder="Enter a name"
              autoComplete="off"
              value={team.name}
              onChange={(e) => dispatch(addTeamName(e.target.value))}
            />
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => {
              navigate(`/add-team/permissions`);
            }}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({team.permissions.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          <button
            onClick={() => {
              navigate(`/add-team/members`);
            }}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Members ({team.members.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          {/* <button
            onClick={() => {
              navigate(`/add-team/settings`);
            }}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Settings ({team.settings.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button> */}
        </div>
        <button onClick={handleAddUser} className="btn-primary">
          Create a team
        </button>
      </div>
    </div>
  );
};

export default AddTeam;
