import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const PageHeader = (props) => {
    const showBack = props.showBack === undefined || props.showBack === true;
    // TODO replace this shitty slash by css

    let pathSeparator = props.routeHeader !== undefined ? "/ " : "";

    return (
        <div className="flex flex-row">
            {showBack && <Link className="flex items-center text-white cursor-pointer mr-1" to={-1}>
            {props.routeHeader}
            </Link>}
            <div className={`flex text-white py-1 ${props.headerClass}`.trim()}>{pathSeparator}{props.header}</div>
        </div>
    );
};

export default PageHeader;
