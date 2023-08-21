import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import {
    useGetTaskByIdQuery,
    useTasksJobsAddMutation,
} from "redux/index";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import Input from "../../components/Input";
import { toast } from "react-toastify";

const AddJobs = () => {
    const { id } = useParams();
    const { data: taskData, isFetching, isLoading, isUninitialized } = useGetTaskByIdQuery(id);

    const [extraValues, setExtraValues] = React.useState({});

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

    const [ addJob ] = useTasksJobsAddMutation();

    const handleSave = async (e) => {
        e.preventDefault();

        const extra = {};
        Object.entries(extraValues).forEach(([key, val]) => {
            extra[key] = val.value;
        });

        await addJob({
            id,
            extra,
            cronString: "*/5 * * * *",
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

                    <button className="btn btn-primary">Add job</button>
                </form>
            </div>
        </div>
    );
};

export default AddJobs;
