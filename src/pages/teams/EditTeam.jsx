import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Select from "react-select";
import { toast } from "react-toastify";
import {
  useEditTeamMutation,
  useGetTeamIdQuery,
  useGetPermissionsUserIdQuery,
} from "../../redux";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";

import IconUserImg from "../../assets/img/user.png";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: getTeamId, isLoading } = useGetTeamIdQuery(id);
  const [editTeam] = useEditTeamMutation();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  const [formValue, setFormValue] = React.useState({
    name: "",
  });

  // const options = dataGetTeams.map((item, index) => {
  //   return {
  //     value: item.id,
  //     label: item.name,
  //     id: index + 1,
  //   };
  // });

  React.useEffect(() => {
    if (getPermissionsUserId && getPermissionsUserId.length === 0) {
      navigate("/teams");
    }

    if (!isLoading) {
      setFormValue({
        name: getTeamId.name,
      });
    }
  }, [isLoading]);

  const handleEditTeam = async (e) => {
    e.preventDefault();
    await editTeam({
      id,
      name: formValue.name,
    }).unwrap();
    navigate("/teams");
    toast.success("Team updating");
  };

  // const handleDeletUser = async (e) => {
  //   e.preventDefault();
  //   await deletUser(id);
  //   navigate("/");
  //   toast.success("User DELETED");
  // };

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
            onClick={() => navigate(`/team/permissions/${id}`)}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          <button  onClick={() => navigate(`/team/members`)} className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg">
            Members
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
