import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    useGetSettingsQuery,
    useGetSettingsUserIdQuery,
} from "redux/index";

import {
    setUserSetting,
    addUserDefaultSettings,
} from "redux/slices/userSlice";

import Input from "components/common/Input";
import Search from "components/common/SearchComponent";

const SettingsForm = ({id}) => {
    const dispatch = useDispatch();

    const editMode = id !== undefined;

    // nested destructurizing looks like a bit complex but actually it is easy
    const { 
        data: {entities: getSettings = {}, allIds: getSettingsAllIds = []} = {}, isLoading: loadingGetSettings 
    } = useGetSettingsQuery();
    const { 
        data: {entities: getUserSettings = {}, allIds: getUserSettingsAllIds = []} = {}, isLoading: loadingUserSettings 
    } = useGetSettingsUserIdQuery(id, {skip: editMode===false});

    const searchValue = useSelector((state) => "SettingsForm" in state.search.searchData ? state.search.searchData["SettingsForm"] : "");

    let inputs = getSettingsAllIds
        // replace array of keys with actual settings, also fill value if exist
        .map((key) => {
            return {
                ...getSettings[key],
                value: getUserSettings[key]?.value
            }
        })
        // filter settings by searchValue
        .filter((item) => item.key.toLocaleLowerCase().includes(searchValue.toLowerCase().trim()))
        // only local user settings here
        .filter((item) => item.is_global == false);
    
    const handleChangeSetting = async (e, item) => {
        dispatch(setUserSetting({id: item.id, value: e.target.value}));
    }

    const handleChangeToDefault = async (e, item) => {
        dispatch(addUserDefaultSettings({id: item.id, default_value: item.default_value}));
    }

    return (<>
        <Search searchParams={{
            key: "SettingsForm", 
            value: searchValue, 
            placeholder: "Enter setting name to search..."}} 
        />
        {inputs?.map((item) =>(
            <Input
                label={`${item.key} ( ${item.app.name} )`}
                primaryLabel={item.key}
                secondLabel={item.app.name}
                key={item.id}
                className="relative"
                id={item.key}
                type="text"
                autoComplete="off"
                onInputChange={(e) => handleChangeSetting(e, item)}
                value={item.value}
                name={item.key}
                readOnly={false}
                default_value={item.default_value}
                placeholder={item.default_value}
                setDefault={(e) => handleChangeToDefault(e, item)}
            />
        ))}
    </>);
};

export default SettingsForm;
