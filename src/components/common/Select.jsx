import React from "react";

const Select = ({ label, name, list, value, handleSelectChange }) => {
  return (
    <div className={`form-control`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="join">
        <select
          className="select select-bordered select-sm w-full"
          name={name}
          value={value}
          onChange={handleSelectChange}
        >
          <option value={""}>None</option>
          {list.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
