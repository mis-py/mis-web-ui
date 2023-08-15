import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  useEditUserMutation,
  useGetUserIdQuery,
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

import PageHeader from "../../components/common/PageHeader";
import TeamSelector from "../../components/common/TeamSelector";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { data: getUserId = [], isLoading: loadingGetUserId } =
    useGetUserIdQuery(id);

  const { data: getPermissionsUserId = [] } = useGetPermissionsUserIdQuery(id);
  const [editUser] = useEditUserMutation();

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
  }, [loadingGetUserId, dispatch, getUserId]);

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
        <PageHeader
          header="Editing Profile"
        />
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
          <TeamSelector
              placeholder={user.team === null && "No team"}
              team={user.team === null ? "" : user.team}
              onChange={(choice) =>
                  dispatch(addUserTeam(choice !== null ? choice : null))
              }
          />
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
