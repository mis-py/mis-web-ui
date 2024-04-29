// import JobsLogs from "modules/core/tasks/JobsLogs";
import JobEdit from "modules/core/tasks/JobEdit";
import JobsList from 'modules/core/tasks/JobsList';
import TasksList from 'modules/core/tasks/TasksList';

export const taskRoutes = [
  {
    path: "/jobs",
    element: <JobsList />
  },
  {
    path: "/jobs/:id",
    element: <JobEdit />,
  },
  {
    path: "/jobs/add",
    element: <JobEdit />,
  },
  {
    path: "/tasks",
    element: <TasksList />
  },
  // {
  //   path: "/jobs/logs/:id",
  //   element: <JobsLogs />,
  // },
];
