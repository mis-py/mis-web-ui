import React from "react";


const LogItem = (props) => {
    return (
        <div className="relative mb-2 p-2">

            <div className={`absolute top-0 left-0 right-0 bottom-0 opacity-50
            ${
                props.logData.record.level.name === "WARNING"
                    ? "bg-warning"
                    : props.logData.record.level.name === "SUCCESS"
                    ? "bg-success"
                    : props.logData.record.level.name === "DEBUG"
                    ? "bg-gray"
                    :props.logData.record.level.name === "CRITICAL"
                    ? "bg-danger"
                    : props.logData.record.level.name === "INFO"
                    ? "bg-disabled"
                    : props.logData.record.level.name === "ERROR"
                    ? "bg-dangerEasy"
                    : ""
                }
            `.trim()}></div>
            <div className="relative z-10">
                {props.logData.record.level.icon} {props.logData.record.level.name}
            </div>
            <div  className="relative z-10">{props.logData.text}</div>
        </div>
        
    );
}

export default LogItem;
