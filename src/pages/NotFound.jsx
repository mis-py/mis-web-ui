import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col h-full justify-center">
      <h2 className="text-center h-full h3 text-gray flex items-center justify-center">
        Page not found
      </h2>
      {/* <Link className="btn-primary" to="/">
        Home
      </Link> */}
    </div>
  );
};

export default NotFound;
