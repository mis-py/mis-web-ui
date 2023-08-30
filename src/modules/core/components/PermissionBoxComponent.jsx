import React, { useState, useEffect } from "react";

const PermissionBox = (props) => {
    const htmlFor = `permission-${props.item.scope}`.replace(':', '_');

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked])


    const onChange = (e) => {
        setChecked(!checked);
        props.onChange(e, !checked);
    }

    return (
        <div className="form-control">
            <label className="label cursor-pointer justify-start" htmlFor={htmlFor}>
                <input 
                    id={htmlFor} 
                    name={props.item.name} 
                    type="checkbox" 
                    checked={checked} 
                    className="checkbox mr-2 without-ring" 
                    onChange={onChange} />
                <span className="label-text">{props.item.scope} - {props.item.name}</span>
            </label>
        </div>
    );
};

export default PermissionBox;