import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddTeamMutation, useGetPermissionsUserIdQuery } from "../../redux";
import { deletePermissions } from "../../redux/slices/addTeamPermissionsSlice";
import { deleteMembersAll } from "../../redux/slices/addTeamMembersSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

const AddTeam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.addTeamMembers.members);
  const permissions = useSelector(
    (state) => state.addTeamPermissions.permissions
  );
  const [addTeam, { error: errorAddTeam }] = useAddTeamMutation();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  const [formValue, setFormValue] = React.useState({
    name: "",
    permissions: [],
    users_ids: [],
  });

  React.useEffect(() => {
    if (getPermissionsUserId && getPermissionsUserId.length === 0) {
      navigate("/teams");
    }
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!errorAddTeam) {
      if (formValue.username < 1) {
        toast.error("Name min 2");
      } else {
        await addTeam({
          ...formValue,
          permissions: permissions,
          users_ids: members,
        }).unwrap();
        navigate("/teams");
        dispatch(deletePermissions());
        dispatch(deleteMembersAll());
        toast.success("Added new team");
      }
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/teams">back</Link>
        </div>
        <h3 className="h3 mt-5">New team</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="name">
            Team name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none"
              type="text"
              id="name"
              placeholder="Enter a name"
              autoComplete="off"
              value={formValue.team_name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-6">
          <button
            onClick={() => navigate(`/add-team/permissions`)}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({permissions.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          <button
            onClick={() => navigate(`/add-team/members`)}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Members ({members.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
        </div>
        <button onClick={handleAddUser} className="btn-primary">
          Create a team
        </button>
      </div>
    </div>
  );
};

export default AddTeam;
