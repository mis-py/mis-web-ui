import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  useEditUserMutation,
  useGetUserIdQuery,
  useGetTeamsQuery,
  useGetPermissionsUserIdQuery,
} from "redux/index";
import {
  addUserName,
  addUserPassword,
  addUserTeam,
  addUserPosition,
} from "redux/slices/userSlice";

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
  }),
};

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { data: getUserId = [], isLoading: loadingGetUserId } =
    useGetUserIdQuery(id);
  const { data: dataGetTeams = [] } = useGetTeamsQuery();
  const { data: getPermissionsUserId = [] } = useGetPermissionsUserIdQuery(id);
  const [editUser] = useEditUserMutation();

  const options = dataGetTeams?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  React.useEffect(() => {
    if (!loadingGetUserId) {
      dispatch(addUserName(getUserId.username));
      dispatch(
        addUserTeam(
          getUserId.team === null
            ? null
            : { value: getUserId.team.id, label: getUserId.team.name }
        )
      );
      dispatch(addUserPosition(getUserId.position));
    }
  }, [loadingGetUserId]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    await editUser({
      id,
      username: user.username,
      team_id: user.team === null ? null : user.team.value,
      new_password: user.password ? user.password : "",
      position: user.position,
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
          <Input
            label={"Username"}
            type={"text"}
            id={"username"}
            value={user.username === null ? "" : user.username}
            changeValue={(e) => dispatch(addUserName(e.target.value))}
          />
          <Input
            label="Password"
            type="password"
            id="new-password"
            placeholder="Enter a new password"
            value={user.password === null ? "" : user.password}
            changeValue={(e) => dispatch(addUserPassword(e.target.value))}
          />
          <label className="flex flex-col gap-1 mb-4" htmlFor="team">
            Team
            <Select
              isClearable
              options={options}
              styles={customStyles}
              placeholder={user.team === null && "No team"}
              value={user.team === null ? "" : user.team}
              onChange={(choice) =>
                dispatch(addUserTeam(choice !== null ? choice : null))
              }
            />
          </label>
          <Input
            label={"Job position"}
            type={"text"}
            id={"job-position"}
            placeholder={user.position === "" ? "No position" : user.position}
            value={user.position === null ? "" : user.position}
            changeValue={(e) => dispatch(addUserPosition(e.target.value))}
          />
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <ButtonDark
            name={"Permissions"}
            length={getPermissionsUserId?.length}
            to={`/user/permissions/${id}`}
          />
          <ButtonDark
            name={"Settings"}
            length={getUserId.settings?.length}
            to={`/user/settings/${id}`}
          />
        </div>
        <button onClick={handleEditUser} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
