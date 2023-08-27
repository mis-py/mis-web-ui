import React from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlinePlusCircle } from "react-icons/ai";

const MisButton = ({ title, isFirst, clickEvent, icon, border }) => {
  return (
    <button
      key={title}
      className={`flex justify-center items-center w-[32px] h-[32px] ${border ? 'border' : ''} rounded bg-blackSecond ${isFirst ? 'ml-auto' : ''}`}
      onClick={clickEvent}
      title={title}
    >
      <div className="duration-300 group-hover:text-primary">
        {icon}
      </div>
    </button>
  );
};

export default MisButton;
