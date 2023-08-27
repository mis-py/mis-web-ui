import Tasks from "modules/core/tasks";
import JobsTasks from "modules/core/tasks/JobsTasks";
import JobsLogs from "modules/core/tasks/JobsLogs";
import AddJobs from "modules/core/tasks/AddJobs";

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
