import React from 'react';
import Select from "react-select";
import {
    useGetUsersQuery
} from "redux/index";
import customStyles from "config/selectStyles";

const UserSelector = (props) => {
    const { data: usersList = [] } = useGetUsersQuery({
        team_id: props.teamId
    });

    const [options, setOptions] = React.useState([]);
    React.useEffect(() => {
        setOptions(usersList?.map((item) => {
            return {
                value: item.id,
                label: item.username,
            };
        }));
    }, [usersList])


    return (
        <label className={`flex flex-col gap-1 mb-4 ${props.labelClass === undefined ? "" : props.labelClass}`.trim()} htmlFor="user">
            User
            <Select
                isClearable
                options={options}
                styles={customStyles}
                placeholder={props.placeholder === null ? "" : props.placeholder}
                value={props.user === null ? "" : props.user}
                onChange={props.onChange}
            />
        </label>
    );
};

export default UserSelector;
