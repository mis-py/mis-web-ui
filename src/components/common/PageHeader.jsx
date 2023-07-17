import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const PageHeader = (props) => {
    return (
        <>
            <Link className="flex items-center text-gray cursor-pointer" to={-1}>
                <div className="flex mr-2">
                    <IoIosArrowBack />
                </div>
                <div>back</div>
            </Link>
            <h1 className={`h3 mt-5 mb-6 ${props.headerClass}`.trim()}>{props.header}</h1>
        </>
    );
};

export default PageHeader;
