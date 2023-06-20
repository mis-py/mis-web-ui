import React from "react";

const Input = ({ label, type, id, placeholder, value, changeValue, readOnly }) => {
  return (
    <label className="flex flex-col gap-1 mb-4" htmlFor="username">
      {label}
      <input
        className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
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

export default Input;
