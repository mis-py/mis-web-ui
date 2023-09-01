import TeamList from "components/teams/TeamList";
import TeamEdit from "modules/core/teams/EditTeam";
// import Teams from "modules/core/teams";
// import AddTeam from "modules/core/teams/AddTeam";
// import AddTeamMembers from "modules/core/teams/AddTeamMembers";
// import AddTeamPermissions from "modules/core/teams/AddTeamPermissions";
// import EditTeam from "modules/core/teams/EditTeam";
// import EditTeamMembers from "modules/core/teams/EditTeamMembers";
// import EditTeamPermissions from "modules/core/teams/EditTeamPermissions";
// import EditTeamSettings from "modules/core/teams/EditTeamSettings";

// export const teamRoutes = [
//   {
//     path: "/teams",
//     element: <Teams />,
//   },
//   {
//     path: "/add-team",
//     element: <AddTeam />,
//   },
//   {
//     path: "/add-team/permissions",
//     element: <AddTeamPermissions />,
//   },
//   {
//     path: "/add-team/members",
//     element: <AddTeamMembers />,
//   },
//   {
//     path: "/teams/:id",
//     element: <EditTeam />,
//   },
//   {
//     path: "/team/permissions/:id",
//     element: <EditTeamPermissions />,
//   },
//   {
//     path: "/team/members/:id",
//     element: <EditTeamMembers />,
//   },
//   {
//     path: "/team/settings/:id",
//     element: <EditTeamSettings />,
//   },
// ];

export const teamRoutes = [
  {
    path: "/teams",
    element: <TeamList />,
  },
  {
    path: "/teams/add",
    element: <TeamEdit />,
  },
  {
    path: "/teams/:id",
    element: <TeamEdit />,
  },
];
