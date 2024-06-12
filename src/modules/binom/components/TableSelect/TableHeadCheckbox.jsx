import React, { useState } from "react";

const TableHeadInput = ({ columns, handleSorting, setAllSelected }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable, is_checkbox, text_center }, index) => {
                    const sort_type = sortable ? 
                        sortField === accessor && order === "asc" ? "text-black rotate-180" : 
                        sortField === accessor && order === "desc" ? "text-black rotate-0" : "text-[#BCBDBE] rotate-0 hover:text-black" : "hidden";

                    return is_checkbox ? 
                        <th key={index}><input                            
                            type="checkbox"
                            className="checkbox"
                            onChange={(event) => { setAllSelected(event.target.checked) }}
                        /></th> :
                        <th className={text_center ? "text-center" : ""} key={index} onClick={sortable? () => handleSortingChange(accessor) : null}>
                            <span className={`inline-flex select-none ${sortable ? "cursor-pointer" : null}`}>
                                <svg
                                    className={`w-4 h-4 ${sort_type}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                                {label}
                            </span>
                        </th>
                })}
            </tr>
        </thead>
    );
};

export default TableHeadInput;