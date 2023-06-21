import React from "react";

import Tooltip from "components/Tooltip";
import { BiPaste } from "react-icons/bi";

const Input = ({
    label,
    type,
    id,
    placeholder,
    value,
    changeValue,
    readOnly,
    className,
    inputClassName,
    name,
    children,
    hasDefault,
    setDefault
  }) => {
  return (
    <label className={`flex flex-col gap-1 mb-4 ${className}`} htmlFor={id}>
      {label}
      
      <input
        name={name}
        className={`bg-blackSecond rounded px-3 py-2 focus-visible:outline-none border-none ${inputClassName}`}
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={changeValue}
        readOnly={readOnly}
      />

      {hasDefault && (
        <div className="group absolute right-5 bottom-3 cursor-pointer">
          <Tooltip name={`Paste default value`} />
          <BiPaste
            onClick={setDefault}
            className="text-gray"
          />
        </div>
      )}

      {children}
    </label>
  );
};

export default Input;
