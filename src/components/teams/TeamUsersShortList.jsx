import React from "react";
import Tooltip from "components/Tooltip";
import { Link } from "react-router-dom";

import AvatarUser from "components/users/AvatarUser";

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
                            <AvatarUser
                                userData={item}
                                icon={false}
                                width={35}
                                height={35}
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