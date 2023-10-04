import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { 
  useAddGroupMutation, 
  useEditGroupMutation,
  useGetGroupQuery,
  useEditGroupMembersMutation,
  useGetRestrictedObjectsQuery,
  useGetGroupAllowedObjectsQuery,
  useEditGroupAllowedObjectsMutation
} from "redux/index";

import { addGroupData } from "redux/slices/groupSlice";
import { toast } from "react-toastify";
import EditItem from "../components/EditItemComponent";
import GroupForm from "modules/core/components/GroupFormComponent";
import RestrictedObjectsForm from "modules/core/components/RestrictedObjectFormComponent";

const GroupEdit = () => {
    const { id } = useParams();

    const editMode = id !== undefined;

    const dispatch = useDispatch();
    const group = useSelector((state) => state.group);

    const {
      data: getGroup = [],
      isLoading: loadingGroup,
      error: errorGroup,
    } = useGetGroupQuery(id, {
      skip: editMode ===false
    });

    useEffect(() => {
      if (!loadingGroup && editMode){
        dispatch(addGroupData(getGroup));
      }

    }, [loadingGroup])

    // const {
    //   data: getUsers = [],
    //   isLoading: loadingUsers,
    //   error: errorUsers,
    // } = useGetUsersQuery();

    // const { 
    //   data: getGroupsObjects = [], 
    //   isLoading: loadingGroupsObjects 
    // } =useGetGroupsObjectsQuery();
    // const { 
    //   data: getIdObjects = [] 
    // } = useGetGroupIdObjectsQuery(id);
  
    // const [editObjectsGroup] = useEditObjectsGroupMutation();

    // const { 
    //   data: getGroupIdUsers, 
    //   refetch: refetchMembers, 
    //   isLoading: isGroupIdUsersLoading 
    // } = useGetGroupIdUsersQuery(id);

    const [editGroupMembers] = useEditGroupMembersMutation();

    const [editGroup] = useEditGroupMutation();
    const [addGroup] = useAddGroupMutation();

    // React.useEffect(() => {
    //   if (errorUsers) {
    //     toast.error("No users found");
    //   }
    // }, [errorUsers]);

    // const handleAddGroup = async (e) => {
    //   e.preventDefault();
    //   if (!errorUsers) {
    //     if (formValue.name < 1) {
    //       toast.error("Invalid group name");
    //     } else {
    //       await addGroup({
    //         ...formValue,
    //         users_ids: members,
    //       }).unwrap();
    //       navigate("/groups");
    //       toast.success("Added new group");
    //     }
    //   }
    // };

    const handleSave = async (e) => {
      e.preventDefault();

      let params = {
        id,
        name: group.name,
        users_ids: group.members
      }

      let callMethod = editMode ? editGroup : addGroup;

      let response = await callMethod(params).unwrap();
      console.log(response);
      toast.success(`${editMode ? 'Edited' : 'Added new'} group ${group.name}`);

      if (Object.keys(group.members).length !== 0){
        await handleSaveMembers(response.id);
      }
    }

    const handleSaveMembers = async (group_id) => {
        let params = {
          id: group_id,
          users_ids: group.members
        }

        await editGroupMembers(params).then((data) => {
          if (data.error !== undefined && data.error.data.message !== undefined) {
            toast.error(`Members were not saved: ${data.error.data.message}`);
          } else {
            toast.success(`Members saved for group ${group.name}`);
          }
          // refetchMembers().then(() => {
          //   navigate("/groups");
          //   toast.success("Group members updating");
          // });
        });

    };

    let getGroupRestrictedObjects = useGetGroupAllowedObjectsQuery(id, {
      skip: editMode === false
    });
    let getAllRestrictedObjects = useGetRestrictedObjectsQuery();

    // const [editObjectsGroup] = useEditObjectsGroupMutation();

    return (<EditItem
        pageHeader={["Administration", "isBack:Groups", (editMode ? group.name : "New group")]}
        saveButtonEvent={handleSave}
        sections={[
          {
            name: "Group",
            element: <GroupForm groupId={id} />
          },
          {
            name: "Restricted objects",
            element: <RestrictedObjectsForm groupObjectsData={getGroupRestrictedObjects} allObjectsData={getAllRestrictedObjects} />
          }
        ]}
      />
    );
};

export default GroupEdit;
