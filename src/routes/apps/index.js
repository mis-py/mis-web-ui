import Apps from "modules/core/apps";
// import CloneApp from "pages/apps/CloneApp";
import LogsApp from "modules/core/apps/LogsApp";
import SettingsApp from "modules/core/apps/SettingsApp";
import ManageGroupApp from "modules/core/apps/ManageGroupApp";
import ManageMembersApp from "modules/core/apps/ManageMembersApp";

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
