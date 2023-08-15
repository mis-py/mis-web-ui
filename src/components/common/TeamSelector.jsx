import React from 'react';
import Select from "react-select";
import {
    useGetTeamsQuery
} from "redux/index";
import customStyles from "config/selectStyles";

const TeamSelector = (props) => {
    const { data: teamsList = [] } = useGetTeamsQuery();

    const options = teamsList?.map((item) => {
        return {
            value: item.id,
            label: item.name,
        };
    });

    return (
        <label className={`flex flex-col gap-1 mb-4 ${props.labelClass === undefined ? "" : props.labelClass}`.trim()} htmlFor="team">
            Team
            <Select
                isClearable
                options={options}
                styles={customStyles}
                placeholder={props.placeholder === null ? "" : props.placeholder}
                value={props.team === null || props.team === undefined ? "" : props.team}
                onChange={props.onChange}
            />
        </label>
    );
};

export default TeamSelector;
