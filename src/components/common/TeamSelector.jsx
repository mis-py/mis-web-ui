import React from 'react';
import Select from "react-select";
import {
    useGetTeamsQuery
} from "redux/index";
import customStyles from "config/selectStyles";

const TeamSelector = ({placeholder, team=null, onChange}) => {
    const { data: teamsList = [] } = useGetTeamsQuery();

    const options = teamsList?.map((item) => {
        return <option key={item.id}>{item.name}</option>
    });
    
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Team</span>
            </label>
            <select value={team.label} onChange={onChange} className="select select-sm select-sm-mis-1 select-bordered w-full">
                {options}
            </select>
        </div>
    );
};

export default TeamSelector;
