import React, { useMemo, useState } from "react";
import ItemsList from "components/ItemsList";
import { useGetTasksQuery, filterTasksByStringSelector } from "redux/api/tasksApi";
import TaskListItem from "./TaskListItem";

const TasksList = () => {
    const [searchValue, setSearchValue] = useState("");

    const tasksSearchRresult = useMemo(filterTasksByStringSelector, []);

    const { searchFiltered } = useGetTasksQuery(undefined, {
      selectFromResult: (result) => ({
        ...result,
        searchFiltered: tasksSearchRresult(result, searchValue)
      })
    });

    let items = searchFiltered.map((item, index)=> {
        let itemProps = {
          ...item, 
          title: item.name, 
          paragraphs: [
          //   `Module: ${item.module}`,
          `Trigger: ${item.trigger ?? 'Not set'}`,
          (item.extra_typed != null && Object.keys(item.extra_typed).length > 0 ? (`Extra Params: ${Object.keys(item.extra_typed)}`) : ''), 
          `Type: ${item.type}`// Available: ${(item.is_available_add_job ? "Yes" : "No")}`, 
          ],
        }
        return <TaskListItem key={index} item={itemProps} />
      });
    
    let itemsProps = {
        pageHeader: ["Administration", { name: "Jobs", path: "/jobs" }, "Tasks"],
        searchParams: {
          key: "TasksList",
          value: searchValue,
          placeholder: "Task name...",
          showSearch: false,
          onSearch: setSearchValue
        },
        items: items
    }
    return <ItemsList {...itemsProps}/>;
}

export default TasksList;