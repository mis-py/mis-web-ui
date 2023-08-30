import React, { Children } from "react";
// import { useNavigate } from "react-router-dom";

// import { AiOutlinePlusCircle } from "react-icons/ai";

const MisButton = ({ title, isFirst, clickEvent, icon, border }) => {
  return (
    <button
      key={title}
      className={`btn btn-square btn-outline btn-sm ${isFirst ? 'ml-auto' : ''}`}
      onClick={clickEvent}
      title={title}
    >
        {icon}
    </button>
  );
};

export default MisButton;
