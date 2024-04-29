import { React, useEffect, useState, useMemo } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useSelector, useDispatch } from 'react-redux';
import Input from "components/common/Input";
import { FiX } from "react-icons/fi";
import 'react-js-cron/dist/styles.css';
import { setTrigger, setExtraParams } from 'redux/slices/taskSlice';
import { useSearchParams } from "react-router-dom";
import { useGetTasksQuery, selectFirstTaskSelector } from 'redux/api/tasksApi';

const JobFormExtraParams = ({onChange}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const firstTaskResult = useMemo(selectFirstTaskSelector, []);

    const task_id = searchParams.get('task_id') || null;
    const { data, task } = useGetTasksQuery({task_id}, {
        skip: task_id == null,
        selectFromResult: (result) =>({
            ...result,
            task: firstTaskResult(result)
        })
    });

    const [extraValues, setExtraValues] = useState([]);

    // extra is an object sent
    // useEffect(() => {
    //     let values = [];
    //     Object.entries(task?.extra_typed ?? {}).forEach(([key, type]) => {
    //         values.push({
    //             key: key,
    //             value: "",
    //             type: type,
    //         });
    //     });
    //     setExtraValues(values);
    // }, [task]);

    const extra_params = Object.entries(task?.extra_typed ?? {}).map(([key, type]) => {
        return {
            key: key,
            value: "",
            type: type,
        };
    });

    // useEffect(()=>{
    //     dispatch(setExtraParams(extraValues));
    // }, [extraValues, dispatch]);

    const handleInputChange = (key, value) => {
        let params = {...extraValues, [key]: value}
        setExtraValues(params);
        onChange('extra', params);
    };

    return (
        <div className="form-control">
            <p>Extra params</p>
            {
                extra_params.map((item, index) => 
                    <Input
                        key={index}
                        label={`[${item.type}] ${item.key}`}
                        type={item.type === "int" ? "number" : "text"}
                        value={item.value}
                        onInputChange={(e) => handleInputChange(item.key, e.target.value)}
                    />)
            }
        </div>
    );
}

export default JobFormExtraParams;