import { FiUsers } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdGroups } from "react-icons/md";

export const baseUrl = `${
  process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "/api"
}`;

export const currentUserId = localStorage.getItem("user_id");

export const sidebar = [
  { icon: <BiUser />, title: "Users", url: "/users" },
  { icon: <FiUsers />, title: "Teams", url: "/teams" },
  { icon: <MdGroups />, title: "Groups", url: "/groups" },
  {
    icon: <AiOutlineAppstore />,
    title: "Applications",
    url: "/apps",
  },
];
