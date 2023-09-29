import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";

import PermissionBox from "modules/core/components/PermissionBoxComponent";
import Search from "components/common/SearchComponent";

import { setUserPermission } from "redux/slices/userSlice";
import { useSelector } from "react-redux";

const PermissionsForm = ({permissionsData, itemPermissions}) => {
    const dispatch = useDispatch();

    const { 
        data: {entities: getPermissions = {}, allIds: getPermissionsAllIds = []} = {}, isLoading: loadingPermissions 
    } = permissionsData;

    const { 
        data: {entities: getPermissionsItemId = {}, allIds: getPermissionsItemAllIds = []} = {}, isLoading: loadingPermissionsItemId
    } = itemPermissions;

    const searchValue = useSelector((state) => "PermissionsForm" in state.search.searchData ? state.search.searchData["PermissionsForm"] : "");
    
    let labels = getPermissionsAllIds.map((key)=> {
            return {
                ...getPermissions[key],
                checked: key in getPermissionsItemId
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

    return (<>
        <Search searchParams={{
            key:"PermissionsForm", 
            value: searchValue, 
            placeholder: "Enter permission name to search..."}} 
        />
        <div className="grid grid-cols-2 gap-4">
        {labels.map((item) => (
            <PermissionBox
                key={item.id}
                item={item}
                checked={item.checked}
                onChange={ (e, state) => handleChangePermission(e, item, state) }
            />
        ))}
        </div>
    </>);
};

export default PermissionsForm;
