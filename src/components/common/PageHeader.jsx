import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const PageHeader = ({pageHeader = ['UntitledPage']}) => {
    // const showBack = props.showBack === undefined || props.showBack === true;
    // TODO replace this shitty slash by css

    let headerArray = pageHeader.map((item, index) => {
        if (item.startsWith('isBack:')) {
            return <li key={index}>
                        <Link className="flex items-center cursor-pointer mr-1 link link-primary" to={-1}>
                            {item.replace('isBack:', '')}
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
            {/* {showBack && <Link className="flex items-center cursor-pointer mr-1" to={-1}>
            {props.routeHeader}
            </Link>}
            <div className={`${props.headerClass}`.trim()}>{pathSeparator}{props.header}</div> */}
        </div>
    );
};

export default PageHeader;
