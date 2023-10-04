import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setUserSetting,
    addUserDefaultSettings,
} from "redux/slices/userSlice";

import Input from "components/common/Input";
import Search from "components/common/SearchComponent";

const SettingsForm = ({settingsData, itemSettings, isGlobal=false}) => {
    const dispatch = useDispatch();

    // nested destructurizing looks like a bit complex but actually it is easy
    const { 
        data: {entities: getSettings = {}, allIds: getSettingsAllIds = []} = {}, isLoading: loadingGetSettings 
    } = settingsData;

    const { 
        data: {entities: getItemSettings = {}, allIds: getItemSettingsAllIds = []} = {}, isLoading: loadingItemSettings 
    } = itemSettings;

    const searchValue = useSelector((state) => "SettingsForm" in state.search.searchData ? state.search.searchData["SettingsForm"] : "");

    let inputs = getSettingsAllIds
        // replace array of keys with actual settings, also fill value if exist
        .map((key) => {
            return {
                ...getSettings[key],
                value: getItemSettings[key]?.value
            }
        })
        // filter settings by searchValue
        .filter((item) => item.key.toLocaleLowerCase().includes(searchValue.toLowerCase().trim()))
        // only local user settings here
        .filter((item) => item.is_global == isGlobal);
    
    const handleChangeSetting = async (e, item) => {
        dispatch(setUserSetting({id: item.id, value: e.target.value}));
    }

    const handleChangeToDefault = async (e, item) => {
        dispatch(addUserDefaultSettings({id: item.id, default_value: item.default_value}));
    }

    return (
    <div className="form-control">
        <label className="label">
            <span className="label-text">Enter setting name to search...</span>
        </label>
        <Search searchParams={{
            key: "SettingsForm", 
            value: searchValue, 
            placeholder: "SETTING_NAME or module_name"}} 
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
    </div>
    );
};

export default SettingsForm;
