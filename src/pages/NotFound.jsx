import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-white text-center text-9xl font-bold">404</h1>
      <h2 className="text-center h3 text-gray">Page not found</h2>
      <Link className="btn-primary mt-5 max-w-[20rem]" to={-1}>
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
