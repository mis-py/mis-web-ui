import Tasks from "modules/tasks";
import JobsTasks from "modules/tasks/JobsTasks";
import JobsLogs from "../../modules/tasks/JobsLogs";

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

  // {
  //   path: "/group/members/:id",
  //   element: <EditMembersGroup />,
  // },
  // {
  //   path: "/group/objects/:id",
  //   element: <EditObjectsGroup />,
  // },
];
