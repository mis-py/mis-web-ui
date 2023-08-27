import Groups from "modules/core/groups";
import AddGroup from "modules/core/groups/AddGroup";
import EditMembersGroup from "modules/core/groups/EditMembersGroup";
import EditObjectsGroup from "modules/core/groups/EditObjectsGroup";

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
