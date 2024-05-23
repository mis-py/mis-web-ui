import React, { useState } from "react";
import TableBody from "./TableBody";
import TableBodyVertical from "./TableBodyVertical";
import TableHead from "./TableHead";
import { useSortableTable } from "../../hooks/useSortableTable";

// https://blog.logrocket.com/creating-react-sortable-table/

const Table = ({columns, tableItems, caption=null, is_body_horizontal=true}) => {
    
    const [tableData, handleSorting] = useSortableTable(tableItems, columns);

    return (
        <table className="table">
            <caption>{caption}</caption>
            <TableHead columns={columns} handleSorting={handleSorting} />
            {
                is_body_horizontal ? 
                <TableBody columns={columns} tableData={tableData} /> : 
                <TableBodyVertical columns={columns} tableData={tableData}/> 
            }
        </table>
    );
};

export default Table;