import React, { useState } from "react";
import TableBody from "./TableBody";
import TableBodyVerticalCheckbox from "./TableBodyVerticalCheckbox";
import TableHeadCheckbox from "./TableHeadCheckbox";
import { useSortableTable } from "../../hooks/useSortableTable";

// https://blog.logrocket.com/creating-react-sortable-table/

const TableSelect = ({columns, tableItems, onSelect, caption=null, is_body_horizontal=true}) => {
    
    const [tableData, handleSorting] = useSortableTable(tableItems, columns);

    const [allSelected, setAllSelected] = useState(false);
    
    let columns_with_select = [{ label: "", accessor: "", sortable: false, is_checkbox: true }].concat(columns);

    return (
        <table className="table">
            <caption>{caption}</caption>
            <TableHeadCheckbox columns={columns_with_select} handleSorting={handleSorting} setAllSelected={setAllSelected} />

            {
                is_body_horizontal ? 
                <TableBody columns={columns_with_select} tableData={tableData} /> : 
                <TableBodyVerticalCheckbox columns={columns_with_select} tableData={tableData} allSelected={allSelected} onSelect={onSelect} />
            }
        </table>
    );
};

export default TableSelect;