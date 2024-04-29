import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useAddJobMutation } from "redux/index";
import { toast } from "react-toastify";
import 'react-js-cron/dist/styles.css';
import EditItem from "modules/core/components/EditItemComponent";
import JobFormTrigger from 'modules/core/components/JobFormTriggerComponent';
import JobFormExtraParams from 'modules/core/components/JobFormExtraParamsComponent';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";


const JobEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { id } = useParams();

    const editMode = id !== undefined;
    const task_id = searchParams.get('task_id') || null;

    const [job, setJob] = useState({});

    const [ addJob ] = useAddJobMutation();

    const handleSave = async () => {
        await addJob({
            task_id: task_id,
            extra: job.extra,
            trigger: job.trigger
        }).then(({data, error}) => {
            if (error) {
                toast.error(`Error during create job: ${error}`);

            } else {
                toast.success(`Job created successfully`);
                navigate(`/jobs`);
            }
        });
    };

    const onJobChange = async (field, value) => {
        setJob({...job, [field]: value});
    }

    const intemProps = {
        pageHeader: ["Administration", {name: "Tasks", path: "/tasks"}, (editMode ? "Edit" : "New")],
        saveButtonEvent: handleSave,
        formName: "Job",
        sections: [
            {
                name: "Triggers",
                element: <JobFormTrigger onChange={onJobChange} />
            },
            {
                name: "Params",
                element: <JobFormExtraParams onChange={onJobChange} />
            }
        ]
    }

    return (<EditItem {...intemProps}/>);
};

export default JobEdit;
