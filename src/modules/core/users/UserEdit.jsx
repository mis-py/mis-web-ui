import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import {
  useEditUserMutation,
  useAddUserMutation,
} from "redux/api/usersApi";

import { useEditLocalVariablesMutation } from "redux/api/variablesApi";

import { useEditGrantedPermissionMutation } from "redux/api/permissionsApi";

import EditItem from "modules/core/components/EditItemComponent";
import UserForm from "modules/core/components/UserFormComponent";
import VariablesForm from "modules/core/components/VariablesFormComponent";
import PermissionsForm from "modules/core/components/PermissionFormComponent";

const UserEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const editMode = id !== undefined;

    const [user, setUser] = useState({});

    const [editUser] = useEditUserMutation();
    const [addUser] = useAddUserMutation();

    const [editUserVariables] = useEditLocalVariablesMutation();
    const [editUserPermission] = useEditGrantedPermissionMutation();

    const handleSave = async (e) => {
      e.preventDefault();

      let params = {
        user_id: id,
        username: user.username,
        password: user.password,
        position: user.position,

        ...(user.team ? {team_id: user.team.value} : {})
      }
      
      let callMethod = editMode ? editUser : addUser;

      await callMethod(params).then(async ({ data, error}) => {
        if (error){
          toast.error(`Error during ${editMode ? 'edit' : 'creating'} user: ${error}`);
        } else {
          toast.success(`${editMode ? 'Edited' : 'Added new'} user`);

          if (user.variables?.length > 0){
            await handleSaveVariables(data.id);
          }
    
          if (user.permissions?.length > 0){
            await handleSavePermissions(data.id);
          }

          navigate(`/users/${data.id}`);
        }
      });
    }

    const handleSaveVariables = async (user_id) => {
      let variables = user.variables?.filter(item=>item);

      await editUserVariables({ user_id, variables}, {skip: !variables}).then(({data, error}) => {
        if (error) {
          toast.error(`Variables were not saved: ${error}`);
        } else {
          toast.success(`Variables saved`);
        }
      });
    }

    const handleSavePermissions = async (user_id) => {
      let scopesList = user.permissions?.filter(item => item);

      await editUserPermission({ user_id, scopesList }, {skip: !scopesList}).then(({data, error}) => {
        if (error) {
          toast.error(`Permissions were not saved: ${error}`);
        } else {
          toast.success(`Permissions saved`);
        }
      });
    }

    const onVariableChange = async (id, value) => {
      let variables = user.variables ?? [];
      variables[id] = {variable_id: id, new_value: value};
      setUser({...user, variables});
    }

    const onPermissionChange = async (id, value) => {
      let permissions = user.permissions ?? [];
      permissions[id] = {permission_id: id, granted: value};
      setUser({...user, permissions});
    }

    const onUserChange = async (field, value) => {
      setUser({...user, [field]: value});
    }

    const itemProps = {
      pageHeader: ["Administration", {name: "Users", path: "/users"}, (editMode ? "Edit" : "New")],
      saveButtonEvent: handleSave,
      formName: "User",
      sections: [
        {
            name: "User",
            element: <UserForm user_id={id} onChange={onUserChange} />,
        },
        {
            name: "Permissions",
            element: <PermissionsForm user_id={id} onChange={onPermissionChange} />
        },
        {
            name: "Variables",
            element: <VariablesForm user_id={id} onChange={onVariableChange} />
        },
      ]
    }

    return <EditItem {...itemProps} />;
  };
  
  export default UserEdit;