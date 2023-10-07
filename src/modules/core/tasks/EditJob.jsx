import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAddJobMutation } from "redux/index";
import { toast } from "react-toastify";
import 'react-js-cron/dist/styles.css';
import EditItem from "modules/core/components/EditItemComponent";
import TaskTemplateForm from 'modules/core/components/TaskTemplateForm';
import { useDispatch } from "react-redux";
import { resetTask } from 'redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';

const EditJob = () => {
    const task = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ addJob ] = useAddJobMutation();

    const handleSave = async () => {
        await addJob({
            task_id: task.task_id,
            task_params: task.extra_params,
            task_trigger: task.trigger
        }).then(res => {
            console.log(res);
            if (res.data.status != 'error') {
                toast.success(`Job created successfully`);
                navigate(`/jobs`);
                dispatch(resetTask());
            } else {
                toast.error(res.data.detail);
                
            }
        });
    };

    return (<EditItem
        pageHeader={["Administration", "isBack:Tasks", task.task_name]}
        saveButtonEvent={handleSave}
        sections={[
          {
              name: "Job params",
              element: <TaskTemplateForm />
          },
        ]}
    />);
};

export default EditJob;
