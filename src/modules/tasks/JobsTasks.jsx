import React from 'react';
import  {useGetJobsQuery,
          useJobsRescheduleMutation,
          useJobsRemoveMutation,
          useJobsPauseMutation,
          useJobsResumeMutation 
        }
from 'redux/index';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import ListItemWrapper from 'components/common/ListItemWrapper';
import { Cron } from 'react-js-cron';
import { useParams, Link } from 'react-router-dom';
import 'react-js-cron/dist/styles.css'
import PageHeader from "../../components/common/PageHeader";
import { toast } from "react-toastify";
import { BiPauseCircle } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi"
import { CgFileDocument } from "react-icons/cg";

const JobsTasks = () => {
    const { id } = useParams();
    const { data: getJobs, isLoading: loadingGetJobs } = useGetJobsQuery(id);
    const [jobsPause] = useJobsPauseMutation();
    const [jobsResume] = useJobsResumeMutation();
    const [jobsReschedule] = useJobsRescheduleMutation();
    const [jobsRemove] = useJobsRemoveMutation();
    const navigate = useNavigate();


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

      const handleRemoveJob = async (id) => {
        confirmAlert({
          title: "Delete job",
          message: "Are you sure you want to remove this job",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                await jobsRemove(id).unwrap();
                navigate("/tasks");
                toast.success("Job deleted");
              },
            },
            {
              label: "No",
            },
          ],
          overlayClassName: "bg-blackSecond/70",
        });
      };

      const [cronValues, setCronValues] = React.useState({});
      const [intervalValue, setIntervalValue] = React.useState()
      const [statusValues, setStatusValues] = React.useState({});

      React.useEffect(() => {
        if (getJobs !== undefined) {
          let statuses = {};
          let cron = {};
          getJobs.forEach((job) => {
            statuses[job.id] = job.status;

            if (job.trigger.type === "cron") {
              cron[job.id] = job.trigger.value;
            } else {
              cron[job.id] = "";
            }
          });

          setCronValues(cron);
          setStatusValues(statuses);
        }
      }, [loadingGetJobs, getJobs]);

      const handleCronChange = (id, value) => {
        let crons = {};
        getJobs.forEach((job) => {
          if (job.id === id) {
            crons[job.id] = value;
          } else {
            crons[job.id] = cronValues[id];
          }
        });

        setCronValues(crons);
      };

      const handleStatusChange = (id, status) => {
        let statuses = {};

        getJobs.forEach((job) => {
          if (job.id === id) {
            statuses[job.id] = status;
          } else {
            statuses[job.id] = job.status;
          }
        });

        setStatusValues(statuses);
      };

      const handleFormSubmit = (event) => {
        event.preventDefault();
        // const finalValue = isValidInput(inputValue) ? inputValue : cronValue;
      };

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


                {getJobs !== undefined && getJobs.map((item) => (
                  <ListItemWrapper
                    key={item.id}
                  >
                    <div className="flex justify-between pb-3 border-b border-backGround">
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                          <div className="text-gray text-xs">
                            Jobs identifier:
                          </div>
                          <div>{item.id}</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-gray text-xs">
                          </div>
                          <div>{item.name}</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-gray text-xs">
                            Job status:
                          </div>
                          <div>{statusValues[item.id]}</div>
                        </div>
                      </div>
                      <div className="flex flex-col divide-y-2 divide-gray-100">
                        <div className="flex flex-col">
                        <BsTrash
                            onClick={() => {handleRemoveJob(item.id)}}
                            className="mb-3 cursor-pointer text-4xl text-danger"
                        />
                          <BiPauseCircle onClick={(e) => { PauseMutation(e, item.id); handleStatusChange(item.id, "paused") }} 
                            className={`text-4xl ${statusValues[item.id] === 'paused' ? 'text-primary' : 'text-gray'} cursor-pointer mb-3`}
                          />
                          <BiPlayCircle onClick={(e) => { ResumeMutation(e, item.id); handleStatusChange(item.id, "running") }}
                            className={`text-4xl ${statusValues[item.id] === 'running' ? 'text-primary' : 'text-gray'} cursor-pointer mb-3`}
                          />
                        <Link to={`/tasks/jobs/logs/${item.id}`}>
                            <CgFileDocument
                                className="text-4xl text-gray cursor-pointer"
                            />
                        </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col pb-3 border-b border-backGround">
                    <div className="flex flex-col gap-4">
                      <div className="text-gray w-full py-2 flex flex-wrap">
                        <label className="pb-3 w-full text-xs">Choose an cron:</label>
                        <Cron value={cronValues[item.id]} setValue={(value) => handleCronChange(item.id, value)} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <form onSubmit={handleFormSubmit}>
                        <div className="text-gray text-xs pb-3 flex flex-col">
                            <input
                              className="!border-primary rounded mb-8"
                              type="text"
                              placeholder="* * * * *"
                              maxLength={25}
                              value={cronValues[item.id] === undefined ? "" : cronValues[item.id]}
                              onChange={(e) => {handleCronChange(item.id, e.target.value)}}
                            />
                          <div className="flex flex-col pt-3 border-t border-backGround">
                            <label className="pb-3 w-full text-xs">Choose an interval:</label>
                          </div>
                          <input
                            className="!border-primary rounded"
                            type="number"
                            placeholder="interval"
                            maxLength={5}
                            value={intervalValue}
                            onChange={(e) => {setIntervalValue(e.target.value)}}
                          />
                        </div>
                        <button onClick={(e) => RescheduleMutation(e, item.id, cronValues[item.id])} className="btn-primary">
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

export default JobsTasks;