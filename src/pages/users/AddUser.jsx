import React from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserName, addUserTeam } from "../../redux/slices/addUserSlice";
import { useAddUserMutation } from "../../redux/usersApi";
import { useGetTeamsQuery } from "../../redux/teamsApi";
import { toast } from "react-toastify";

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
    boxShadow: "none",
  }),
};

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.addUser);
  const [addUser, { error: errorAddUser }] = useAddUserMutation();
  const { data: getTeams = [] } = useGetTeamsQuery();

  const [formValue, setFormValue] = React.useState({
    username: user.name,
    password: "",
    team: user.team,
  });

  const options = getTeams?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!errorAddUser) {
      if (formValue.username < 1) {
        toast.error("Name too short");
      } else if (formValue.password < 5) {
        toast.error("The password is too short");
      } else {
        await addUser({
          ...formValue,
          team_id: formValue.team.value,
        }).unwrap();
        navigate("/users");
        toast.success("Added new user");
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
        <h3 className="h3 mt-5">New user</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="username">
            Username
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="username"
              placeholder="Enter a name"
              autoComplete="off"
              value={formValue.username}
              onChange={(e) =>
                setFormValue({ ...formValue, username: e.target.value })
              }
            />
          </label>

          <label className="flex flex-col gap-1 mb-4" htmlFor="password">
            Password
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="password"
              id="password"
              placeholder="Enter a password"
              autoComplete="off"
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </label>

          <label className="flex flex-col gap-1 mb-4" htmlFor="team">
            Team
            <Select
              options={options}
              styles={customStyles}
              placeholder="The team is not selected"
              id="team"
              value={
                formValue.team.value === null
                  ? ""
                  : { ...formValue.team }
              }
              onChange={(choice) =>
                setFormValue({
                  ...formValue,
                  team: choice,
                })
              }
            />
          </label>

          <label className="flex flex-col gap-1 mb-4" htmlFor="job-position">
            Job position
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="job-position"
              placeholder="Enter position"
              autoComplete="off"
            />
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => {
              dispatch(addUserName(formValue.username));
              dispatch(addUserTeam(formValue.team));
              navigate(`/add-user/permissions`);
            }}
            className="flex w-full justify-between items-center cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({user.permissions.length})
            <AiOutlinePlusCircle className="text-xl" />
          </button>
          <button
            onClick={() => {
              dispatch(addUserName(formValue.username));
              dispatch(addUserTeam(formValue.team));
              navigate(`/add-user/settings`);
            }}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Settings
            <AiOutlinePlusCircle className="text-xl" />
          </button>
        </div>
        <button onClick={handleAddUser} className="btn-primary">
          Add user
        </button>
      </div>
    </div>
  );
};

export default AddUser;
