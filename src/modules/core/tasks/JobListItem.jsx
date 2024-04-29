import React from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "components/ListItem";
import { FiFileText, FiPause, FiPlay, FiXCircle, FiEdit} from "react-icons/fi";
import { 
    useJobResumeMutation, 
    useJobPauseMutation,
    useJobRemoveMutation,
} from 'redux/api/jobsApi';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";


const JobListItem = ({item}) => {
    const navigate = useNavigate();

    const [jobPause] = useJobPauseMutation();
    const [jobResume] = useJobResumeMutation();
    const [jobRemove] = useJobRemoveMutation();

    const PauseJob = async (job) => {
        await jobPause({job_id: job.job_id}).then(({data, error}) => {
            if (error) {
                toast.error(`Error while pause job: ${error}`)
            } else {
                toast.success("Job paused");
            }
        });
    };
    const ResumeJob = async (job) => {
        await jobResume({job_id: job.job_id}).then(({data, error}) => {
            if (error) {
                toast.error(`Error while resume job: ${error}`)
            } else {
                toast.success("Job resumed");
            }
        });
    };
    const RemoveJob = async (job) => {
        confirmAlert({
            title: "Remove job",
            message: "Are you sure you want to remove this job?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await jobRemove({job_id: job.job_id}).then(({data, error}) => {
                            if (error) {
                                toast.error(`Error while remove job: ${error}`)
                            } else {
                                toast.success("Job removed");
                                navigate("/jobs");
                            }
                        });
                    },
                },
                {
                    label: "No",
                },
            ],
            overlayClassName: "bg-blackSecond/70",
        })
    };

    let itemProps = {
        item: item,
        buttonOptions: [
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
        ]
    }

    return <ListItem {...itemProps}/>
}

export default JobListItem;