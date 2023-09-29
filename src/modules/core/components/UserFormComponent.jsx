import { React } from "react";
import {
    addUserName,
    addUserPassword,
    addUserTeam,
    addUserPosition,
  } from "redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "components/common/Input";
import TeamSelector from "components/common/TeamSelector";

// Component renders current user in 'state.user' store
// Parent component must save or reset state after processing done
// TODO add avatar
const UserForm = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (<>
    <Input
        label="Username"
        type="text"
        id="username"
        value={user.username === null ? "" : user.username}
        onInputChange={(e) => dispatch(addUserName(e.target.value))}
    />
    <Input
        label="Password"
        type="password"
        id="new-password"
        placeholder="Enter a new password"
        value={user.password === null ? "" : user.password}
        onInputChange={(e) => dispatch(addUserPassword(e.target.value))}
    />
    <TeamSelector
        team={user.team ?? null}
        onTeamChange={(choice) =>
            dispatch(addUserTeam(choice ?? null))
        }
    />
    <Input
        label="Job position"
        type="text"
        id="job-position"
        placeholder={user.position === "" ? "No position" : user.position}
        value={user.position === null ? "" : user.position}
        onInputChange={(e) => dispatch(addUserPosition(e.target.value))}
    />
    </>
    );
}

export default UserForm;