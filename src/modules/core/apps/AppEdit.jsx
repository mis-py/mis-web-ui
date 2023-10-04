import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
    useGetAppByIdQuery,
    useStartAppMutation,
    useStopAppMutation,
    useLoadAppMutation,
    useUnloadAppMutation,
    useGetSettingsAppIdQuery
} from "redux/index";

import { setAppData } from 'redux/slices/appSlice';

import EditItem from "modules/core/components/EditItemComponent";
import AppForm from "modules/core/components/AppFormComponent";
import SettingsForm from "modules/core/components/SettingsFormComponent";

const AppEdit = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const app = useSelector((state) => state.app);

    const { 
      data: getApp = null, 
      isLoading: loadingApp
    } = useGetAppByIdQuery(id);

    const getSettingsAppId = useGetSettingsAppIdQuery(id);

    // fill current user with data
    useEffect(() => {
        if (!loadingApp) {
            dispatch(setAppData(getApp));
        }

    }, [loadingApp]);

    const [startApp] = useStartAppMutation();
    const [stopApp] = useStopAppMutation();
    const [loadApp] = useLoadAppMutation();
    const [unloadApp] = useUnloadAppMutation();
  
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
        toast.success(`Saved app ${app.name}`);
    }

    const handleAppStateChange = async (e) => {
        let callMethod = e ? startApp : stopApp;

        await callMethod(app.id).then((data) => {
            if (data.error !== undefined && data.error.data.message !== undefined) {
                toast.error(`Error during change app ${app.name} state`);
              } else {
                toast.success(`App ${app.name} ${e ? 'started' : 'stopped'}`);
              }
        });
    }

    const handleAppLoadStateChange = async (load) => {
      let callMethod = load ? loadApp : unloadApp;
      
      await callMethod(app.id).then((data) => {
        if (data.error !== undefined && data.error.data.message !== undefined) {
            toast.error(`Error during change app ${app.name} loading state`);
          } else {
            toast.success(`App ${app.name} ${load ? 'loaded' : 'unloaded'}`);
          }
      });
    }

    return <EditItem
      pageHeader={["Administration", "isBack:Apps", app.name]}
      saveButtonEvent={handleSave}
      sections={[
        {
            name: "App",
            element: <AppForm app={getApp} onAppStateChange={handleAppStateChange} onAppLoadStateChange={handleAppLoadStateChange} /> 
        },
        {
            name: "Settings",
            element: <SettingsForm isGlobal={true} settingsData={getSettingsAppId} itemSettings={getSettingsAppId} />
        }
      ]}
    />;
  };
  
  export default AppEdit;