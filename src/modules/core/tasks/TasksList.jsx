import React from "react";
import ItemsList from "components/ItemsList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetTasksQuery } from "redux/index";
import { FiPlus} from "react-icons/fi";
import { taskToStart } from 'redux/slices/taskSlice';

const TasksList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data: getTasks = [],
        isLoading: loadingTasks,
        error: errorTasks,
    } = useGetTasksQuery();

    const searchValue = useSelector((state) => "TasksList" in state.search.searchData ? state.search.searchData["TasksList"].toLowerCase().trim() : "");

    const filteredTasks = getTasks.filter((el) => {
        return el.module.toLowerCase().includes(searchValue) ||
               el.name.toLowerCase().includes(searchValue)
      })
      .map((item)=> (
        {
          ...item, 
          title: `${item.name}`, 
          paragraphs: [
            `Module: ${item.module}`,
            (item.trigger !== null ? `Default trigger: ${item.trigger.type == 'interval' ? 'Every ' + item.trigger.value + ' seconds' : 'Unknown or not set' }` : 'Default trigger: Unknown or not set'),
            (item.extra_typed != null && Object.keys(item.extra_typed).length > 0 ? (`Extra Params: ${Object.keys(item.extra_typed)}`) : ''), 
            `Type: ${item.type} Available: ${(item.is_available_add_job ? "Yes" : "No")}`, 
          ],
          avatar: require("assets/img/app.png")
        }
      ));
    
    const createNewJob = (task) => {
      dispatch(taskToStart(task));
      navigate('/tasks/add');
    }

    const buttonOptions = [
        {
            title: "Create new Job",
            onClick: createNewJob,
            icon: <FiPlus />,
        }
    ];

    return (
        <ItemsList 
          routes={[]} 
          pageHeader={["Administration","Tasks"]} 
          getItems={filteredTasks} 
          isLoading={loadingTasks} 
          buttonOptions={buttonOptions}
          searchParams={{
            key: "TasksList",
            value: searchValue,
            placeholder: "Enter task name to search...",
            showSearch: false
          }}
        />
    );
}

export default TasksList;