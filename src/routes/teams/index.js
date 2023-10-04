import TeamList from "modules/core/teams/TeamList";
import TeamEdit from "modules/core/teams/TeamEdit";

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
