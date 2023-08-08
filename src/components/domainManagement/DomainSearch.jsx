import React from "react";
import Input from "../Input";
import customStyles from "config/selectStyles";
import Select from "react-select";
import {
    useGetAutoAdminExtensionsQuery,
    useFindAutoAdminDomainsMutation
} from "redux/index";
import SpinnerLoader from "../common/SpinnerLoader";
import ListItemWrapper from "../common/ListItemWrapper";

const DomainSearch = (props) => {
    const { data: domainZones = [] } = useGetAutoAdminExtensionsQuery();
    const [domainZonesValues, setDomainZonesValues] = React.useState([]);
    const [selectedDomainZonesValues, setSelectedDomainZonesValues] = React.useState([]);
    const [maxDomainPrice, setMaxDomainPrice] = React.useState(10);

    const [findDomains, findDomainsReqData] = useFindAutoAdminDomainsMutation();
    const [domainsSearchResult, setDomainsSearchResult] = React.useState([]);
    const [selectedDomains, setSelectedDomains] = React.useState([]);

    React.useEffect(() => {
        let _tmp = [];
        domainZones.forEach(item => _tmp.push({ value: item, label: item }));
        setDomainZonesValues(_tmp);

    }, [domainZones]);

    const handleDomainZonesChange = (choice) => {
        let _tmp = [];
        choice.forEach(item => _tmp.push(item.value));
        setSelectedDomainZonesValues(_tmp);
    };

    React.useEffect(() => {
        const timer = setTimeout(async () => {
            if (props.domainSearchValue.trim().length === 0
                || maxDomainPrice < 1
                || selectedDomainZonesValues.length === 0
                || props.team_id === null
            ) {
                return;
            }

            setSelectedDomains([]);
            setDomainsSearchResult([]);
            await findDomains({
                team_id: props.team_id,
                q: props.domainSearchValue,
                zones: selectedDomainZonesValues,
                max_price: maxDomainPrice,
                quantity: 3,
            }).then(res => {
                setDomainsSearchResult(res.data);
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, [selectedDomainZonesValues, maxDomainPrice, props.domainSearchValue, props.team_id, findDomains]);

    const handleDomainCheckboxCheck = (checkbox) => {
        const isChecked = checkbox.checked;
        const domain = checkbox.value;

        if (isChecked) {
            setSelectedDomains(prevDomains => [...prevDomains, domain]);
        } else {
            setSelectedDomains(prevDomains => prevDomains.filter(prevDomain => prevDomain !== domain));
        }
    };

    const handleSetupButtonClick = () => {
        const type = typeof props.onSetupDomainsCallback;

        if (type === "function") {
            props.onSetupDomainsCallback({
                selectedDomains,
                domainsSearchResult,
                maxDomainPrice,
            });
        } else {
            console.error(`props.onSetupDomainsCallback should be a function, ${type} given`);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Input
                    id="domain_search"
                    type="text"
                    label="Domain search"
                    placeholder="Type here domain name..."
                    className="flex-grow"
                    value={props.domainSearchValue === undefined ? "test crypto cart" : props.domainSearchValue}
                    changeValue={props.setDomainSearchValue === undefined ? () => {} : props.setDomainSearchValue}
                />

                <Input
                    id="max_price"
                    type="number"
                    label="Max domain price"
                    placeholder="Type price here"
                    className="md:w-[150px]"
                    value={maxDomainPrice}
                    changeValue={(e) => { setMaxDomainPrice(e.target.value) }}
                />

                <label className={`flex flex-col gap-1 mb-4 md:w-[200px]`} htmlFor="team">
                    Domain zone
                    <Select
                        isClearable
                        isMulti
                        options={domainZonesValues}
                        styles={customStyles}
                        placeholder="Select zones..."
                        onChange={handleDomainZonesChange}
                    />
                </label>
            </div>

            {findDomainsReqData.isLoading
                ? <SpinnerLoader />
                : (domainsSearchResult !== undefined && domainsSearchResult.length ? <div className="flex flex-col gap-4">
                    {domainsSearchResult.map(domain => (
                        <ListItemWrapper
                            key={domain.domain}
                            className={domain.is_available === false ? "opacity-60" : ""}
                        >
                            <input value={domain.domain} type="checkbox" onChange={(e) => handleDomainCheckboxCheck(e.target)} />

                            {JSON.stringify(domain)}
                        </ListItemWrapper>
                    ))}
                </div> : null)
            }

            {selectedDomains !== undefined
                && selectedDomains.length
                ? <button onClick={handleSetupButtonClick} className="btn-primary mt-4">
                    Setup domains
                </button> : null}
        </div>
    );
};

export default DomainSearch;
