import React from "react";
import TeamSelector from "../common/TeamSelector";
import UserSelector from "../common/UserSelector";
import Input from "../Input";
import DomainSearch from "./DomainSearch";
import { useGetResellerBalanceQuery } from "redux/index";

const DomainManagement = (props) => {
    const defaultBalance = {
        balance: 0,
        currency: "USD",
    };

    const [team, setTeam] = React.useState({});
    const [user, setUser] = React.useState({});
    const [balance, setBalance] = React.useState(defaultBalance);

    const [domainSearchValue, setDomainSearchValue] = React.useState("");

    const ressellerBalanceCondition = team === undefined || team === null || team.value === undefined;
    const {data: getBalance } = useGetResellerBalanceQuery({
        team: ressellerBalanceCondition ? 0 : team.value
    }, {
        skip: ressellerBalanceCondition
    });

    const [selectedDomains, setSelectedDomains] = React.useState([]);

    React.useEffect(() => {
        if (team !== null) {
            setBalance(getBalance);
        }
    }, [getBalance, team]);

    const handleTeamChange = (choice) => {
        setTeam(choice);
        setUser(null);

        if (choice === null) {
            setBalance(defaultBalance);
        }
    };

    return (
        <div>
            <div className={selectedDomains.length ? "hidden" : null}>
                <div className="flex flex-wrap items-center gap-3">
                    <TeamSelector
                        labelClass="flex-grow"
                        placeholder={(team === null || team.label === undefined) && "No team"}
                        team={team === null || team.label === undefined ? null : team}
                        onChange={handleTeamChange}
                    />

                    <UserSelector
                        labelClass="md:w-[200px]"
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

                <DomainSearch
                    team_id={team === null || team.value === undefined ? null : team.value}
                    domainSearchValue={domainSearchValue}
                    setDomainSearchValue={
                        (e) => {
                            if (setDomainSearchValue !== undefined) {
                                setDomainSearchValue(e.target.value)
                            }
                        }
                    }
                    onSetupDomainsCallback={(params) => {
                        setSelectedDomains(params.selectedDomains);
                    }}
                />
            </div>

            {selectedDomains.length ? (
                <div>
                    <p>1111</p>
                </div>
            ) : null}
        </div>
    );
};

export default DomainManagement;
