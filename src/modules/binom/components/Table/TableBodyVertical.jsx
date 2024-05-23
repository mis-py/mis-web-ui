import React from "react";

const TableBodyVertical = ({ tableData, columns }) => {
    let tableModel = columns?.map(({ accessor, title_accessor }, index) => {
        let rows = tableData?.map((item) => {
            const tData = item[accessor] ? item[accessor] : "\u00A0";

            return index == 0 ?
                <tr title={title_accessor ? item[title_accessor] : null }><th>{tData}</th></tr> : 
                <tr title={title_accessor ? item[title_accessor] : null }><td>{tData}</td></tr>
        });

        return (
            <td key={accessor} className="p-0">
                <table className="w-full">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </td>
        )
    })
    
    return (
        <tbody>
            <tr>
                {tableModel}
            </tr>
        </tbody>
    );
};

export default TableBodyVertical;