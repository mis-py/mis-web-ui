import React from "react";
import { confirmAlert } from "react-confirm-alert";
import { useInviteUserToStatabotMutation, useCreateUsertoStatabotMutation } from "redux/index";
import { toast } from "react-toastify";


const UserStatabotStatus = (props) => {
    const { user } = props;

    const [inviteLink, setInviteLink] = React.useState("");
    const [inviteUser] = useInviteUserToStatabotMutation();
    const [createStatabotUser] = useCreateUsertoStatabotMutation();

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
    
    const handleCreatStatabot = async (user) => {
        const createUserHandle = async (id, statabotTag, statabotTgId) => {
            createStatabotUser({
                "tg_user_id": parseInt(statabotTgId),
                "tag": statabotTag,
                "mis_user_id": id,
            }).then(res => {
                if (res.error === undefined || res.data !== true) {
                    toast.error("Some error occured: " + res.error.data.message);
                } else {
                    toast.success("User statabot account created successfully");
                }
            });
        };

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="react-confirm-alert">
                        <div className="react-confirm-alert-body">
                            <div className="flex flex-col gap-2">
                                <h1>Create Statabot</h1>Create Statabot for test?
                                <input id="alert_user_tag" className="rounded-md" type="text" placeholder="tag"/>
                                <input id="alert_tg_user_id" className="rounded-md" type="number" placeholder="tg_user_id" />
                            </div>
                            
                            <div className="react-confirm-alert-button-group">
                                <button onClick={onClose}>No</button>
                                <button onClick={(e) => {
                                    createUserHandle(user.id, document.getElementById("alert_user_tag").value, document.getElementById("alert_tg_user_id").value );
                                    onClose(e);
                                    }}
                                >Yes</button>
                            </div>
                        </div>
                    </div>
                );
            },
            overlayClassName: "bg-blackSecond/70",
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
                            <button onClick={() => {handleCreatStatabot(user)}} className="btn btn-primary">Creat</button>
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
