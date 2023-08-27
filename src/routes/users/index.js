import UserList from "modules/core/users/UserList"
import UserEdit from "modules/core/users/UserEdit"

export const userRoutes = [
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/users/add",
    element: <UserEdit />,
  },
  {
    path: "/users/:id",
    element: <UserEdit />,
  },
];
