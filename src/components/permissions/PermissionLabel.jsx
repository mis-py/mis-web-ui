import React from "react";

const PermissionLabel = (props) => {
    const htmlFor = `permission-${props.item.scope}`.replace(':', '_');

    return (
        <label
            className={`${
                props.checked
                    ? "border-primary"
                    : "border-blackSecond"
            } outline-none flex border duration-300 items-center gap-2 rounded w-full bg-blackSecond p-5 cursor-pointer text-gray body-2 sm:w-[calc(50%_-_8px)]`}
            htmlFor={htmlFor}
        >
            <input
                type="checkbox"
                name={props.item.name}
                id={htmlFor}
                checked={props.checked}
                onChange={props.onChange}
                className="bg-transparent cursor-pointer
    w-5 h-5 border border-primary focus:ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none active:!outline-none focus-visible:!outline-none rounded"
            />
            {props.item.name} ({props.item.scope})
        </label>
    );
};

export default PermissionLabel;