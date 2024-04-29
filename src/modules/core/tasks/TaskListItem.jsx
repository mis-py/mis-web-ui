import React from "react";
import ListItem from "components/ListItem";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { taskToStart } from 'redux/slices/taskSlice';


const TaskListItem = ({item}) => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const createNewJob = (task) => {
        // dispatch(taskToStart(task));
        navigate(`/jobs/add?task_id=${task.id}`);
      }

    let itemProps = {
        item: item,
        buttonOptions: [
            {
                title: "Create new Job",
                onClick: createNewJob,
                icon: <FiPlus />,
            }
        ]
    }

    return <ListItem {...itemProps}/>
}

export default TaskListItem;