import React, { useMemo, useState } from "react";

import {
    useGetGlobalVariablesQuery,
    filterVariableByStringSelector,
    useGetLocalVariablesQuery,
} from "redux/index";

import InputDefault from "components/common/InputDefault";
import Search from "components/common/SearchComponent";

// Component loads data from item ID and on change pass id and value to onChange callback
// Component will work without any props set
const VariablesForm = ({module_id=null, team_id=null, user_id=null, onChange}) => {
    const [searchValue, setSearchValue] = useState("");

    const variableSearchResult = useMemo(filterVariableByStringSelector, []);

    const { allSearchFiltered } = useGetGlobalVariablesQuery({module_id},{
        selectFromResult: (result) => ({
          ...result,
          allSearchFiltered: variableSearchResult(result, searchValue)
        })
    });
    
    const { data: getVariables} = useGetLocalVariablesQuery({team_id, user_id});

    const variables = allSearchFiltered?.map((variable) => {
        let localVarialbe = getVariables?.find((item) => item.setting_id == variable.id);
        return {
            ...variable,
            value: localVarialbe?.value || undefined
        }
    });

    const isGlobalEdit = module_id != null;
    
    const handleChangeSetting = async (id, value) => {
        onChange(id, value);
    }

    return (
    <div className="form-control">
        {<Search searchParams={{
            key: "VariablesForm", 
            value: searchValue, 
            placeholder: "SETTING_NAME or module_name...",
            onSearch: setSearchValue
        }}
        />}
        {variables?.map((item) =>(
            <InputDefault
                label={`[${item.is_global ? 'G' : 'L'}] ${item.key}`}
                primaryLabel={item.key}
                secondLabel={""}
                key={item.id}
                className="relative"
                id={item.key}
                type="text"
                autoComplete="off"
                onInputChange={(value) => handleChangeSetting(item.id, value)}
                value={item.value}
                name={item.key}
                readOnly={item.is_global != isGlobalEdit}
                default_value={item.default_value}
                default_pressable={item.is_global != isGlobalEdit}
                placeholder={item.default_value}
            />
        ))}
    </div>
    );
};

export default VariablesForm;
