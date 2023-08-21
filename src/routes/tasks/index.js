import Tasks from "modules/tasks";
import JobsTasks from "modules/tasks/JobsTasks";
import JobsLogs from "../../modules/tasks/JobsLogs";
import AddJobs from "../../modules/tasks/AddJobs";

export const taskRoutes = [
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/tasks/jobs/:id",
    element: <JobsTasks />,
  },
  {
    path: "/tasks/jobs/logs/:id",
    element: <JobsLogs />,
  },
  {
    path: "/tasks/add-job/:id",
    element: <AddJobs />,
  },
];
