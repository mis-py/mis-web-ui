import React from 'react';
import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import {
    useGetJobByIdQuery,
    useGetJobLogsQuery,
} from "redux/index";
import LogItem from "../../components/logs/LogItem";
import SpinnerLoader from "../../components/common/SpinnerLoader";


const JobsLogs = () => {
    const { id } = useParams();
    const { data: jobData } = useGetJobByIdQuery(id);
    const { data: jobLogs, refetch: refetchLogs, isFetching, isLoading, isUninitialized } = useGetJobLogsQuery({ id });

    return (
        <div className="py-6 min-h-screen h-full flex flex-col justify-between">
            <div className="flex flex-col">
                <PageHeader
                    header={`${jobData === undefined ? "Job" : jobData.id} logs`}
                />

                <button onClick={() => {refetchLogs()}} className="mb-2 block">Reload</button>

                {isFetching || isLoading || isUninitialized
                    ? <SpinnerLoader />
                    : null
                }

                {jobLogs !== undefined && jobLogs.split("\n").reverse().map(item => {
                    if (item.trim().length === 0) {
                        return null;
                    }

                    try {
                        const data = JSON.parse(item);

                        return <LogItem
                            key={`log-item-${data.record.line}-${data.record.level.name}-${data.record.elapsed.seconds}-${data.record.message.replace(" ", "-")}`}
                            logData={data}
                        />;
                    } catch(e) {
                        const rand = Math.random();
                        return (<p className="mb-2" key={`log-item-text-${rand}`}>{item}</p>);
                    }
                })}
            </div>
        </div>
    );
};

export default JobsLogs;
