import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetUsersQuery } from "redux/index";
import { useDispatch, useSelector } from "react-redux";
import { addTeamMembers, deleteTeamMembers } from "redux/slices/teamSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";