import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  useEditUserMutation,
  useGetUserIdQuery,
  useAddUserMutation,
  useSettingUserSetMutation,
  useGetUsersQuery,
  useEditUserPermissionMutation,
} from "redux/index";

import {
  addUserName,
  addUserPassword,
  addUserTeam,
  addUserPosition,
} from "redux/slices/userSlice";

import EditUser from "modules/core/components/EditUserComponent";
import { FiSave } from "react-icons/fi";

import UserForm from "../components/UserFormComponent";
import SettingsForm from "../components/SettingsFormComponent";
import PermissionsForm from "../components/PermissionFormComponent";

const UserEdit = () => {
    const { id } = useParams();

    const editMode = id !== undefined;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const { data: getUserId = [], isLoading: loadingGetUserId } = useGetUserIdQuery(id, {
      skip: editMode === false,
    });

    // fill current user with data
    useEffect(() => {
        if (!loadingGetUserId && editMode) {
            dispatch(addUserName(getUserId.username));
            dispatch(addUserTeam(
                getUserId.team === null
                ? null
                : { value: getUserId.team.id, label: getUserId.team.name }
            )
            );
            dispatch(addUserPosition(getUserId.position));
        }
    }, [loadingGetUserId]);
  
    // const { data: getPermissionsUserId = [] } = useGetPermissionsUserIdQuery(id);
    const [editUser] = useEditUserMutation();
    const [addUser] = useAddUserMutation();


    // this is for update settings
    const [editUserSettingsSet] = useSettingUserSetMutation();
    const [editUserPermission] = useEditUserPermissionMutation();

    // what is this for?
    // const { refetch: refetchUsers } = useGetUsersQuery();

    // handle save all data
    const handleSave = async (e) => {
      e.preventDefault();

      if (editMode) {
        await handleEditUser();
      } else {
        await handleAddUser();
      }

      // refetchUsers();
      //navigate(`/users/${id}`);
    }

    const handleAddUser = async () => {
      let response = await addUser({
        username: user.username,
        password: user.password,
        team_id: user.team === null ? null : user.team.value,
        position: user.position,
      }).unwrap();
      toast.success(`Added new user: ${user.username}`);

      if (Object.keys(user.settings).length !== 0){
        await handleSaveSettings(response.id);
      }

      if (Object.keys(user.permissions).length !== 0){
        await handleSavePermissions(response.id);
      }
    
    }

    const handleEditUser = async () => {
      await editUser({
        id,
        username: user.username,
        team_id: user.team === null ? null : user.team.value,
        new_password: user.password ? user.password : "",
        position: user.position,
      }).unwrap();

      toast.success(`Updated user: ${user.username}`);

      if (Object.keys(user.settings).length !== 0){
        await handleSaveSettings(id);
      }

      if (Object.keys(user.permissions).length !== 0){
        await handleSavePermissions(id);
      }
    }

    const handleSaveSettings = async (user_id) => {
      let dataSettings = Object.entries(user.settings).map((item) => ({
        setting_id: item[0],
        new_value: item[1]
      }));
      
      await editUserSettingsSet({
        id: user_id,
        body: dataSettings,
      }).then((data) => {
        if (data.error !== undefined && data.error.data.message !== undefined) {
          toast.error(`Settings were not saved: ${data.error.data.message}`);
        } else {
          toast.success(`Saved settings for user ${user.username}`);
        }
      });
    }

    const handleSavePermissions = async (user_id) => {
      let dataPermissions = Object.entries(user.permissions).map((item) => ({
        permission_id: item[0],
        granted: item[1]
      }));
      await editUserPermission({ 
        id: user_id, 
        scopesList: dataPermissions 
      }).unwrap();
      toast.success(`Saved permissions for user ${user.username}`);
    }

    const itemProps = {
      settingsSection: <SettingsForm id={id} />,
      permissionsSection: <PermissionsForm id={id} />,
      formSection: <UserForm />,
      pageHeader: editMode ? user.username : "New",
      routeHeader: "Users",
      saveButtonEvent: handleSave,
      saveButtonTitle: "Save",
      saveButtonIcon: <FiSave />,
    }

    return <EditUser {...itemProps} />;
  };
  
  export default UserEdit;