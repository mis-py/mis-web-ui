import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const LogsApp = () => {
  const navigate = useNavigate();
  const [terminalLineData, setTerminalLineData] = React.useState([
    // <TerminalOutput>Welcome to the App name logs</TerminalOutput>,
  ]);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <Link to={-1} className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <span>back</span>
        </Link>
        <h3 className="h3 mt-5">App name logs</h3>
        <form className="my-4">
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Search..."
            />
            <FiSearch className="w-12 text-gray" />
          </label>
        </form>
        <Terminal
          // name="React Terminal Usage Example"
          colorMode={ColorMode.Dark}
          onInput={(terminalInput) =>
            console.log(`New terminal input received: '${terminalInput}'`)
          }
        >
          {terminalLineData}
        </Terminal>
      </div>
    </div>
  );
};

export default LogsApp;
