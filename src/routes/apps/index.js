// import Apps from "modules/core/apps";
import InstallApp from "modules/core/apps/InstallApp";
import LogsApp from "modules/core/apps/LogsApp";
import SettingsApp from "modules/core/apps/SettingsApp";
import ManageGroupApp from "modules/core/apps/ManageGroupApp";
import ManageMembersApp from "modules/core/apps/ManageMembersApp";

import AppsList from "modules/core/apps/AppsList";
import AppEdit from "modules/core/apps/AppEdit";

export const appRoutes = [
  {
    path: "/apps",
    element: <AppsList />
  },
  {
    path: "/apps/:id",
    element: <AppEdit />,
  },
  {
    path: "/apps/install",
    element: <InstallApp />,
  },
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
