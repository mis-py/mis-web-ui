import React from 'react';
import Select from "react-select";
import {
    useGetTeamsQuery
} from "redux/index";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        fontWeight: state.isSelected ? "bold" : "normal",
        color: state.isSelected ? "#ffffff" : "#757575",
        backgroundColor: state.isSelected ? "#1A69DF" : "#1d1d1d",
        borderRadius: "4px",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#757575",
        backgroundColor: "#1d1d1d",
    }),
    control: (base, state) => ({
        ...base,
        background: "#1d1d1d",
        color: "#757575",
        borderColor: "none",
        borderWidth: "0",
        boxShadow: state.isFocused ? null : null,
    }),
    menu: (provided) => ({
        ...provided,
        padding: 10,
        backgroundColor: "#1d1d1d",
    }),
    input: (provided) => ({
        ...provided,
        color: "#757575",
    }),
};

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
                value={props.team === null ? "" : props.team}
                onChange={props.onChange}
            />
        </label>
    );
};

export default TeamSelector;
