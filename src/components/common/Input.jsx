import React, { useState, useEffect } from "react";

// import Tooltip from "components/Tooltip";
import { BiRotateLeft } from "react-icons/bi";

const Input = ({
  // Input label on top of field
  label,
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

  primaryLabel,
  secondLabel,
  leftButtons=[],

  // Buttons to place right
  rightButtons=[]
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const hasButtonsGroup = rightButtons.length > 0 || leftButtons.length > 0;

  const onChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e, e.target.value);
  }

  const rightButtonsGroup = rightButtons.map((item, index) => {
    return <button key={index} className="btn btn-square btn-outline btn-sm join-item rounded" onClick={() => item.onClick(setInputValue)}>
            {item.icon}
          </button>
  })

  return (<>
      <div className={`form-control ${className}`}>
        <label className="label">
          <span className="label-text">{primaryLabel ?? label}</span>
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
          //  readOnly={readOnly}
           disabled={readOnly}
           />
          { hasButtonsGroup && rightButtonsGroup }
        </div>
      </div>
    </>
  );
};

export default Input;
