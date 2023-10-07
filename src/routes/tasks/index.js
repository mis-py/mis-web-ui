// import JobsLogs from "modules/core/tasks/JobsLogs";
import EditJob from "modules/core/tasks/EditJob";
import JobsList from 'modules/core/tasks/JobsList';
import TasksList from 'modules/core/tasks/TasksList';

export const taskRoutes = [
  {
    path: "/jobs",
    element: <JobsList />
  },
  // {
  //   path: "/jobs/:id",
  //   element: <EditJob />,
  // },
  {
    path: "/tasks",
    element: <TasksList />
  },
  {
    path: "/tasks/add",
    element: <EditJob />,
  },
  // {
  //   path: "/tasks/jobs/logs/:id",
  //   element: <JobsLogs />,
  // },
];
