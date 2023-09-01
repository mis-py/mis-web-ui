import { FiUsers } from "react-icons/fi";
import { BiTask, BiUser } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdGroups, MdTask } from "react-icons/md";

export const baseUrl = `${
  process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "/api"
  // "http://dev.ng.lan/api"
}`;

export const sidebar = [
  { icon: <BiUser />, title: "Users", url: "/users" },
  { icon: <FiUsers />, title: "Teams", url: "/teams" },
  { icon: <MdGroups />, title: "Access Groups", url: "/groups" },
  { icon: <AiOutlineAppstore />, title: "Applications", url: "/apps", },
  { icon: <BiTask />, title: "Tasks", url: "/tasks", },
  { icon: <MdTask />, title: "Consumers", url: "/consumers", },
];
