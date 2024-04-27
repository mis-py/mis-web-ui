import React from "react";
import Input from "components/common/Input";
import UserSelector from "components/common/UserSelector";
import { useGetTeamQuery } from "redux/index";

const TeamForm = ({team_id=null, onChange}) => {
    const { 
        data = {}, 
        isLoading 
      } = useGetTeamQuery({ team_id }, {
        skip: team_id == null,
      });

    return (
        !isLoading ? (
            <>
                <Input
                    label="Team name"
                    type="text"
                    id="name"
                    autoComplete="off"
                    placeholder="Enter team name"
                    value={data?.name}
                    onInputChange={(e) => onChange('name',e.target.value)}
                />
                {/* TODO can not set 0 team users */}
                <UserSelector 
                    users={data?.users}
                    onUsersChange={(value) => onChange('users_ids', value)}
                />
            </>
        ) : (
            <div>Loading...</div>
        )
    );
}

export default TeamForm;