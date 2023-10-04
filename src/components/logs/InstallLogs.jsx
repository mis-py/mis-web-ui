import React from "react";
import { confirmAlert } from "react-confirm-alert";

import { toast } from "react-toastify";

import { AiOutlinePlus } from "react-icons/ai";


const InstallLogs = () => {
    // const [installLogs] = useInstallAppByName();

const handleInstallLogs = async () => {
    const installLogsHandle = async (name) => {
        // installLogs({
        //     name: name,
        // }).then(res => {
        //     if (res.error !== undefined || res.data === undefined) {
        //         let msg = "Some error occurred";
        //         if (res.error !== undefined) {
        //             msg += `: ${res.error.data.message}`;
        //         }

        //         toast.error(msg);
        //     } else if (res.data.enabled === true) {
        //         toast.success("Application installed successfully");
        //     }
        // });
    };

    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="react-confirm-alert">
                    <div className="react-confirm-alert-body">
                        <div className="flex flex-col gap-2">
                            <h1>Install log</h1>
                            <input id="alert_name" className="rounded-md" type="text" placeholder="Name of log"/>
                        </div>
                        
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button onClick={(e) => {
                                installLogsHandle(document.getElementById("alert_name").value);
                                onClose(e);
                                }}
                            >Install</button>
                        </div>
                    </div>
                </div>
            );
        },
        overlayClassName: "bg-blackSecond/70",
    });
  }

  return(
        <button onClick={handleInstallLogs} type="button" className="btn btn-base">
            <AiOutlinePlus />
        </button>
  )
};

export default InstallLogs