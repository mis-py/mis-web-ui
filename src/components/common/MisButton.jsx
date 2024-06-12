import React, { Children } from "react";
// import { useNavigate } from "react-router-dom";

// import { AiOutlinePlusCircle } from "react-icons/ai";

// TODO pass styles for border color and text size

const MisButton = ({ title, isFirst, clickEvent, icon, border }) => {
  return (
    <button
      key={title}
      className={`btn btn-square btn-outline text-sm md:text-md btn-sm ${isFirst ? 'ml-auto' : ''}`}
      onClick={clickEvent}
      title={title}
    >
        {icon}
    </button>
  );
};

export default MisButton;
