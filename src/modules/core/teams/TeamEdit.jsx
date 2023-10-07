import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
    useEditTeamPermissionMutation, 
    useSettingsTeamSetMutation,
    useAddTeamMutation,

    useGetPermissionsQuery,
    useGetPermissionsTeamIdQuery,
    useGetSettingsQuery,
    useGetSettingsTeamIdQuery
} from "redux/index";

import EditItem from "modules/core/components/EditItemComponent";
import TeamForm from "modules/core/components/TeamFormComponent";
import SettingsForm from "modules/core/components/SettingsFormComponent";
import PermissionsForm from "modules/core/components/PermissionFormComponent";

import { useEditTeamMutation, useGetTeamIdQuery } from "redux/index";
import { addTeamId, addTeamName, setTeamMembers } from "redux/slices/teamSlice";

const TeamEdit = () => {
    const { id } = useParams();

    const editMode = id !== undefined;

    const dispatch = useDispatch();
    const team = useSelector((state) => state.team);

    const { 
      data: getTeamId = [], 
      isLoading: loadingTeamId 
    } = useGetTeamIdQuery(id, {
      skip: editMode === false,
    });

    // fill current user with data
    useEffect(() => {
        let userIds = [];

        if (!loadingTeamId && editMode) {

            if (!(
                getTeamId === undefined ||
                getTeamId.users === undefined ||
                getTeamId.users.length === 0)
            ) {
                userIds = getTeamId.users.map((user) => user.id);
            }
            dispatch(addTeamId(getTeamId.id));
            dispatch(addTeamName(getTeamId.name));
            dispatch(setTeamMembers(userIds));

            if (userIds.length === 0) {
                return;
            }

        }

    }, [loadingTeamId]);
  
    // const { data: getPermissionsUserId = [] } = useGetPermissionsUserIdQuery(id);
    const [editTeam] = useEditTeamMutation();
    const [addTeam] = useAddTeamMutation();


    // this is for update settings
    const [editTeamSettingsSet] = useSettingsTeamSetMutation();
    const [editTeamPermission] = useEditTeamPermissionMutation();

    // what is this for?
    // const { refetch: refetchUsers } = useGetUsersQuery();

    // handle save all data
    const handleSave = async (e) => {
        e.preventDefault();

        let params = {
            id,
            name: team.name,
            permissions: team.permissions,
            users_ids: team.members,
            settings: team.settings,
        }

        let callMethod = editMode ? editTeam : addTeam;

        let response = await callMethod(params).unwrap();

        toast.success(`${editMode ? 'Edited' : 'Added new'} team ${team.name}`);

        if (Object.keys(team.settings).length !== 0){
            await handleSaveSettings(response.id);
        }

        if (Object.keys(team.permissions).length !== 0){
            await handleSavePermissions(response.id);
        }


      // TODO sometimes users not updated so call it manually
      // refetchUsers();
      //navigate(`/users/${id}`);
    }

    const handleSaveSettings = async (team_id) => {
      let dataSettings = Object.entries(team.settings).map((item) => ({
        setting_id: item[0],
        new_value: item[1]
      }));
      
      await editTeamSettingsSet({
        id: team_id,
        body: dataSettings,
      }).then((data) => {
        if (data.error !== undefined && data.error.data.message !== undefined) {
          toast.error(`Settings were not saved: ${data.error.data.message}`);
        } else {
          toast.success(`Saved settings for team ${team.name}`);
        }
      });
    }

    const handleSavePermissions = async (team_id) => {
      let dataPermissions = Object.entries(team.permissions).map((item) => ({
        permission_id: item[0],
        granted: item[1]
      }));
      await editTeamPermission({ 
        id: team_id, 
        scopesList: dataPermissions 
      }).unwrap();
      toast.success(`Saved permissions for team ${team.name}`);
    }

    const allPermissions = useGetPermissionsQuery();
    
    const teamPermissions = useGetPermissionsTeamIdQuery(id, {skip: editMode===false});

    const getSettings = useGetSettingsQuery();

    const getSettingsTeamId = useGetSettingsTeamIdQuery(id, {skip: editMode===false});

    return <EditItem
      pageHeader={["Administration", "isBack:Teams", (editMode ? team.name : "New team")]}
      saveButtonEvent={handleSave}
      sections={[
        {
            name: "Team",
            element: <TeamForm teamId={id} />
        },
        {
            name: "Settings",
            element: <SettingsForm settingsData={getSettings} itemSettings={getSettingsTeamId} />
        },
        {
            name: "Permissions",
            element: <PermissionsForm itemPermissionsData={teamPermissions} allPermissionsData={allPermissions} />
        }
      ]}
    />;
  };
  
  export default TeamEdit;