import { React } from "react";
import { addTeamName, setTeamMembers } from "redux/slices/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "components/common/Input";
import UserSelector from "components/common/UserSelector";

// Component renders current user in 'state.user' store
// Parent component must save or reset state after processing done
// TODO add avatar
const TeamForm = () => {
    const team = useSelector((state) => state.team);
    const dispatch = useDispatch();

    return (<>
        <Input
            label="Team name"
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter team name"
            value={team.name}
            onInputChange={(e) => dispatch(addTeamName(e.target.value))}
        />
        <UserSelector 
            teamId={team.id}
            onUsersChange={(e) => dispatch(setTeamMembers(e))}
        />
    </>
    );
}

export default TeamForm;