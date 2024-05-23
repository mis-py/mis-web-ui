import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useAddTeamMutation,
    useEditTeamMutation,
} from "redux/api/teamsApi";
import { useEditGrantedPermissionMutation } from "redux/api/permissionsApi";
import { useEditLocalVariablesMutation } from "redux/api/variablesApi";

import EditItem from "modules/core/components/EditItemComponent";
import TeamForm from "modules/core/components/TeamFormComponent";
import VariablesForm from "modules/core/components/VariablesFormComponent";
import PermissionsForm from "modules/core/components/PermissionFormComponent";


const TeamEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const editMode = id !== undefined;

    const [team, setTeam] = useState({});

    const [editTeam] = useEditTeamMutation();
    const [addTeam] = useAddTeamMutation();

    const [editTeamVariables] = useEditLocalVariablesMutation();
    const [editTeamPermission] = useEditGrantedPermissionMutation();

    const handleSave = async (e) => {
        e.preventDefault();

        let params = {
            team_id: id,
            name: team.name,
            users_ids: team.users_ids,
        }

        let callMethod = editMode ? editTeam : addTeam;

        await callMethod(params).then(async ({data, error}) => {
          if (error){
            toast.error(`Error during ${editMode ? 'edit' : 'creating'} team: ${error}`);
          } else {
            toast.success(`${editMode ? 'Edited' : 'Added new'} team`);
            
            if (team.variables?.length > 0){
              await handleSaveVariables(data.id);
            }
    
            if (team.permissions?.length > 0){
                await handleSavePermissions(data.id);
            }

            navigate(`/teams/${data.id}`);
          }
        });
    }

    const handleSaveVariables = async (team_id) => {
      let variables = team.variables?.filter(item=>item);
      
      await editTeamVariables({team_id, variables}, {skip: !variables}).then(({data, error}) => {
        if (error) {
          toast.error(`Variables were not saved: ${error}`);
        } else {
          toast.success(`Variables saved`);
        }
      });
    }

    const handleSavePermissions = async (team_id) => {
      let scopesList = team.permissions?.filter(item => item);

      await editTeamPermission({ team_id, scopesList }, {skip: !scopesList}).then(({data, error})=>{
        if (error) {
          toast.error(`Permissions were not saved: ${error}`);
        } else {
          toast.success(`Permissions saved`);
        }
      });
    }

    const onVariableChange = async (id, value) => {
      let variables = team.variables ?? [];
      variables[id] = {variable_id: id, new_value: value};
      setTeam({...team, variables});
    }

    const onPermissionChange = async (id, value) => {
      let permissions = team.permissions ?? [];
      permissions[id] = {permission_id: id, granted: value};
      setTeam({...team, permissions});
    }

    const onTeamChange = async (field, value) => {
      setTeam({...team, [field]: value});
    }

    const itemProps = {
      pageHeader: ["Administration", { name: "Teams", path: '/teams' }, (editMode ? "Edit" : "New")],
      saveButtonEvent: handleSave,
      formName: "Team",
      sections: [
        {
            name: "Team",
            element: <TeamForm team_id={id} onChange={onTeamChange} />
        },
        {
            name: "Permissions",
            element: <PermissionsForm team_id={id} onChange={onPermissionChange} />
        },
        {
            name: "Variables",
            element: <VariablesForm team_id={id} onChange={onVariableChange} />
        }
      ]
    }

    return <EditItem {...itemProps}/>;
  };
  
  export default TeamEdit;