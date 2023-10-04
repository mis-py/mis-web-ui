import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";

import PermissionBox from "modules/core/components/PermissionBoxComponent";
import Search from "components/common/SearchComponent";

// import { setUserPermission } from "redux/slices/userSlice";
import { useSelector } from "react-redux";

const RestrictedObjectsForm = ({groupObjectsData, allObjectsData}) => {
    const dispatch = useDispatch();

    const { 
        data: {entities: getObjects = {}, allIds: getObjectsAllIds = []} = {}, isLoading: loadingObjects 
    } = groupObjectsData;

    const { 
        data: {entities: getallObjects = {}, allIds: getAllObjectsAllIds = []} = {}, isLoading: loadingAllObjects
    } = allObjectsData;

    const searchValue = useSelector((state) => "RestrictedForm" in state.search.searchData ? state.search.searchData["RestrictedForm"] : "");
    
    let labels = getAllObjectsAllIds.map((key)=> {
            return {
                ...getallObjects[key],
                checked: key in getObjects
            }
        })
        // filter settings by searchValue
        .filter((item) => {
            return item.object_id.toLocaleLowerCase().includes(searchValue.toLowerCase().trim())
        });

    const handleChangePermission = async (e, item, state) => {
        // dispatch(setUserPermission({id: item.id, checked: state}));
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Enter object name to search...</span>
            </label>
            <Search searchParams={{
                key:"RestrictedForm", 
                value: searchValue, 
                placeholder: "Object name"}} 
            />
            <div className="grid grid-cols-2 gap-4">
                {labels.map((item) => (
                    <PermissionBox
                        key={item.id}
                        name={item.object_id}
                        display_name={item.object_id}
                        initialChecked={item.checked}
                        onBoxChange={ (e, state) => handleChangePermission(e, item, state) }
                    />
                ))}
            </div>
        </div>
    );
};

export default RestrictedObjectsForm;
