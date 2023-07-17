import Apps from "pages/apps";
// import CloneApp from "pages/apps/CloneApp";
import LogsApp from "pages/apps/LogsApp";
import SettingsApp from "pages/apps/SettingsApp";
import ManageGroupApp from "pages/apps/ManageGroupApp";
import ManageMembersApp from "pages/apps/ManageMembersApp";

export const appRoutes = [
  {
    path: "/apps",
    element: <Apps />,
  },
  // {
  //   path: "/apps/clone",
  //   element: <CloneApp />,
  // },
  {
    path: "/apps/logs/:id",
    element: <LogsApp />,
  },
  {
    path: "/apps/settings/:id",
    element: <SettingsApp />,
  },
  {
    path: "/apps/settings/manage/:id",
    element: <ManageGroupApp />,
  },
  {
    path: "/apps/settings/manage/members/:id",
    element: <ManageMembersApp />,
  },
];
