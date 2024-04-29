import React, { useState, useMemo } from "react";
import ItemsList from "components/ItemsList";
import { useNavigate } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import { 
    useGetJobsQuery,
    filterJobsByStringSelector
} from 'redux/api/jobsApi';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import JobListItem from "./JobListItem";

const JobsList = () => {
    const [searchValue, setSearchValue] = useState("");

    const jobsSearchRresult = useMemo(filterJobsByStringSelector, []);

    const { searchFiltered } = useGetJobsQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            searchFiltered: jobsSearchRresult(result, searchValue)
          })
    });

    // let intlDate = new Intl.DateTimeFormat('ru-RU', { 
    //     year: "numeric",
    //     month: "numeric",
    //     day: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //     second: "numeric",
    //     hour12: false,
    // });

    let items = searchFiltered.map((item, index)=> {
        let itemProps = {
          ...item,
          badge: item.job_id,
          title: item.name,
          paragraphs:[
            //item.next_run_time ? ("Started running at: " + (intlDate.format(new Date(item.next_run_time)))) : '',
            `Status: ${item.status}`
          ]
        }
        return <JobListItem key={index} item={itemProps} />;
    });

    let itemsParams = {
        pageHeader: ["Administration", "Jobs"],
        searchParams: {
            key: "JobsList",
            value: searchValue,
            placeholder: "Job name...",
            showSearch: false,
            onSearch: setSearchValue
        },
        headerButtons: [
            {
                title: "Create job",
                route: '/tasks',
                icon: <FiPlus />
            }
        ],
        items: items
    }

    return <ItemsList {...itemsParams}/>;
}

export default JobsList;