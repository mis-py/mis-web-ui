import React from 'react';
import {Link} from 'react-router-dom';
import { useGetTasksQuery } from 'redux/index';
import SpinnerLoader from "../../components/common/SpinnerLoader";
import ListItemWrapper from "../../components/common/ListItemWrapper";
import useOutsideClick from "hooks/useOutsideClick";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Tasks = () => {
  const { data: getTasks, isLoading: loadingGetTasks } = useGetTasksQuery();
  // const [jobsPause] = useJobsPauseMutation();
  // const [jobsResume] = useJobsResumeMutation();
  // const [jobsReschedule] = useJobsRescheduleMutation();
  const [showJobs, setShowJobs] = React.useState(false);
  
  const handleClickOutside = () => {
    setShowJobs(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);
  
  const toggleJobs = (index) => {
    if (showJobs === index) {
      setShowJobs(false);
      return;
    }
    setShowJobs(index);
  };
  // const PauseMutation = async (e, id) => {
  //   e.preventDefault();
  //   if (getTasks) {
  //     await jobsPause(id).unwrap();
  //   }
  // };
  // const ResumeMutation = async (e, id) => {
  //   e.preventDefault();
  //   if (getTasks) {
  //     await jobsResume(id).unwrap();
  //   }
  // };
  // const RescheduleMutation = async (e, id, cronString) => {
  //   e.preventDefault();
  //   if (getTasks) {
  //   }
  //   await jobsReschedule({id, cron: cronString}).unwrap();
  // };
  
  // const initialValue = localStorage.getItem('cronValue') || '';
  // const [inputValue, setInputValue] = useState(initialValue);
  // const [cronValue, setCronValue] = useState(initialValue);

  // const handleInputChange = (event) => {
  //   const value = event.target.value;
  //   setInputValue(value);
  //   setCronValue(value);
  // };

  // const handleCronChange = (value) => {
  //   setCronValue(value);
  //   setInputValue(value);
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
    // const finalValue = isValidInput(inputValue) ? inputValue : cronValue;
  // };

  // const isValidInput = (value) => {
  //   return value === 'valid';
  // };


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
                    <div
                        ref={refPopup}
                        className={`${
                            showJobs === item
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                        } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
                    >
                      <Link to={`/tasks/jobs/${item.id}`}
                          className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Jobs
                      </Link>
                    </div>
                    </div>
                    <BiDotsVerticalRounded
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleJobs(item);
                              }}
                              className="text-3xl text-gray cursor-pointer"
                          />
                  </div>
                  {/* <div className="flex flex-col pb-3 border-b border-backGround">
                  <div className="flex flex-col gap-4">
                    <div className="text-gray py-2 flex flex-col">
                      <label className="pb-3 text-xs">Choose an interval:</label>
                      <Cron value={cronValue} setValue={handleCronChange} /> 
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <form onSubmit={handleFormSubmit}>
                      <div className="text-gray text-xs pb-3 flex flex-col">
                        <label className="pb-3">Choose an interval:</label>
                        {/* {isValidInput(inputValue) ? (
                          <select
                            className="!border-primary pt-2 rounded"
                            value={inputValue}
                            onChange={handleInputChange}
                          >
                            <option value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                          </select>
                        ) : ( */}
                          {/* <input
                            className="!border-primary rounded"
                            type="text"
                            placeholder="* * * * *"
                            maxLength={25}
                            value={inputValue}
                            onChange={handleInputChange}
                          /> */}
                        {/* )} */}
                      {/* </div>
                      <button onClick={(e) => RescheduleMutation(e, item.id, inputValue)} className="btn-primary">
                        Save
                      </button> */}
                    {/* </form>
                  </div>
                </div> */} 
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