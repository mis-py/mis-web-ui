import React from "react";
import TeamSelector from "../common/TeamSelector";
import UserSelector from "../common/UserSelector";
import Input from "../Input";
import { useGetResellerBalanceQuery } from "redux/index";

const DomainManagement = (props) => {
    const defaultBalance = {
        balance: 0,
        currency: "USD",
    };

    const [team, setTeam] = React.useState({});
    const [user, setUser] = React.useState({});
    const [balance, setBalance] = React.useState(defaultBalance);

    const {data: getBalance, isLoading: isBalanceLoading } = useGetResellerBalanceQuery({
        team: team === undefined || team === null || team.value === undefined ? 0 : team.value
    }, {
        skip: team === undefined || team === null || team.value === undefined
    });

    React.useEffect(() => {
        if (team !== null) {
            setBalance(getBalance);
        }
    }, [isBalanceLoading, team]);

    const handleTeamChange = (choice) => {
        setTeam(choice);
        setUser(null);

        if (choice === null) {
            setBalance(defaultBalance);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <TeamSelector
                    labelClass="flex-grow"
                    placeholder={(team === null || team.label === undefined) && "No team"}
                    team={team === null || team.label === undefined ? null : team}
                    onChange={handleTeamChange}
                />

                <UserSelector
                    labelClass="md:w-[150px]"
                    teamId={team === null ? null : team.value}
                    user={user === null || user.label === undefined ? null : user}
                    placeholder={(user === null || user.label === undefined) && "No user"}
                    onChange={(choice) => setUser(choice)}
                />
            </div>

            <Input
                label="Balance"
                id="team_balance"
                placeholder={team === null || team.label === undefined ? "Team balance" : `${team.label} balance`}
                type="text"
                readOnly={true}
                value={balance === undefined ? "" : `${balance.balance} ${balance.currency}`}
            />
        </div>
    );
};

export default DomainManagement;
