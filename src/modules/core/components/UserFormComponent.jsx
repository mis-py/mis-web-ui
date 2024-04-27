import { React } from "react";

import { useGetUserQuery } from "redux/api/usersApi";

import Input from "components/common/Input";
import TeamSelector from "components/common/TeamSelector";


const UserForm = ({ user_id=null, onChange }) => {
    const { 
        data = {},
        isLoading,
    } = useGetUserQuery({ user_id }, {
        skip: user_id == null,
    });

    return (
        !isLoading ? (
            <>
                <Input
                    label="ID"
                    type="text"
                    id="id"
                    placeholder="ID"
                    value={data?.id ?? ""}
                    readOnly
                />
                <Input
                    label="Username"
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    value={data?.username ?? ""}
                    onInputChange={(e) => onChange('username', e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    id="new-password"
                    placeholder="Enter a new password"
                    value={data?.password ?? ""}
                    onInputChange={(e) => onChange('password', e.target.value)}
                />
                <TeamSelector
                    team={data?.team ?? null}
                    onTeamChange={(choice) => onChange('team', choice ?? null)}
                />
                <Input
                    label="Job position"
                    type="text"
                    id="job-position"
                    placeholder="Enter job position"
                    value={data?.position ?? ""}
                    onInputChange={(e) => onChange('position', e.target.value)}
                />
                {/* TODO replace it on checkbox or switch */}
                <Input
                    label="Active"
                    type="text"
                    id="active"
                    placeholder="Enter job position"
                    value={data?.disabled==false}
                    readOnly
                />
            </>
        ) : (
            <div>Loading...</div>
        )
    );
}

export default UserForm;