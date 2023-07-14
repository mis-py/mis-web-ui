import React from 'react'
import { useTasksResumeMutation } from 'redux/index';
import { useGetTasksQuery } from 'redux/index';
import { useTasksPauseMutation } from 'redux/index';
import { useTasksRescheduleMutation } from 'redux/index';
import { useTasksJobsAddMutation } from 'redux/index';
import SpinnerLoader from "../../components/common/SpinnerLoader";
import ListItemWrapper from "../../components/common/ListItemWrapper";

const Tasks = () => {
  const { data: getTasks, isLoading: loadingGetTasks } = useGetTasksQuery();
  const [tasksPause] = useTasksPauseMutation();
  const [tasksResume] = useTasksResumeMutation();
  const [tasksReschedule] = useTasksRescheduleMutation();
  const PauseMutation = async (e, id) => {
    e.preventDefault();
    if (getTasks) {
      await tasksPause(id).unwrap();
    }
  };
  const ResumeMutation = async (e, id) => {
    e.preventDefault();
    if (getTasks) {
      await tasksResume(id).unwrap();
    }
  };
  const RescheduleMutation = async (e, id) => {
    e.preventDefault();
    if (getTasks) {
    }
    await tasksReschedule(id).unwrap();
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
              {Object.entries(getTasks).map((moduleTaskList) => {
                const [, taskList] = moduleTaskList;

                return taskList.map(item => (
                <ListItemWrapper
                  key={item.id}
                >
                  <div className="flex justify-between items-center pb-3 border-b border-backGround">
                    
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
                    <div className="flex flex-col divide-y-2 divide-gray-100">
                      <div className="flex flex-col py-2 md:flex-nowrap">
                        <button onClick={(e) => PauseMutation(e, item.id)} 
                          className="flex my-8 mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">
                          Pause
                        </button>
                        <button onClick={(e) => ResumeMutation(e, item.id)} 
                          className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">
                          Resume
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-nowrap justify-between items-center pb-3 border-b border-backGround">
                    <div className="flex gap-4">
                      <div className="text-gray text-xs">
                        Choose an interval:

                      </div>
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

{/*<div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">*/}
{/*  <span className="font-semibold title-font text-gray-700">{item.id}</span>*/}
{/*  <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>*/}
{/*</div>*/}
{/*<div className="md:flex-grow">*/}
{/*  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2 pl-96">{item.name}</h2>*/}
{/*  <p className="leading-relaxed pl-96 pb-14">{item.next_run_time}</p>*/}

{/*</div>*/}

export default Tasks