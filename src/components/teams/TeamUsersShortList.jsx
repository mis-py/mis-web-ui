import React from "react";
import Tooltip from "components/Tooltip";
import { Link } from "react-router-dom";

const PermissionLabel = (props) => {
    return (
        <>
            {props.users.length ? (
                <div className="flex gap-1.5">
                    {props.users.map((item) => (
                        <Link
                            key={`team-${props.team}-users-short-list-${item.id}`}
                            className="group cursor-pointer shadow relative"
                            to={item.id === parseInt(localStorage.getItem("user_id"))
                                ? `/profile/${item.id}`
                                : `/users/${item.id}`
                            }
                        >
                            <img
                                className="w-[35px] h-[35px]"
                                src={require("assets/img/user.png")}
                                alt={item.username}
                            />
                            <Tooltip name={item.username} />
                        </Link>
                    ))}
                </div>) : (
                <p className="text-danger">No users</p>
            )}
        </>
    );
};

export default PermissionLabel;