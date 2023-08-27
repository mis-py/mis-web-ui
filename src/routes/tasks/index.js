import Tasks from "modules/core/tasks";
import Jobs from "modules/core/tasks/JobsTasks";
// import EditMembersGroup from "pages/groups/EditMembersGroup";
// import EditObjectsGroup from "pages/groups/EditObjectsGroup";

export const taskRoutes = [
  {
    path: "/tasks",
    element: <Tasks />,
  },

  {
    path: "/tasks/jobs/:id",
    element: <Jobs />,
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
