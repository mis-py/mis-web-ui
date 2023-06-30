import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const SpinnerLoader = (props) => {
    return (
        <PulseLoader
            size={props.size === undefined ? 15 : props.size}
            cssOverride={{...{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }, ...(props.cssOverridee === {} ? 15 : props.cssOverridee)}}
            color={props.color === undefined ? "#757575" : props.color}
        />
    );
};

export default SpinnerLoader;
