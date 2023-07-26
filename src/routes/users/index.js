import Users from "pages/users";
import AddUser from "pages/users/AddUser";
import AddUserPermissions from "pages/users/AddUserPermissions";
import AddUserSettings from "pages/users/AddUserSettings";
import EditUser from "pages/users/EditUser";
import EditUserPermissions from "pages/users/EditUserPermissions";
import EditUserSettings from "pages/users/EditUserSettings";
import ProfileUser from "pages/users/ProfileUser";
import SettingsUser from "pages/users/SettingsUser";

export const userRoutes = [
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/add-user",
    element: <AddUser />,
  },
  {
    path: "/add-user/permissions",
    element: <AddUserPermissions />,
  },
  {
    path: "/add-user/settings",
    element: <AddUserSettings />,
  },
  {
    path: "/users/:id",
    element: <EditUser />,
  },
  {
    path: "/user/permissions/:id",
    element: <EditUserPermissions />,
  },
  {
    path: "/user/settings/:id",
    element: <EditUserSettings />,
  },
  {
    path: "/profile/:id",
    element: <ProfileUser />,
  },
  {
    path: "/profile/settings/:id",
    element: <SettingsUser />,
  },
];
