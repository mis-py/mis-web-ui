import React, { useState, useMemo } from "react";

import PermissionBox from "modules/core/components/PermissionBoxComponent";
import Search from "components/common/SearchComponent";

import { 
    filterPermissionByStringSelector,
    useGetPermissionsQuery,
    useGetGrantedPermissionsQuery,
 } from "redux/api/permissionsApi";


const PermissionsForm = ({team_id=null, user_id=null, onChange}) => {
    const [searchValue, setSearchValue] = useState("");

    const permissionSearchResult = useMemo(filterPermissionByStringSelector, []);

    const { allSearchFiltered = [] } = useGetPermissionsQuery(undefined,{
        selectFromResult: (result) => ({
            ...result,
            allSearchFiltered: permissionSearchResult(result, searchValue)
          })
    });
    
    const { data: getPermissions = [] } = useGetGrantedPermissionsQuery({team_id, user_id}, {skip: [team_id, user_id].every(item=>item==null)});
    
    const permissions = allSearchFiltered.map((permission)=> {
        let localPermission = getPermissions.find(granted => granted.permission.id === permission.id);
        return {
            ...permission,
            checked: localPermission !== undefined,
        }
    });

    const handleChangePermission = async (id, checked) => {
        onChange(id, checked);
    }

    return (
        <div className="form-control">
            <Search searchParams={{
                key:"PermissionsForm", 
                value: searchValue, 
                placeholder: "module_name or module:scope...",
                onSearch: setSearchValue
            }} 
            />
            <div className="grid grid-cols-2 gap-4">
                {permissions.map((item) => (
                    <PermissionBox
                        key={item.id}
                        name={item.scope}
                        display_name={item.app.name + " - " + item.scope}
                        initialChecked={item.checked}
                        onBoxChange={ (e, checked) => handleChangePermission(item.id, checked) }
                    />
                ))}
            </div>
        </div>
    );
};

export default PermissionsForm;
