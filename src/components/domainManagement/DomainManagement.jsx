import React from "react";
import TeamSelector from "../common/TeamSelector";

const DomainManagement = (props) => {
    const [team, setTeam] = React.useState(0);

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <TeamSelector
                    labelClass="flex-grow"
                    placeholder={team.label === undefined && "No team"}
                    team={team.label === null ? "" : team.label}
                    onChange={(choice) => { setTeam(choice) }}
                />

                <span>User select</span>
            </div>
        </div>
    );
};

export default DomainManagement;
