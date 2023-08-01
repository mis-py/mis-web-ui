import React from "react";

const TabsList = (props) => {
    const defaultClass = "select-none cursor-pointer inline-block p-4 rounded-t-lg hover:bg-[#4D4D4D]";
    const inactiveClass = "";

    const setActiveTab = props.setActiveTab;

    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-4">
            {props.items.map((item, index) => (
                <li className="mr-2"
                    key={`tab-${index}`}
                >
                    <span
                        className={`${defaultClass} ${inactiveClass}`.trim()}
                        onClick={() => { setActiveTab(index) }}
                    >
                        {item.label}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default TabsList;
