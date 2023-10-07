import React from "react";
import ItemsList from "components/ItemsList";
import { useNavigate } from "react-router-dom";
import { 
    // useDispatch, 
    useSelector 
} from "react-redux";
import { FiFileText, FiPause, FiPlay, FiPlus, FiXCircle, FiEdit} from "react-icons/fi";
import { 
    useJobResumeMutation, 
    useJobPauseMutation,
    useJobRemoveMutation,
    useGetJobsQuery 
} from 'redux/index';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const JobsList = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const {
        data: getJobs = [],
        isLoading: loadingJobs,
        error: errorJob,
    } = useGetJobsQuery();

    const searchValue = useSelector((state) => "JobsList" in state.search.searchData ? state.search.searchData["JobsList"] : "");
    
    console.log(getJobs);

    let intlDate = new Intl.DateTimeFormat('ru-RU',{ year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,});

    const filteredJobs = getJobs.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase().trim())).map((item)=> (
        {
          ...item,
          badge: item.status,
          title: item.id,
          paragraphs:[
            item.next_run_time ? ("Started running at: " + (intlDate.format(new Date(item.next_run_time)))) : '',
          ]
        }
      ));

    const [jobPause] = useJobPauseMutation();
    const [jobResume] = useJobResumeMutation();

    const [jobRemove] = useJobRemoveMutation();

    const PauseJob = async (job) => {
        await jobPause(job.id).unwrap();
    };
    const ResumeJob = async (job) => {
        await jobResume(job.id).unwrap();
    };
    const RemoveJob = async (job) => {
        confirmAlert({
            title: "Delete job",
            message: "Are you sure you want to remove this job?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await jobRemove(job.id).unwrap();
                    },
                },
                {
                    label: "No",
                },
            ],
            overlayClassName: "bg-blackSecond/70",
        })
    };

    const buttonOptions = [
        {
            title: "Resume Job",
            onClick: (item) => ResumeJob(item),
            icon: <FiPlay />  
        },
        {
            title: "Pause Job",
            onClick: (item) => PauseJob(item),
            icon: <FiPause />
        },
        {
            title: "Job Logs",
            onClick: (item) => toast.warn("Not yet implemented!"),
            icon: <FiFileText />
        },
        {
            title: "Edit Job",
            onClick: (item) => toast.warn("Not yet implemented!"),
            icon: <FiEdit />
        },
        {
            title: "Remove Job",
            onClick: (item) => RemoveJob(item),
            icon: <FiXCircle />
        }
    ];

    const routes = [
        {
          route: '/tasks',
          icon: <FiPlus />
        }
    ];

    return (
        <ItemsList 
          routes={routes} 
          pageHeader={["Administration", "Jobs"]} 
          getItems={filteredJobs} 
          isLoading={loadingJobs} 
          buttonOptions={buttonOptions}
          searchParams={{
            key: "JobsList",
            value: searchValue,
            placeholder: "Enter job name to search...",
            showSearch: false
          }}
        />
    );
}

export default JobsList;