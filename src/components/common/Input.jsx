import React, { useState, useEffect } from "react";

import Tooltip from "components/Tooltip";
import { BiRotateLeft } from "react-icons/bi";

const Input = (props) => {
  const {
      label,
      type,
      id,
      placeholder,
      value= "",
      onInputChange,
      readOnly,
      className,
      inputClassName,
      name,
      children,
      default_value=null,
      setDefault
  } = props;

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const hasDefault = default_value !== null && default_value.length > 0;

  const onChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e, e.target.value);
  }

  const onSetDefault = (e) => {
    if (hasDefault){
      setInputValue(default_value);
      setDefault(e);
    }
  }

  return (
    <label className={`flex flex-col gap-1 mb-4 ${hasDefault ? "relative" : ""} ${className === undefined ? "" : className}`.trim()} htmlFor={id}>
      {label}
      
      <input
        name={name}
        className={`bg-blackSecond rounded px-3 py-2 focus-visible:outline-none border-none ${inputClassName === undefined ? "" : inputClassName}`.trim()}
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        value={inputValue}
        onChange={onChange}
        readOnly={readOnly}
      />

      {hasDefault && (
        <div className="group absolute right-5 bottom-3 cursor-pointer">
          <Tooltip name={`Paste default value`} />
          <BiRotateLeft
            onClick={onSetDefault}
            className="text-gray"
          />
        </div>
      )}

      {children}
    </label>
  );
};

export default Input;
