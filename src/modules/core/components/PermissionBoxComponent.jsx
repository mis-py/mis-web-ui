import React, { useState, useEffect } from "react";

const PermissionBox = ({name, display_name, onBoxChange, initialChecked = false}) => {
    const htmlFor = `permission-${name}`.replace(':', '_');

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(initialChecked);
    }, [initialChecked])


    const onChange = (e) => {
        setChecked(!checked);
        onBoxChange(e, !checked);
    }

    return (
        <div className="form-control">
            <label className="label cursor-pointer justify-start" htmlFor={htmlFor}>
                <input
                    id={htmlFor} 
                    name={name} 
                    type="checkbox" 
                    checked={checked} 
                    className="checkbox mr-2 without-ring" 
                    onChange={onChange} />
                <span className="label-text">{display_name}</span>
            </label>
        </div>
    );
};

export default PermissionBox;