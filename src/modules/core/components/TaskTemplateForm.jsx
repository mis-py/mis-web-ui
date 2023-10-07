import { React, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useSelector, useDispatch } from 'react-redux';
import Input from "components/common/Input";
import { FiX } from "react-icons/fi";
import 'react-js-cron/dist/styles.css';
import { setTrigger, setExtraParams } from 'redux/slices/taskSlice';

const TaskTemplateForm = () => {
    const [extraValues, setExtraValues] = useState([]);

    const [cronValues, setCronValues] = useState(['* * * * *']);
    const [intervalValue, setIntervalValue] = useState();

    const [useInterval, setUseInterval] = useState(false);

    const dispatch = useDispatch();

    const taskDataParamsDefault = useSelector((state) => state.task.extra_params_default);
    const taskTriggerDefault = useSelector((state) => state.task.trigger_default);

    useEffect(() => {
        if (taskDataParamsDefault !== undefined) {
            const values = [];
            Object.entries(taskDataParamsDefault).forEach(([key, type]) => {
                values.push({
                    key: key,
                    value: "",
                    type: type,
                });
            });
            setExtraValues(values);
        }
    }, [taskDataParamsDefault]);

    useEffect(()=>{
        if (taskTriggerDefault !== undefined) {
            let newTrigger = taskTriggerDefault.type == 'interval' ? {interval: taskTriggerDefault.value} : {cron: [...cronValues]};
            dispatch(setTrigger(newTrigger));
            setUseInterval(taskTriggerDefault.type == 'interval');
            setIntervalValue(taskTriggerDefault.type == 'interval' ? taskTriggerDefault.value : '');
        }
    }, [taskTriggerDefault])
    

    useEffect(()=>{
        let newTrigger = useInterval ? {interval: intervalValue} : {cron: [...cronValues]}
        dispatch(setTrigger(newTrigger));
    }, [cronValues, intervalValue, useInterval, dispatch]);

    useEffect(()=>{
        dispatch(setExtraParams(extraValues));
    }, [extraValues, dispatch]);

    const handleInputChange = (value, index) => {
        let newArray = [...extraValues];
        newArray[index] = {...newArray[index], value: value};
        setExtraValues(newArray);
    };

    const setCronItemValue = (value, index) => {
        let newArray = [...cronValues]
        newArray[index] = value;
        setCronValues(newArray);
    }

    const addCronValue = () => {
        setCronValues([...cronValues, "* * * * *"])
    }

    const removeCronValue = (index) => {
        confirmAlert({
            title: "Delete cron",
            message: "Are you sure you want to remove this cron?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        setCronValues(cronValues.filter((item, item_index) => item_index !== index));
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

    let crontabs = cronValues.map((cronItemValue, index) => 
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
        />)

    let interval = (<Input 
        label="Interval (seconds)"
        type="text"
        value={intervalValue}
        onInputChange={(e) => setIntervalValue(e.target.value)}
    />)

    return (<>
        <div className="form-control">
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

        { useInterval ? interval : crontabs}
        { useInterval ? '' : <div className="flex flex-row pt-4"><button className="btn btn-sm" onClick={() => addCronValue()}>Add cron</button></div>}

        
        { extraValues.length > 0 ? <p>Extra params</p> : '' }
        
        {
            extraValues.map((item, index) => 
                <Input
                    key={index}
                    label={`${item.key} (${item.type})`}
                    type={item.type === "int" ? "number" : "text"}
                    value={item.value}
                    onInputChange={(e) => handleInputChange(e.target.value, index)}
                />)
        }
    </>
    );
}

export default TaskTemplateForm;