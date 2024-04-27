import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
    useGetModulesQuery,
    useStartModuleMutation,
    useStopModuleMutation,
    useInitModuleMutation,
    useShutdownModuleMutation,
  
    useGetGlobalVariablesQuery,
} from "redux/index";

import { selectFirstSelector } from 'redux/api/modulesApi';

import { setAppData } from 'redux/slices/appSlice';

import EditItem from "modules/core/components/EditItemComponent";
import AppForm from "modules/core/components/AppFormComponent";
import SettingsForm from "modules/core/components/VariablesFormComponent";

const AppEdit = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const modulesGetRresult = useMemo(selectFirstSelector, []);

    const { 
      data: getApp,
      isLoading,
      isSuccess,
      error,
    } = useGetModulesQuery({module_id: id}, {
      selectFromResult: (result) => ({
        ...result,
        data: modulesGetRresult(result)
      })
    });
    
    const manifest = getApp?.manifest;

    // fill current user with data
    // useEffect(() => {
    //     if (!loadingApp) {
    //         dispatch(setAppData(getApp[0]));
    //     }

    // }, [loadingApp]);

    const [startApp] = useStartModuleMutation();
    const [stopApp] = useStopModuleMutation();
    const [loadApp] = useInitModuleMutation();
    const [unloadApp] = useShutdownModuleMutation();
  
    // const { data: getPermissionsUserId = [] } = useGetPermissionsUserIdQuery(id);
    // const [editTeam] = useEditTeamMutation();
    // const [addTeam] = useAddTeamMutation();


    // this is for update settings
    // const [editTeamSettingsSet] = useSettingsTeamSetMutation();
    // const [editTeamPermission] = useEditTeamPermissionMutation();

    // what is this for?
    // const { refetch: refetchUsers } = useGetUsersQuery();

    // useLoadAppMutation,
    // useUnloadAppMutation,

    const handleSave = async (e) => {
        e.preventDefault();
        toast.success(`Saved app ${getApp.name}`);
    }

    const handleAppStateChange = async (e) => {
        let callMethod = e ? startApp : stopApp;

        await callMethod({module_id: getApp.id}).then(({data, error}) => {
            if (error) {
                toast.error(`Error during change app ${getApp.name} state: ${error}`);
              } else {
                toast.success(`App ${getApp.name} ${e ? 'started' : 'stopped'}`);
              }
        });
    }

    const handleAppLoadStateChange = async (load) => {
      let callMethod = load ? loadApp : unloadApp;
      
      await callMethod({module_id: getApp.id}).then(({data, error}) => {
        if (error) {
            toast.error(`Error during change app ${getApp.name} loading state: ${error}`);
          } else {
            toast.success(`App ${getApp.name} ${load ? 'loaded' : 'unloaded'}`);
          }
      });
    }

    return (
        isSuccess ? (
          <EditItem
          pageHeader={["Administration", {name: "Modules", path: "/modules"}, manifest?.display_name ?? ""]}
          saveButtonEvent={handleSave}
          sections={[
            {
                name: "App",
                element: <AppForm app={getApp} onAppStateChange={handleAppStateChange} onAppLoadStateChange={handleAppLoadStateChange} /> 
            },
            {
                name: "Settings",
                element: <SettingsForm module_id={id} />
            }
          ]}
          />
        ) : (
          <div>Loading...</div>
        )
    )
  };
  
  export default AppEdit;