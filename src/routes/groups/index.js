// import Groups from "modules/core/groups";
// import AddGroup from "modules/core/groups/AddGroup";
// import EditMembersGroup from "modules/core/groups/EditMembersGroup";
// import EditObjectsGroup from "modules/core/groups/EditObjectsGroup";
import GroupList from 'modules/core/groups/GroupList';
import GroupEdit from 'modules/core/groups/GroupEdit';

export const groupRoutes = [
  {
    path: "/groups",
    element: <GroupList />,
  },
  {
    path: "/groups/add",
    element: <GroupEdit />,
  },
  {
    path: "/groups/:id",
    element: <GroupEdit />,
  },
];
