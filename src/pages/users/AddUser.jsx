import React from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserName,
  addUserPassword,
  addUserTeam,
  addUserPosition,
} from "redux/slices/userSlice";
import { useAddUserMutation, useGetTeamsQuery } from "redux/index";
import { toast } from "react-toastify";

import Input from "components/Input";
import ButtonDark from "components/ButtonDark";

import { IoIosArrowBack } from "react-icons/io";

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
  const user = useSelector((state) => state.user);
  const { data: getTeams = [] } = useGetTeamsQuery();
  const [addUser] = useAddUserMutation();

  const options = getTeams?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (user.username < 1) {
      toast.error("Name too short");
    } else if (user.password < 5) {
      toast.error("The password is too short");
    } else {
      await addUser({
        username: user.username,
        password: user.password,
        team_id: user.team === null ? null : user.team.value,
        position: user.position,
        permissions: user.permissions,
        settings: user.settings
          .map(
            (el) =>
              el.value !== "" && {
                setting_id: el.id,
                new_value: !!el.value && el.value,
              }
          )
          .filter((item) => item),
      }).unwrap();
      navigate("/users");
      toast.success("Added new user");
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
          <Input
            label={"Username"}
            type={"text"}
            id={"username"}
            autoComplete="off"
            placeholder={"Enter a name"}
            value={user.username}
            changeValue={(e) => dispatch(addUserName(e.target.value))}
          />
          <Input
            label={"Password"}
            type={"password"}
            id={"password"}
            autoComplete="off"
            placeholder={"Enter a password"}
            value={user.password}
            changeValue={(e) => dispatch(addUserPassword(e.target.value))}
          />
          <label className="flex flex-col gap-1 mb-4" htmlFor="team">
            Team
            <Select
              options={options}
              styles={customStyles}
              isClearable
              placeholder="The team is not selected"
              id="team"
              value={user.team === null ? 0 : user.team}
              onChange={(choice) =>
                dispatch(addUserTeam(choice !== null ? choice : null))
              }
            />
          </label>
          <Input
            label={"Job position"}
            type={"text"}
            id={"job-position"}
            placeholder={"Enter position"}
            value={user.position}
            changeValue={(e) => dispatch(addUserPosition(e.target.value))}
          />
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <ButtonDark
            name={"Permissions"}
            length={user.permissions.length}
            to={"/add-user/permissions"}
          />
          <ButtonDark
            name={"Settings"}
            length={user.settings.filter((el) => el.value !== "").length}
            to={"/add-user/settings"}
          />
        </div>
        <button onClick={handleAddUser} className="btn-primary">
          Add user
        </button>
      </div>
    </div>
  );
};

export default AddUser;
