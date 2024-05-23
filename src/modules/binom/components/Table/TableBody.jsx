import React from "react";

const TableBody = ({ tableData, columns }) => {
    let tableModel = tableData?.map((item) => {
        const cells = columns.map(({ accessor, title_accessor }, index) => {
            const tData = item[accessor] ? item[accessor] : "\u00A0";
            return index == 0 ? 
                <th title={title_accessor ? item[title_accessor] : null } key={accessor}>{tData}</th> : 
                <td title={title_accessor ? item[title_accessor] : null } key={accessor}>{tData}</td>;
        });

        return (
            <tr key={item.id}>
                {cells}
            </tr>
        );
    })

    return (
        <tbody>
            {tableModel}
        </tbody>
    );
};

export default TableBody;