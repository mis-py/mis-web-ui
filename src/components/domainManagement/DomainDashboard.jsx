import React from "react";
import {
    useGetBinomDomainsQuery
} from "redux/index";
import SpinnerLoader from "../common/SpinnerLoader";
import ListItemWrapper from "../common/ListItemWrapper";
import Input from "../Input";

const DomainDashboard = () => {
    const { data: binomDomains } = useGetBinomDomainsQuery();
    const [domainsList, setDomainsList] = React.useState([]);

    React.useEffect(() => {
        if (binomDomains !== undefined) {
            setDomainsList(binomDomains);
        } else {
            setDomainsList([]);
        }
    }, [binomDomains]);

    return (
        domainsList.length === 0 ? (
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
                                id={`registrator_${domain.id}`}
                                label="Registrator"
                                readOnly="readonly"
                                value={domain.registrator}
                                type="text"
                                className="flex-grow"
                                inputClassName="bg-[#666]"
                            />

                            <Input
                                id={`vds_service_${domain.id}`}
                                label="VDS service"
                                readOnly="readonly"
                                value={domain.vds_service}
                                type="text"
                                className="flex-grow"
                                inputClassName="bg-[#666]"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                id={`additional_info_${domain.id}`}
                                label="Additional info"
                                readOnly="readonly"
                                value={domain.additional_info}
                                type="text"
                                className="flex-grow"
                                inputClassName="bg-[#666]"
                            />

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

                        <div className="flex gap-4">
                            <div className="flex-grow w-[50%] mb-4">Allowed geo
                                {domain.allowed_geo.length === 0
                                    ? (<span className="block body-2 text-gray">No allowed geos</span>)
                                    : domain.allowed_geo.map(allowed_geo => (
                                    <span
                                        key={`allowed_geo_${domain.id}_${allowed_geo.id}`}
                                        className="block body-2 text-gray">{allowed_geo.name}</span>
                                ))}
                            </div>
                            <div className="flex-grow w-[50%] mb-4">Banned geo
                                {domain.banned_geo.length === 0
                                    ? (<span className="block body-2 text-gray">No bannned geos</span>)
                                    : domain.banned_geo.map(banned_geo => (
                                    <span
                                        key={`allowed_geo_${domain.id}_${banned_geo.id}`}
                                        className="block body-2 text-gray">{banned_geo.name}</span>
                                ))}
                            </div>
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
            </div>)
    );
};

export default DomainDashboard;
