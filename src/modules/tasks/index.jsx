import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTasksQuery } from 'redux/index';
import SpinnerLoader from "../../components/common/SpinnerLoader";
import ListItemWrapper from "../../components/common/ListItemWrapper";
import { CgFileDocument } from "react-icons/cg";

const Tasks = () => {
  const { data: getTasks, isLoading: loadingGetTasks } = useGetTasksQuery();

  return (
      <div className="py-6">
        <div className="flex flex-col">

        <h3 className="h3 mb-5">Tasks ({Object.values(getTasks === undefined ? {} : getTasks).reduce((acc, array) => acc + array.length, 0)})</h3>
        {
          loadingGetTasks ? (
            <SpinnerLoader />
          ) :
            (<div className="flex flex-col gap-4">
              { getTasks!== undefined && Object.entries(getTasks).map((moduleTaskList) => {
                const [, taskList] = moduleTaskList;

                return taskList.map(item => (
                <ListItemWrapper
                  key={item.id}
                >
                  <div className="flex justify-between gap-4 pb-3 border-b border-backGround">
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <div className="text-gray text-xs">
                          Task identifier:
                        </div>
                        <h4>{item.id}</h4>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-gray text-xs">
                          Name of task:
                        </div>
                        <h4>{item.name}</h4>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-gray text-xs">
                          Task type:
                        </div>
                        <h4>{item.type}</h4>
                      </div>
                    </div>
                    <div className="flex">
                      <Link to={`/tasks/jobs/${item.id}`}>
                        <CgFileDocument
                            className="text-3xl text-gray cursor-pointer"
                        />
                      </Link>
                    </div>
                    
                  </div>
                </ListItemWrapper>
                ));
              })}
            </div>)
        }
      </div>
    </div>
  )
}

export default Tasks
