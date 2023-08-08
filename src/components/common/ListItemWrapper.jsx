import React from "react";

const ListItemWrapper = (props) => {
    return (
        <div className={`flex flex-col relative bg-blackSecond p-6 rounded ${props.className === undefined ? "" : props.className}`.trim()}>
            {props.children}
        </div>
    );
};

export default ListItemWrapper;
