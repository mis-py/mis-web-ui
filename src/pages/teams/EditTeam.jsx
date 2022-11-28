import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useEditTeamMutation,
  useGetTeamIdQuery,
  useGetPermissionsUserIdQuery,
} from "../../redux";
import { addMembers } from "../../redux/slices/editTeamMembersSlice";
import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

import IconUserImg from "../../assets/img/user.png";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state.editTeamPermissions.permissions
  );
  const members = useSelector((state) => state.editTeamMembers.members);
  const { data: getTeamId, isLoading } = useGetTeamIdQuery(id);
  const [editTeam] = useEditTeamMutation();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  const [formValue, setFormValue] = React.useState({
    name: "",
    permissions: [],
    users_ids: [],
  });

  React.useEffect(() => {
    getTeamId &&
      getTeamId.users.map((user) =>
        !members.includes(user.id) ? dispatch(addMembers(user.id)) : "sad"
      );

    if (getPermissionsUserId && getPermissionsUserId.length === 0) {
      navigate("/teams");
    }

    if (!isLoading) {
      setFormValue({
        name: getTeamId.name,
        permissions: permissions,
        users_ids: members,
      });
    }
  }, [isLoading]);

  const handleEditTeam = async (e) => {
    e.preventDefault();
    await editTeam({
      id,
      ...formValue,
    }).unwrap();
    navigate("/teams");
    toast.success("Team updating");
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
        <h3 className="h3 mt-5">Editing Team</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="teamname">
            Team name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none"
              type="text"
              id="teamname"
              autoComplete="off"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>

          <div className="flex">
            {!isLoading &&
              getTeamId.users.map((item) => (
                <img
                  key={item.id}
                  className="w-[29px] h-[29px] shadow -ml-1"
                  src={IconUserImg}
                  alt=""
                />
              ))}
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-6">
          <button
            onClick={() => navigate(`/team/permissions`)}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({permissions.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          <button
            onClick={() => navigate(`/team/members/${getTeamId.id}`)}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Members ({members.length})
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
