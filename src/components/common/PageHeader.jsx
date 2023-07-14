import React from "react";
import {IoIosArrowBack} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const PageHeader = (props) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center text-gray cursor-pointer" onClick={() => navigate(-1)}>
                <div className="flex mr-2">
                    <IoIosArrowBack />
                </div>
                <div>Back</div>
            </div>
            <h1 className="h3 mt-5 mb-6">{props.header}</h1>
        </>
    );
};

export default PageHeader;
