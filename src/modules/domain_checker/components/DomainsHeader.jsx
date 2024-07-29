import React from "react";

import { FiPlus } from "react-icons/fi";

const DomainsHeader = ({ title, setDomainTab }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => setDomainTab("Add New Monitor")}
        className="btn btn-success mb-3 max-w-max"
      >
        <FiPlus />
        Add New Monitor
      </button>
      <h2 className="text-3xl">{title}</h2>
    </div>
  );
};

export default DomainsHeader;
