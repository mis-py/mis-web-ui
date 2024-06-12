import React from 'react';
import PageHeader from "../../components/common/PageHeader";

import { ReplacementGroupItem } from './components/ReplacementGroupItem';
import { 
    useGetReplacementGroupsQuery, 
} from 'redux/api/modules/binom_companion';

const ControlPanel = () => {
    const { 
        data, 
        error, 
        isSuccess, 
        isError, 
        isFetching, 
        isLoading 
    } = useGetReplacementGroupsQuery();



    const items = data?.map((item, index) => {
        return <ReplacementGroupItem key={index} item={item} />
    });

    return (
        <>
            <div className="flex flex-col pl-4 pr-4 md:p-0">
                <PageHeader pageHeader={["Control panel"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-y-auto max-h-screen p-2">
                {items}
            </div>
        </>
    )
}

export default ControlPanel;