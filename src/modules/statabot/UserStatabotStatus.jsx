import React from "react";

import { useInviteUserToStatabotMutation } from "redux/index";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserStatabotStatus = (props) => {
    const { user } = props;

    const [inviteLink, setInviteLink] = React.useState("");
    const [inviteUser] = useInviteUserToStatabotMutation();

    let statabot_setting = {};
    for (const setting of user.settings) {
        if (setting.setting.app !== undefined
            && setting.setting.app.name === "statabot"
            && setting.setting.key === "USER_ID"
        ) {
            statabot_setting = setting;
            break;
        }
    }

    const handleInviteUser = async (user) => {
        await inviteUser(user.id).then(res => {
            if (res.error === undefined) {
                toast.success(`Invite link generated successfully`);
                setInviteLink(res.data.link);
            } else {
                toast.error(res.error.data.detail);
            }
        });
    };

    return (
        <div className="text-gray mt-2">
            <div>Statabot status:
                <span className={statabot_setting.id === undefined ? "text-danger" : "text-success"}>
                    &nbsp;{statabot_setting.id === undefined ? "Off" : "On"}
                </span>
            </div>
            {statabot_setting.id === undefined
                ? (
                    <div className="mt-3">
                        <div className="flex gap-2">
                            <button onClick={() => {handleInviteUser(user)}} className="btn btn-primary">Invite</button>
                            <Link
                                to={`/statabot/create/${user.id}`}
                                className="btn btn-primary"
                            >
                                Create
                            </Link>
                        </div>

                        {inviteLink !== undefined && inviteLink.length !== 0 && (
                            <div className="mt-2">Invite link: {inviteLink}</div>
                        )}
                    </div>
                ) : (
                    <div>
                        <div>Statabot user_id: {statabot_setting.value}</div>
                    </div>
                )
            }
        </div>
    );
};

export default UserStatabotStatus;
