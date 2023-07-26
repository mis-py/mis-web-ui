import React from 'react';
import { confirmAlert } from "react-confirm-alert";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetTasksQuery } from 'redux/index';
import { useGetJobsQuery } from 'redux/index';
import { useTasksJobsAddMutation } from 'redux/index';
import SpinnerLoader from "../../components/common/SpinnerLoader";
import ListItemWrapper from "../../components/common/ListItemWrapper";
import { CgFileDocument } from "react-icons/cg";
import {BiAddToQueue} from "react-icons/bi";

const Tasks = () => {
  const { data: getTasks, isLoading: loadingGetTasks } = useGetTasksQuery();
  const [addjob] = useTasksJobsAddMutation();
  const { id } = useParams();
  const { data: getJobs, isLoading: loadingGetJobs } = useGetJobsQuery(id);

  const handleAddJobs = async (id) => {
    confirmAlert({
      title: "Added job",
      message: "Are you sure you want to add job?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await addjob(id);
            <Link to={`/tasks/jobs/${id}`}/>
            
          },
        },
        {
          label: "No",
        },
      ],
      overlayClassName: "bg-blackSecond/70",
    });
  };

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
                    <div className="flex flex-col justify-between py-8">
                    {item.is_has_jobs ? (
                      <Link to={`/tasks/jobs/${item.id}`}>
                        <CgFileDocument className="text-3xl text-gray cursor-pointer" />
                      </Link>
                    ) : null}
                      <BiAddToQueue onClick={handleAddJobs}
                        className="text-3xl text-gray cursor-pointer"
                      />
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