import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const PageHeader = ({pageHeader = ['UntitledPage']}) => {
    let headerArray = pageHeader.map((item, index) => {
        if (typeof item === 'object') {
            return <li key={index}>
                        <Link className="flex items-center cursor-pointer mr-1 link link-primary" to={item.path}>
                            {item.name}
                        </Link>
                    </li>
        } else {
            return <li key={index}>{item}</li>
        }
    })

    return (
        <div className="breadcrumbs text-lg overflow-visible">
            <ul>
                {headerArray}
            </ul>
        </div>
    );
};

export default PageHeader;
