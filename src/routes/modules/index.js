import React from "react";
const Webcat = React.lazy(() => import("modules/webcat"));
const EditWebcat = React.lazy(() => import("modules/webcat/EditWebcat"));
const Tasks = React.lazy(() => import("modules/tasks"));
const Consumers = React.lazy(() => import("modules/consumers"));
const Timer = React.lazy(() => import("modules/timer"));

export const moduleRoutes = [
  {
    path: "/webcat",
    element: <Webcat />,
  },
  {
    path: "/webcat/:id",
    element: <EditWebcat />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/consumers",
    element: <Consumers />,
  },
  {
    path: "/timer",
    element: <Timer />,
  },
];
