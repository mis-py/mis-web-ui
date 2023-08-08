import React from "react";
import TeamSelector from "../common/TeamSelector";
import UserSelector from "../common/UserSelector";
import Input from "../Input";
import DomainSearch from "./DomainSearch";
import {
    useGetResellerBalanceQuery,
    useSetupAutoAdminDomainsMutation,
} from "redux/index";
import ListItemWrapper from "../common/ListItemWrapper";
import VPSSelector from "./VPSSelector";
import SpinnerLoader from "../common/SpinnerLoader";
import {toast} from "react-toastify";
import { initiateWebSocket } from "config/WebSocketConnection";

const DomainManagement = (props) => {
    const defaultBalance = {
        balance: 0,
        currency: "USD",
    };

    const [setupProgress, setSetupProgress] = React.useState({});

    const webSocket = initiateWebSocket();

    if (webSocket !== undefined) {
        webSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.data === undefined
                || data.data.message === undefined
                || data.data.message.body === undefined
            ) {
                return;
            }

            if (data.data.message.body.domain !== undefined) {
                let domains = JSON.parse(JSON.stringify(setupProgress));
                domains[data.data.message.body.domain] = {
                    message: data.data.message.body.status
                        + " " + data.data.message.body.state
                        + " " + data.data.message.body.detail,
                    state: `${data.data.message.body.status}_${data.data.message.body.state}`,
                };
                setSetupProgress(domains);

                if (Object.values(domains).every(domain => domain.state === "done_finish")) {
                    toast.success("All domains have been successfully set up!");
                    setSelectedDomains([]);
                }
            }
        };
    }

    const [team, setTeam] = React.useState({});
    const [user, setUser] = React.useState({});
    const [balance, setBalance] = React.useState(defaultBalance);

    const [maxDomainPrice, setMaxDomainPrice] = React.useState(10);
    const [domainSearchValue, setDomainSearchValue] = React.useState("");

    const ressellerBalanceCondition = team === undefined || team === null || team.value === undefined;
    const {data: getBalance } = useGetResellerBalanceQuery({
        team: ressellerBalanceCondition ? 0 : team.value
    }, {
        skip: ressellerBalanceCondition
    });
    const [setupDomainsMutation, setupDomainsMutationData] = useSetupAutoAdminDomainsMutation();

    const [selectedDomains, setSelectedDomains] = React.useState([]);
    const [domainVps, setDomainVps] = React.useState({});

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

    const handleVpsSelector = (domain, choice) => {
        let _vps = JSON.parse(JSON.stringify(domainVps));

        if (choice === undefined || choice === null) {
            delete _vps[domain];
        } else {
            _vps[domain] = choice.value;
        }

        setDomainVps(_vps);
    };

    const handleSetupDomainsButton = async () => {
        const domains = [];
        Object.entries(domainVps).forEach(([domain, vps]) => {
            domains.push({
                name: domain,
                vps_id: vps,
            });
        });

        await setupDomainsMutation({
            team_id: team.value,
            user_id: user.value,
            max_price: maxDomainPrice,
            domains,
        }).then(res => {
            if (res.error === undefined) {
                toast.success("Domains setup in progress");

                let _tmp = {};
                Object.entries(domainVps).forEach(([domain]) => {
                    _tmp[domain] = { state: 'in_progress' };
                });
                setSetupProgress(_tmp);

            } else if (res.error.data.detail !== undefined) {
                toast.error(res.error.data.detail);
            } else {
                toast.error(res.error.data.message);
            }
        });
    }

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
                        setMaxDomainPrice(params.maxDomainPrice);
                    }}
                />
            </div>

            {selectedDomains.length ? (
                <div>
                    {selectedDomains.map(domain => (
                        <ListItemWrapper
                            key={domain}
                        >
                            <div>Domain: {domain}</div>
                            <div className="flex gap-3 items-center mt-2">
                                IP address:
                                <VPSSelector
                                    onChange={(choice) => {handleVpsSelector(domain, choice)}}
                                />

                                {setupProgress[domain] !== undefined && (
                                    setupProgress[domain].state === 'in_progress' ? "In progress..." : setupProgress[domain].message
                                )}
                            </div>
                        </ListItemWrapper>
                    ))}

                    {selectedDomains.length === Object.keys(domainVps).length
                        && setupDomainsMutationData.isLoading === false
                        && (
                        <button onClick={() => { handleSetupDomainsButton(); }} className="btn-primary mt-4">
                            Setup domains
                        </button>
                    )}

                    {setupDomainsMutationData.isLoading ? <SpinnerLoader /> : null}
                </div>
            ) : null}
        </div>
    );
};

export default DomainManagement;
