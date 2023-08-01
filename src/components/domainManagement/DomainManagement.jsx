import React from "react";
import TeamSelector from "../common/TeamSelector";
import UserSelector from "../common/UserSelector";

const DomainManagement = (props) => {
    const [team, setTeam] = React.useState({});
    const [user, setUser] = React.useState({});

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <TeamSelector
                    labelClass="flex-grow"
                    placeholder={(team === null || team.label === undefined) && "No team"}
                    team={team === null || team.label === undefined ? null : team}
                    onChange={(choice) => { setTeam(choice); setUser(null) }}
                />

                <UserSelector
                    labelClass="md:w-[150px]"
                    teamId={team === null ? null : team.value}
                    user={user === null || user.label === undefined ? null : user}
                    placeholder={(user === null || user.label === undefined) && "No user"}
                    onChange={(choice) => setUser(choice)}
                />
            </div>
        </div>
    );
};

export default DomainManagement;
