import React from "react";
import {
    useGetBinomDomainsQuery,
    useGetGeosListQuery,
    useBinomGeoDomainChangeMutation
} from "redux/index";
import SpinnerLoader from "../common/SpinnerLoader";
import ListItemWrapper from "../common/ListItemWrapper";
import Input from "../common/Input";
import { toast } from "react-toastify";

const DomainDashboard = () => {
    const { data: binomDomains } = useGetBinomDomainsQuery();
    const { data: binomGeos } = useGetGeosListQuery();

    const [changeGeoMutation] = useBinomGeoDomainChangeMutation();

    const [domainsList, setDomainsList] = React.useState([]);
    const [geosList, setGeosList] = React.useState([]);

    React.useEffect(() => {
        if (binomGeos !== undefined) {
            setGeosList(binomGeos);
        } else {
            setGeosList([]);
        }
    }, [binomGeos]);

    React.useEffect(() => {
        if (binomDomains !== undefined) {
            setDomainsList(binomDomains);
        } else {
            setDomainsList([]);
        }
    }, [binomDomains]);

    const handleGeoChange = (e) => {
        if (e.target.value.length) {
            const selectedGeoText = e.target.options[e.target.selectedIndex].text;

            if (window.confirm(`Do you want to change domain for ${selectedGeoText} geo?`)) {
                changeGeoMutation(e.target.value).then(res => {
                    if (res.error === undefined) {
                        toast.success("Domain changed");
                    } else {
                        toast.error(res.error.data.detail);
                    }
                });
            } else {
                e.preventDefault();
            }
        }
    };

    return (
        <div>
            {geosList.length === 0
                ? null
                : (
                    <div className="mb-4">
                        Change geo
                        <select onChange={(e) => { handleGeoChange(e) }} className="text-black block mt-1 min-w-[110px]">
                            <option value="">---</option>
                            {geosList.map(geo => (
                                <option
                                    key={`change_geo_${geo.id}`}
                                    value={geo.id}>{geo.name}</option>
                            ))}
                        </select>
                    </div>
                )
            }

            {domainsList.length === 0 ? (
                <SpinnerLoader />
            ) :
            (<div className="flex flex-col gap-4">
            {domainsList.map(domain => (
                <ListItemWrapper
                    key={`domains-list-item-${domain.id}`}
                >
                    <div className="flex gap-4">
                        <Input
                            id={`domain_${domain.id}`}
                            label="Domain"
                            readOnly="readonly"
                            value={domain.domain}
                            type="text"
                            className="flex-grow"
                            inputClassName="bg-[#666]"
                        />

                        <Input
                            id={`ip_${domain.id}`}
                            label="IP"
                            readOnly="readonly"
                            value={domain.ip}
                            type="text"
                            className="flex-grow"
                            inputClassName="bg-[#666]"
                        />
                    </div>
                    <div className="flex gap-4">
                        <Input
                            id={`status_${domain.id}`}
                            label="Status"
                            readOnly="readonly"
                            value={domain.status}
                            type="text"
                            className="flex-grow"
                            inputClassName="bg-[#666]"
                        />
                    </div>

                    {domain.current_geo === null ? null : (<div className="flex gap-4">
                        <div className="flex-grow w-[50%]">
                            Current GEO
                            <span className="block body-2 text-gray">GEO: {domain.current_geo.name}</span>
                        </div>

                        <div className="flex-grow w-[50%]">
                            Check results
                            <span className="flex gap-1.5">
                                {Object.entries(domain.current_geo.task_check_statuses).map(([key, val]) => (
                                    <span
                                        key={`task_check_statuses_${domain.id}_${key}`}
                                        title={key}
                                        className={"cursor-pointer w-4 h-4 rounded-full " + (val.status ? "bg-successEasy" : "bg-dangerEasy")}
                                    ></span>
                                ))}
                            </span>
                        </div>
                    </div>)}
                </ListItemWrapper>
            ))}
        </div>)}
        </div>
    );
};

export default DomainDashboard;
