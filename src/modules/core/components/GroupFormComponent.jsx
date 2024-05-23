import { React, useEffect, useState } from "react";
import { setGroupName, setGroupMembers } from "redux/slices/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "components/common/Input";
import UserSelector from "components/common/UserSelector";
// import { useGetUsersQuery } from "redux/index";
// import { useGetGroupIdUsersQuery } from "redux/index";

const GroupForm = ({groupId}) => {
    const group = useSelector((state) => state.group);
    const dispatch = useDispatch();

    // const { data: usersList = [], isLoading: loadingUsers } = useGetUsersQuery();

    // const { data: groupUsersList = [], isLoading: loadingGroupUsers } = useGetGroupIdUsersQuery(groupId, {
    //     skip: groupId == undefined
    // });

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
    //         };
    //     });

        // let currentUsersList = groupUsersList?.map((item) => item.id);

        // setUsersData({
            // selectedUsers: mappedUserList?.filter((item) => currentUsersList.includes(item.value)),
            // remainingUsers: mappedUserList?.filter((item) => currentUsersList.includes(item.value) === false),
        // })
    // }, [loadingUsers/*, loadingGroupUsers*/]);

    return (<>
        <Input
            label="Group name"
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter group name"
            value={group.name}
            onInputChange={(e) => dispatch(setGroupName(e.target.value))}
        />
        <UserSelector
            getSelectedUsers={usersData.selectedUsers}
            getRemainingUsers={usersData.remainingUsers}
            onUsersChange={(e) => dispatch(setGroupMembers(e))}
        />
    </>
    );
}

export default GroupForm;