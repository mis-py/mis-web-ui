import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import { useGetTaskByIdQuery } from "redux/api/tasksApi";
import { useTasksJobsAddMutation } from "redux/api/jobsApi";

import SpinnerLoader from "../../components/common/SpinnerLoader";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css'

const AddJobs = () => {
    const { id } = useParams();
    const { data: taskData, isFetching, isLoading, isUninitialized } = useGetTaskByIdQuery(id);
    const [ addJob ] = useTasksJobsAddMutation();
    const [cronValue, setCronValue] = React.useState("");
    const [extraValues, setExtraValues] = React.useState({});
    const [intervalValue, setIntervalValue] = React.useState()

    const navigate = useNavigate();

    React.useEffect(() => {
        if (taskData !== undefined && taskData.extra_typed !== undefined && taskData.extra_typed !== null) {
            const values = {};
            Object.entries(taskData.extra_typed).forEach(([key, type]) => {
                values[key] = {
                    value: "",
                    type,
                };
            });
            setExtraValues(values);
        }
    }, [taskData]);

    const handleSave = async (e) => {
        e.preventDefault();
    
        const extra = {};
        Object.entries(extraValues).forEach(([key, val]) => {
            extra[key] = val.value;
        });
    
        if (cronValue.length < 9) {
            toast.error("Please enter valid value into input");
            return;
        }
        
        await addJob({
            id,
            extra,
            cronString: cronValue,
            intervalInt: intervalValue,
        }).then(res => {
            if (res.error === undefined) {
                toast.success(`Job added successfully for ${id}`);
            } else {
                toast.error(res.error.data.detail);
            }
            if (res.error === undefined || res.error.status === 409) {
                navigate(`/tasks/jobs/${id}`);
            }
        });
    };
    

    const handleInputChange = (e) => {
        const values = JSON.parse(JSON.stringify(extraValues));
        values[e.target.getAttribute("name")].value = e.target.value;
        setExtraValues(values);
    };


    return (
        <div className="py-6 min-h-screen h-full flex flex-col justify-between">
            <div className="flex flex-col">
                <PageHeader
                    header={`Add ${taskData === undefined ? "" : taskData.id} job`}
                />

            {isFetching || isLoading || isUninitialized
                ? <SpinnerLoader />
                : null
            }
                    
                           
                  <form onSubmit={handleSave}>
                        {Object.entries(extraValues).map(([key, val]) => (
                            <Input
                                key={key}
                                name={key}
                                id={key}
                                label={`${key} (${val.type})`}
                                type={val.type === "int" ? "number" : "text"}
                                value={val.value}
                                changeValue={handleInputChange}
                            />
                        ))}
                        <div className="text-gray text-xs pb-3 flex flex-col">
                            <input
                                className="!border-primary rounded"
                                type="number"
                                placeholder="interval"
                                maxLength={5}
                                value={intervalValue}
                                onChange={(e) => {setIntervalValue(e.target.value)}}
                            />
                        </div>
                        <div className="flex flex-col pb-3 border-b border-backGround">
                        <div className="flex flex-col gap-4">
                        <div className="text-gray w-full py-2 flex flex-wrap">
                            <label className="pb-3 w-full text-xs">Choose an interval:</label>
                            <Cron value={cronValue} setValue={setCronValue} />
                        </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-gray text-xs pb-3 flex flex-col">
                                <input
                                className="!border-primary rounded"
                                type="text"
                                placeholder="* * * * *"
                                maxLength={25}
                                value={cronValue}
                                onChange={(e) => {setCronValue(e.target.value)}}
                                />
                            </div>
                        </div>
                        </div>
                        
                        <button className="btn btn-primary">Add job</button>
                    </form>                
            </div>
        </div>
    );
};

export default AddJobs;
