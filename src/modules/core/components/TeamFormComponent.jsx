import { React, useEffect, useState } from "react";
import { addTeamName, setTeamMembers } from "redux/slices/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "components/common/Input";
import UserSelector from "components/common/UserSelector";
import { useGetUsersQuery } from "redux/index";

const TeamForm = ({teamId}) => {
    const team = useSelector((state) => state.team);
    const dispatch = useDispatch();

    // const { data: usersList = [], isLoading: loadingUsers } = useGetUsersQuery();

    const [ usersData, setUsersData ] = useState({
        selectedUsers: [],
        remainingUsers: []
    });
    
    // useEffect(() => {
    //     let mappedUserList = usersList
    //         ?.map((item) => {
    //         return {
    //             value: item.id,
    //             label: item.username,
    //             teamID: item.team !== null ? item.team.id : null
    //         };
    //     });

    //     setUsersData({
    //         selectedUsers: mappedUserList?.filter((item) => item.teamID == teamId),
    //         remainingUsers: mappedUserList?.filter((item) => item.teamID != teamId && item.teamID == null)
    //     })

    // }, [loadingUsers]);

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
            getSelectedUsers={usersData.selectedUsers}
            getRemainingUsers={usersData.remainingUsers}
            onUsersChange={(e) => dispatch(setTeamMembers(e))}
        />
    </>
    );
}

export default TeamForm;