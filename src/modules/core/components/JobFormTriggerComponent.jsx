import { React, useEffect, useState, useMemo } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useSelector, useDispatch } from 'react-redux';
import Input from "components/common/Input";
import { FiX } from "react-icons/fi";
import 'react-js-cron/dist/styles.css';
import { setTrigger, setExtraParams } from 'redux/slices/taskSlice';
import { useSearchParams } from "react-router-dom";
import { useGetTasksQuery, selectFirstTaskSelector } from 'redux/api/tasksApi';

const JobFormTrigger = ({onChange}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const firstTaskResult = useMemo(selectFirstTaskSelector, []);

    const task_id = searchParams.get('task_id') || null;
    const { task } = useGetTasksQuery({task_id}, {
        skip: task_id == null,
        selectFromResult: (result) =>({
            ...result,
            task: firstTaskResult(result)
        })
    });

    const [cronValues, setCronValues] = useState(['* * * * *']);
    const [intervalValue, setIntervalValue] = useState();
    const [useInterval, setUseInterval] = useState(false);

    useEffect(()=>{
        if (task.trigger){
            handleSetTriggerValue(task.trigger);
        }
    }, [task]);

    const handleSetTriggerValue = (value) => {
        if (parseInt(Number(value)) === value){
            setUseInterval(true);
            setIntervalValue(value);
        } else if (typeof value === "string"){
            setUseInterval(false);
            setCronValues([task.trigger]);
        } else if (typeof value === "object"){
            setUseInterval(false);
            setCronValues(value);
        }

        onChange('trigger', value);
    }


    const setCronItemValue = (value, index) => {
        let newArray = [...cronValues]
        newArray[index] = value;
        handleSetTriggerValue(newArray);
    }

    const addCronValue = () => {
        handleSetTriggerValue([...cronValues, "* * * * *"])
    }

    const removeCronValue = (index) => {
        confirmAlert({
            title: "Delete cron",
            message: "Are you sure you want to remove this cron?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        handleSetTriggerValue(cronValues.filter((item, item_index) => item_index !== index));
                    },
                },
                {
                    label: "No",
                },
            ],
            overlayClassName: "bg-blackSecond/70",
        })
    }

    const onIntervalToggle = () => {
        setUseInterval(!useInterval);
    }

    const handleIntervalChange = (value) => {
        setIntervalValue(value);
        onChange('trigger', value);
    }

    let crontabsForm = (<>
        {cronValues.map((cronItemValue, index) => 
        <Input
            key={index}
            label={`Cron ${index+1}`}
            type="text"
            placeholder="* * * * *"
            value={cronItemValue}
            onInputChange={(e) => setCronItemValue(e.target.value, index)}
            default_value={"* * * * *"}
            setDefault={() => removeCronValue(index)}
            default_button_icon={<FiX />}
        />)}
        <div className="flex flex-row pt-4"><button className="btn btn-sm" onClick={() => addCronValue()}>Add cron</button></div>
    </>);

    let interval = (<Input 
        label="Interval (seconds)"
        type="number"
        value={intervalValue}
        onInputChange={(e) => handleIntervalChange(e.target.valueAsNumber)}
    />)

    return (<>
        <div className="form-control">
            <p>{task?.id}</p>
            <label className="label">
                <span className="label-text">Use Interval</span>
            </label>
            <input 
                type="checkbox" 
                className="toggle toggle-success" 
                checked={useInterval}
                onChange={onIntervalToggle} 
            />
        </div>

        { useInterval ? interval : crontabsForm}
    </>
    );
}

export default JobFormTrigger;