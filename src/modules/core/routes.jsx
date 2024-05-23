import { BiTask, BiUser } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";


import { userRoutes } from "routes/users";
import { teamRoutes } from "routes/teams";
import { groupRoutes } from "routes/groups";
import { appRoutes } from "routes/apps";
import { taskRoutes } from "routes/tasks";
import { consumersRoutes } from "routes/consumers";
import { notificationsRoutes } from 'routes/notifications';

export const adminRoutes = [].concat(
    userRoutes, 
    teamRoutes, 
    groupRoutes, 
    appRoutes, 
    taskRoutes, 
    consumersRoutes, 
    notificationsRoutes
);

export const adminNavLinks = [
    { icon: <BiUser />, title: "Users", url: "/users" },
    { icon: <FiUsers />, title: "Teams", url: "/teams" },
    // { icon: <MdGroups />, title: "Access Groups", url: "/groups" },
    { icon: <AiOutlineAppstore />, title: "Modules", url: "/modules" },
    { icon: <BiTask />, title: "Jobs", url: "/jobs" },
    // { icon: <MdTask />, title: "Consumers", url: "/consumers", },
    // { icon: <BiNotification />, title: "Notifications", url: "/notifications" }
];