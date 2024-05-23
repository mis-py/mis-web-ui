import { RiAppsLine } from "react-icons/ri";
import ControlPanel from "modules/binom/ControlPanel";
import ProxyDomains from "modules/binom/ProxyDomains";
import AddProxyDomains from "modules/binom/AddProxyDomains";

export const binomRoutes = [
    {
        path: "/control",
        element: <ControlPanel />,
    },
    {
        path: "/domains",
        element: <ProxyDomains />,
    },
    {
        path: "/domains/add",
        element: <AddProxyDomains />,
    },
    {
        path: "/replacement_groups",
        element: null,
    },
    {
        path: "/replacement_history",
        element: null,
    },
    {
        path: "/tracker_instances",
        element: null,
    }
  ];



export const binomNavLinks = [
    { icon: <RiAppsLine />, title: "Control panel", url: "/control" },
    { icon: <RiAppsLine />, title: "Proxy domains", url: "/domains" },
    { icon: <RiAppsLine />, title: "Replacement groups", url: "/replacement_groups" },
    { icon: <RiAppsLine />, title: "Replacement history", url: "/replacement_history" },
    { icon: <RiAppsLine />, title: "Tracker instances", url: "/tracker_instances" },
];