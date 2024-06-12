import React, { useState, useEffect } from "react";
import Input from "./Input";
import { BiRotateLeft } from "react-icons/bi";

const InputDefault = ({
        // Input label on top of field
        label,
        secondLabel,
        // Input type, default 'text'
        type="text",
        // Input ID
        id,
        // Input placeholder
        placeholder,
        // Input value
        value="",
        // Trigger when input change
        onInputChange,
        // Make input read only
        readOnly,
        // Additional class names for form-control wrapper
        className="",
        // Input field class names
        inputClassName,
        // Input name
        name,
        // Value to reset input to by 
        default_value=null,
        // Is button to do reset is accesible
        default_pressable=true,

}) => {

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    
    const onSetDefault = (e) => {
        setInputValue(default_value);
        onInputChange(default_value);
    }

    const rightButtons=[
        {
            onClick: (e) => onSetDefault(e),
            icon: <BiRotateLeft/>
        }
    ];

    const hasButtonsGroup = rightButtons.length > 0;
  
    const onChange = (e) => {
      setInputValue(e.target.value);
      onInputChange(e.target.value);
    }
  
    const rightButtonsGroup = rightButtons.map((item, index) => {
      return <button key={index} disabled={!default_pressable} className="btn btn-square btn-outline btn-sm join-item rounded" onClick={(e) => item.onClick(e)}>
              {item.icon}
            </button>
    })

    return (<>
        <div className={`form-control ${className}`}>
          <label className="label">
            <span className="label-text">{label}</span>
            <span className="label-text-alt">{secondLabel}</span>
          </label>
          <div className="join">
            <input
             className={`input input-bordered input-sm w-full ${hasButtonsGroup ? 'join-item': ''}`}
             placeholder={placeholder}
             name={name}
             type={type}
             id={id}
             autoComplete="off"
             value={inputValue}
             onChange={onChange}
             disabled={readOnly}
             />
            { hasButtonsGroup && rightButtonsGroup }
          </div>
        </div>
      </>)
};

export default InputDefault;
