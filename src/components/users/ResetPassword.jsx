import React from "react";
import { confirmAlert } from "react-confirm-alert";
import { useUserResetPasswordMutation,
} from "redux/index";
import { toast } from "react-toastify";


const ResetPassword = () => {
    const [resetPassword] = useUserResetPasswordMutation();

const handleResetPassword = async () => {
    const resetUserHandle = async (userOldPass, userNewPass) => {
        resetPassword({
            old_password: userOldPass,
            new_password: userNewPass,
        }).then(res => {
            if (res.error !== undefined || res.data === undefined || res.data.status !== true) {
                let msg = "Some error occurred";
                if (res.error !== undefined) {
                    msg += `: ${res.error.data.message}`;
                }

                toast.error(msg);
            } else {
                toast.success("Password changed successfully");
            }
        });
    };

    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="react-confirm-alert">
                    <div className="react-confirm-alert-body">
                        <div className="flex flex-col gap-2">
                            <h1>Change password</h1>
                            <input id="alert_old_pass" className="rounded-md" type="password" placeholder="Old password"/>
                            <input id="alert_new_pass" className="rounded-md" type="password" placeholder="New password" />
                        </div>
                        
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button onClick={(e) => {
                                resetUserHandle(document.getElementById("alert_old_pass").value, document.getElementById("alert_new_pass").value);
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
  }

  return(
    <div className="my-3">
        <button onClick={handleResetPassword} type="button" className="btn btn-base">Change password</button>
    </div>
  )
};

export default ResetPassword