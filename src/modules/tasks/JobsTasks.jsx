import React,{useState}  from 'react';
import { useGetJobsQuery } from 'redux/index';
import { useJobsResumeMutation } from 'redux/index';
import { useJobsPauseMutation } from 'redux/index';
import { useJobsRescheduleMutation } from 'redux/index';
import SpinnerLoader from "../../components/common/SpinnerLoader";
import ListItemWrapper from 'components/common/ListItemWrapper';
import { Cron } from 'react-js-cron';
import { useParams } from 'react-router-dom';
import 'react-js-cron/dist/styles.css'
import PageHeader from "../../components/common/PageHeader";
import { toast } from "react-toastify";
import {BiPauseCircle} from "react-icons/bi";
import {BiPlayCircle} from "react-icons/bi"

const Jobs = () => {
    const { id } = useParams();
    const { data: getJobs, isLoading: loadingGetJobs } = useGetJobsQuery(id);
    const [jobsPause] = useJobsPauseMutation();
    const [jobsResume] = useJobsResumeMutation();
    const [jobsReschedule] = useJobsRescheduleMutation();

    const PauseMutation = async (e, id) => {
        e.preventDefault();
        if (getJobs) {
          await jobsPause(id).unwrap();
        }
      };
      const ResumeMutation = async (e, id) => {
        e.preventDefault();
        if (getJobs) {
          await jobsResume(id).unwrap();
        }
      };
      const RescheduleMutation = async (e, id, cronString) => {
        e.preventDefault();

        if (cronString.length < 9) {
            toast.error("Please enter valid value into input");
        } else {
            await jobsReschedule({id, cron: cronString}).then(({ data }) => {
                if (data.error === undefined) {
                    toast.success("Task was rescheduled");
                } else {
                    toast.error(data.error);
                }
            });
        }
      };

      const initialValue = localStorage.getItem('cronValue') || '';
      const [inputValue, setInputValue] = useState(initialValue);
      const [cronValue, setCronValue] = useState(initialValue);

      const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setCronValue(value);
      };

      const handleCronChange = (value) => {
        setCronValue(value);
        setInputValue(value);
      };

      const handleFormSubmit = (event) => {
        event.preventDefault();
        // const finalValue = isValidInput(inputValue) ? inputValue : cronValue;
      };

      // const isValidInput = (value) => {
      //   return value === 'valid';
      // };p;

      return (
        <div className="py-6">
          <div className="flex flex-col">

          <PageHeader
              header={`Jobs (${getJobs === undefined ? 0 : getJobs.length})`}
          />
          {
            loadingGetJobs ? (
              <SpinnerLoader />
            ) :
              (<div className="flex flex-col gap-4">


                {getJobs.map((item) => (
                  <ListItemWrapper
                    key={item.id}
                  >
                    <div className="flex justify-between items-center pb-3 border-b border-backGround">
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                          <div className="text-gray text-xs">
                            Jobs identifier:
                          </div>
                          <h4>{item.id}</h4>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-gray text-xs">
                            Name of jobs:
                          </div>
                          <h4>{item.name}</h4>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-gray text-xs">
                            Job status:
                          </div>
                          <h4>{item.status}</h4>
                        </div>
                      </div>
                      <div className="flex flex-col divide-y-2 divide-gray-100">
                        <div className="flex flex-col py-2 my-2 md:flex-nowrap">
                          <BiPauseCircle onClick={(e) => PauseMutation(e, item.id)} 
                            className={`text-4xl ${item.status === 'paused' ? 'text-primary' : 'text-gray'} cursor-pointer`}
                          />
                          <BiPlayCircle onClick={(e) => ResumeMutation(e, item.id)} 
                            className={`text-4xl ${item.status !== 'paused' ? 'text-primary' : 'text-gray'} cursor-pointer`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col pb-3 border-b border-backGround">
                    <div className="flex flex-col gap-4">
                      <div className="text-gray w-full py-2 flex flex-wrap">
                        <label className="pb-3 w-full text-xs">Choose an interval:</label>
                        <Cron value={cronValue} setValue={handleCronChange} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <form onSubmit={handleFormSubmit}>
                        <div className="text-gray text-xs pb-3 flex flex-col">
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
                          ) :} */} 
                            <input
                              className="!border-primary rounded"
                              type="text"
                              placeholder="* * * * *"
                              maxLength={25}
                              value={inputValue}
                              onChange={handleInputChange}
                            />
                          
                        </div>
                        <button onClick={(e) => RescheduleMutation(e, item.id, inputValue)} className="btn-primary">
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                  </ListItemWrapper>
                ))}
              </div>)
          }
        </div>
      </div>
    )


}

export default Jobs