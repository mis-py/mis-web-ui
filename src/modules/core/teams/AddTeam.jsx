import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddTeamMutation } from "redux/index";
import { addTeamName } from "redux/slices/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AiOutlinePlusCircle } from "react-icons/ai";

import Input from "components/common/Input"
import PageHeader from "../../../components/common/PageHeader";

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
        <PageHeader
          header="New team"
        />
        <form className="my-7">
          <Input
          label={"Team name"}
          type={"text"}
          id={"name"}
          autoComplete="off"
          placeholder="Enter a name"
          value={team.name}
          changeValue={(e) => dispatch(addTeamName(e.target.value))}
          />
            {/* Team name */}
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
