import React,  { useState } from 'react';
import { 
    useGetAvailableProxyDomainsForGroupsQuery,
    useChangeProxyDomainMutation
} from 'redux/api/modules/binom_companion';
import { toast } from 'react-toastify';
import { ReplacementHistoryTable } from './ReplacementHistoryTable';
import Modal from 'components/common/Modal';

import baker from 'assets/img/baker.png';

export const ReplacementGroupItem = ({item}) => {
    const [isHistoryOpen, setHistoryIsOpen] = useState(false);
    const [isChangeOpen, setChangeIsOpen] = useState(false);

    const latestChange = item.replacement_history.length ? item.replacement_history[0] : null;
    const latestDate = new Date(latestChange?.date_changed ?? "") ?? "unknown";

    const minutesPassed = Math.round(Math.abs((new Date().getTime() - latestDate.getTime()) / 1000) / 60);

    const { 
        data, 
        error, 
        isSuccess, 
        isError, 
        isFetching, 
        isLoading 
    } = useGetAvailableProxyDomainsForGroupsQuery({
        replacement_group_ids: [item.id]
    });

    const [changeDomain] = useChangeProxyDomainMutation();

    return (
        <>
            <div className="card bg-base-100 shadow-mis-1 rounded-lg p-4">
                <div className="card-body p-0">
                    <h2 className="card-title">
                        <span className="badge badge-outline">{item.id}</span> {item.name}
                    </h2>
                    <table className="table table-xs">
                        <tbody>
                            <tr>
                                <td>Tracker</td>
                                <td>{item.tracker_instance.name}</td>
                            </tr>
                            <tr title={latestChange ? latestDate.toString() : ""}>
                                <td>Latest change</td>
                                <td>{latestChange ? `${minutesPassed}m ago` : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Latest domain</td>
                                <td>{latestChange ? latestChange.to_domain.name : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Changed by</td>
                                <td>{latestChange ? latestChange.replaced_by.username : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Reason</td>
                                <td>{latestChange ? latestChange.reason : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Domains available</td>
                                <td>{data?.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="card-actions">
                        <button onClick={() => setChangeIsOpen(true)} className={"btn btn-outline btn-sm"}>Change Domain</button>
                        <button onClick={() => setHistoryIsOpen(true)} className={"btn btn-outline btn-sm"}>History</button>
                    </div>
                </div>
            </div>
            <Modal
                open={isChangeOpen}
                onClose={() => setChangeIsOpen(false)}
                id={`change_modal_${item.id}`} 
                header={<><span className="badge badge-outline">{item.id}</span> {item.name} change domain</>} 
                body={
                    <>
                        <p className="py-4">Are you sure want to change domain for group: <b>{item.name}</b>?</p>
                        <img src={baker} alt="baker" />
                    </>
                } 
                buttons={[
                    {
                        label: "Yes",
                        onClick: async () => {
                            await changeDomain([item.id]).then(({data, error}) => {
                                if (error){
                                    toast.error(error);
                                } else {
                                    toast.success("Domain changed!");
                                }
                            });
                        }
                    }
                ]}
                container_styles=''
            />
            <Modal
                open={isHistoryOpen}
                onClose={() => setHistoryIsOpen(false)}
                id={`history_modal_${item.id}`} 
                header={<><span className="badge badge-outline">{item.id}</span> {item.name} change history</>}
                body={<ReplacementHistoryTable items={item.replacement_history}/>}
                buttons={[]}
            />
        </>
    )
}