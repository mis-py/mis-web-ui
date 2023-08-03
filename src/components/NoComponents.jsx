import React from "react";

const NoComponents = ({ label, type, id, placeholder, value, changeValue, readOnly }) => {
    return (
      <label className="flex flex-col gap-1 mb-4" htmlFor="">
        {label}
        <input
          className="border-primary text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={changeValue}
          readOnly={readOnly}
        />
      </label>
    );
  };
  
  export default NoComponents;