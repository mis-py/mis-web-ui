import { React, useEffect, useState, useMemo } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useSelector, useDispatch } from 'react-redux';
import Input from "components/common/Input";
import { FiX } from "react-icons/fi";
import 'react-js-cron/dist/styles.css';
import { setTrigger, setExtraParams } from 'redux/slices/taskSlice';
import { useSearchParams } from "react-router-dom";
import { useGetTasksQuery, selectFirstTaskSelector } from 'redux/api/tasksApi';
import JobFormTrigger from 'modules/core/components/JobFormTriggerComponent';
import JobFormExtraParams from 'modules/core/components/JobFormExtraParamsComponent';

const JobForm = ({onChange}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const firstTaskResult = useMemo(selectFirstTaskSelector, []);
    const [name, setName] = useState([]);
    
    const task_id = searchParams.get('task_id') || null;
    const { task } = useGetTasksQuery({task_id}, {
        skip: task_id == null,
        selectFromResult: (result) =>({
            ...result,
            task: firstTaskResult(result)
        })
    });

    const handleInputChange = (value) => {
        setName(value);
        onChange('name', value);
    };

    return (<>
        <Input label="Task name" type="text" placeholder={task?.name} value={name} onInputChange={(e) => handleInputChange(e.target.value)}/>
        <JobFormTrigger onChange={onChange} />
        <JobFormExtraParams onChange={onChange} />
    </>);
}

export default JobForm;