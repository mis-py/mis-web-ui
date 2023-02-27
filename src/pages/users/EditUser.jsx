import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  useEditUserMutation,
  useGetUserIdQuery,
  useGetTeamsQuery,
  useGetPermissionsUserIdQuery,
} from "redux/index";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    color: state.isSelected ? "#ffffff" : "#757575",
    backgroundColor: state.isSelected ? "#1A69DF" : "#1d1d1d",
    borderRadius: "4px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#757575",
    backgroundColor: "#1d1d1d",
  }),
  control: (base, state) => ({
    ...base,
    background: "#1d1d1d",
    color: "#757575",
    borderColor: "none",
    borderWidth: "0",
    boxShadow: state.isFocused ? null : null,
  }),
  menu: (provided) => ({
    ...provided,
    padding: 10,
    backgroundColor: "#1d1d1d",
  }),
  input: (provided) => ({
    ...provided,
    color: "#757575",
  }),
};

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: getUserId = [], isLoading } = useGetUserIdQuery(id);
  const { data: dataGetTeams = [] } = useGetTeamsQuery();
  const { data: getPermissionsUserId = [] } = useGetPermissionsUserIdQuery(id);
  const [editUser] = useEditUserMutation();

  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
    team: {},
  });

  const options = dataGetTeams?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  React.useEffect(() => {
    if (!isLoading) {
      setFormValue({
        username: getUserId.username,
        password: "",
        team: {
          id: getUserId.team === null ? 0 : getUserId.team.id,
          name: getUserId.team === null ? "No team" : getUserId.team.name,
        },
      });
    }
  }, [isLoading]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    await editUser({
      id,
      team_id: formValue.team.id,
      new_password: formValue.password ? formValue.password : "",
    }).unwrap();
    navigate("/users");
    toast.success("User updated");
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
        <h3 className="h3 mt-5">Editing Profile</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Username
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="username"
              autoComplete="off"
              value={formValue.username}
              readOnly
            />
          </label>

          <label className="flex flex-col gap-1 mb-4" htmlFor="new-password">
            Password
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="password"
              id="new-password"
              placeholder="Enter a password"
              autoComplete="off"
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </label>
          <label htmlFor="team">
            Team
            <Select
              options={options}
              styles={customStyles}
              value={{
                label: formValue.team.name,
                value: formValue.team.id,
              }}
              onChange={(choice) => {
                setFormValue({
                  ...formValue,
                  team: { id: choice.value, name: choice.label },
                });
              }}
            />
          </label>
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/user/permissions/${id}`)}
            className="flex w-full justify-between items-center cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({getPermissionsUserId?.length}
            )
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          <button
            onClick={() => navigate(`/user/settings/${id}`)}
            className="flex w-full justify-between items-center cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Settings ({getUserId.settings?.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
        </div>
        <button onClick={handleEditUser} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
