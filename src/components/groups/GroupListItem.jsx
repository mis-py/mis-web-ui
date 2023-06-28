import React from "react";

import ListItemWrapper from "../../components/common/ListItemWrapper";
import {useNavigate} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";
import { useDeleteGroupMutation } from "redux/index";
import AdminWrapper from "../../config/AdminWrapper";
import {BiDotsVerticalRounded} from "react-icons/bi";
import useOutsideClick from "../../hooks/useOutsideClick";
import Tooltip from "../Tooltip";

const GroupListItem = (props) => {
    const navigate = useNavigate();
    const [deleteGroup] = useDeleteGroupMutation();

    const [showEdit, setShowEdit] = React.useState(false);

    const handleClickOutside = () => {
        setShowEdit(false);
    };

    const refPopup = useOutsideClick(handleClickOutside);

    const toggleEdit = (index) => {
        if (showEdit === index) {
            setShowEdit(false);
            return;
        }
        setShowEdit(index);
    };

    const handleDeleteGroup = async (id) => {
        confirmAlert({
            title: "Delete group",
            message: "Are you sure you want to delete this group?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await deleteGroup(id);
                        navigate("/groups");
                        toast.success("Group deleted");
                    },
                },
                {
                    label: "No",
                },
            ],
            overlayClassName: "bg-blackSecond/70",
        });
    };

    return (
        <ListItemWrapper  className="lg:pt-6 lg:px-6">
            <div
                ref={refPopup}
                className={`${
                    showEdit === props.index
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
            >
                <div
                    onClick={() => navigate(`/group/members/${props.group.id}`)}
                    className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                >
                    Manage members
                </div>

                <div
                    onClick={() => navigate(`/group/objects/${props.group.id}`)}
                    className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                >
                    Manage objects
                </div>

                <div
                    onClick={() => handleDeleteGroup(props.group.id)}
                    className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                >
                    Remove
                </div>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-backGround">
                <div className="flex items-center gap-4">
                    <img
                        className="w-[56px] h-[56px]"
                        src={require("assets/img/groups.png")}
                        alt={props.group.name}
                        title={props.group.name}
                    />
                    <div className="flex flex-col">
                        <h5 className="text-gray text-xs">
                            Name of the department:
                        </h5>
                        <h4>{props.group.name}</h4>
                    </div>
                </div>
                <AdminWrapper>
                    <BiDotsVerticalRounded
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleEdit(props.index);
                        }}
                        className="text-3xl text-gray cursor-pointer"
                    />
                </AdminWrapper>
            </div>

            <div className="duration-300 flex flex-col pt-4">
                <p className="pb-4">Members of the department:</p>
                <div className="flex">
                    {props.group.users.length ? (
                        props.group.users.map((item) => (
                            <div
                                key={item.id}
                                className="group cursor-pointer shadow relative"
                            >
                                <img
                                    className="w-[35px] h-[35px]"
                                    src={require("assets/img/user.png")}
                                    alt={item.username}
                                    title={item.username}
                                />
                                <Tooltip name={item.username} />
                            </div>
                        ))
                    ) : (
                        <p className="text-danger">NO USERS</p>
                    )}
                </div>
            </div>

            {props.children}
        </ListItemWrapper>
    );
};

export default GroupListItem;
