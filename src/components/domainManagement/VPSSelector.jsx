import React from "react";

import { useGetVpsListQuery } from "redux/index";

import customStyles from "config/selectStyles";
import Select from "react-select";

const VPSSelector = (props) => {
    const { data: vpsLists = [] } = useGetVpsListQuery();
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        if (Array.isArray(vpsLists)) {
            setOptions(vpsLists.map(vps => {
                return {
                    value: vps.id,
                    label: vps.ip_address,
                };
            }));
        }
    }, [vpsLists]);

    return (
        <Select
            isClearable
            options={options}
            styles={customStyles}
            placeholder="Select ip address..."
            onChange={props.onChange}
        />
    );
};

export default VPSSelector;
