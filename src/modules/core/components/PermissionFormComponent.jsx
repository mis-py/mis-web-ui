import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";

import PermissionBox from "modules/core/components/PermissionBoxComponent";
import Search from "components/common/SearchComponent";

import { setUserPermission } from "redux/slices/userSlice";
import { useSelector } from "react-redux";

const PermissionsForm = ({itemPermissionsData, allPermissionsData}) => {
    const dispatch = useDispatch();

    const { 
        data: {entities: teamPermissions = {}, allIds: teamPermissionsIds = []} = {}, isLoading: loadingTeamPermissions 
    } = itemPermissionsData;

    const { 
        data: {entities: allPermissions = {}, allIds: allPermissionsIds = []} = {}, isLoading: loadingAllPermissions
    } = allPermissionsData;

    const searchValue = useSelector((state) => "PermissionsForm" in state.search.searchData ? state.search.searchData["PermissionsForm"] : "");
    
    let labels = allPermissionsIds.map((key)=> {
            return {
                ...allPermissions[key],
                checked: key in teamPermissions
            }
        })
        // filter settings by searchValue
        .filter((item) => {
            return item.name.toLocaleLowerCase().includes(searchValue.toLowerCase().trim()) ||
                item.scope.toLocaleLowerCase().includes(searchValue.toLowerCase().trim())
            
        });

    const handleChangePermission = async (e, item, state) => {
        dispatch(setUserPermission({id: item.id, checked: state}));
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Enter permission name to search...</span>
            </label>
            <Search searchParams={{
                key:"PermissionsForm", 
                value: searchValue, 
                placeholder: "module:scope"}} 
            />
            <div className="grid grid-cols-2 gap-4">
                {labels.map((item) => (
                    <PermissionBox
                        key={item.id}
                        name={item.scope}
                        display_name={item.name + " - " + item.scope}
                        initialChecked={item.checked}
                        onBoxChange={ (e, state) => handleChangePermission(e, item, state) }
                    />
                ))}
            </div>
        </div>
    );
};

export default PermissionsForm;
