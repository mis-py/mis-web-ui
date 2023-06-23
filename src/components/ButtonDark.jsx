import React from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlinePlusCircle } from "react-icons/ai";

const ButtonDark = ({ name, length, to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
    >
      {name} ({length})
      <AiOutlinePlusCircle className="text-xl" />
    </button>
  );
};

export default ButtonDark;
