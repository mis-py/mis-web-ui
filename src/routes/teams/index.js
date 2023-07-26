import Teams from "pages/teams";
import AddTeam from "pages/teams/AddTeam";
import AddTeamMembers from "pages/teams/AddTeamMembers";
import AddTeamPermissions from "pages/teams/AddTeamPermissions";
import EditTeam from "pages/teams/EditTeam";
import EditTeamMembers from "pages/teams/EditTeamMembers";
import EditTeamPermissions from "pages/teams/EditTeamPermissions";
import EditTeamSettings from "pages/teams/EditTeamSettings";

export const teamRoutes = [
  {
    path: "/teams",
    element: <Teams />,
  },
  {
    path: "/add-team",
    element: <AddTeam />,
  },
  {
    path: "/add-team/permissions",
    element: <AddTeamPermissions />,
  },
  {
    path: "/add-team/members",
    element: <AddTeamMembers />,
  },
  {
    path: "/teams/:id",
    element: <EditTeam />,
  },
  {
    path: "/team/permissions/:id",
    element: <EditTeamPermissions />,
  },
  {
    path: "/team/members/:id",
    element: <EditTeamMembers />,
  },
  {
    path: "/team/settings/:id",
    element: <EditTeamSettings />,
  },
];
