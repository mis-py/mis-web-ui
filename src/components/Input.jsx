import React from "react";

import Tooltip from "components/Tooltip";
import { BiPaste } from "react-icons/bi";

const Input = (props) => {
    const {
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
    } = props;

  return (
    <label className={`flex flex-col gap-1 mb-4 ${hasDefault ? "relative" : ""} ${className === undefined ? "" : className}`.trim()} htmlFor={id}>
      {label}
      
      <input
        name={name}
        className={`bg-blackSecond rounded mt-1 px-3 py-2 focus-visible:outline-none border-none ${inputClassName === undefined ? "" : inputClassName}`.trim()}
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        value={value === undefined ? "" : value}
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
