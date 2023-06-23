import Groups from "pages/groups";
import AddGroup from "pages/groups/AddGroup";
import EditMembersGroup from "pages/groups/EditMembersGroup";
import EditObjectsGroup from "pages/groups/EditObjectsGroup";

export const groupRoutes = [
  {
    path: "/groups",
    element: <Groups />,
  },
  {
    path: "/add-group",
    element: <AddGroup />,
  },
  {
    path: "/group/members/:id",
    element: <EditMembersGroup />,
  },
  {
    path: "/group/objects/:id",
    element: <EditObjectsGroup />,
  },
];
