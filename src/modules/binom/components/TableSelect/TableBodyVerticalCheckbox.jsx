import { useState, useEffect } from "react";

// swipe select - https://jsfiddle.net/ebStc/7/

const TableBodyVerticalInput = ({ tableData, columns, allSelected }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const [mouseDownOn, setMouseDownOn] = useState({id: null, state: null});

    const handleCheckboxChange = (checked, checkedId) => {
        if(checked){
            setSelectedIds([...selectedIds, checkedId]);
        } else {
            setSelectedIds(selectedIds.filter(id=>id !== checkedId));
        }
    }

    const onMouseDown = (event, checkedId) => {
        let checked = !event.target.checked;
        setMouseDownOn({id: checkedId, state: checked });
        handleCheckboxChange(checked, checkedId);
    }

    const onMouseUp = () => {
        setMouseDownOn({id: null, state: null});
    }

    const onMouseEnter = (event, checkedId) => {
        if (mouseDownOn.id && mouseDownOn.id != checkedId){
            handleCheckboxChange(mouseDownOn.state, checkedId);
        }
    }

    useEffect(()=>{
        if (allSelected){
            setSelectedIds(tableData.map((item)=>item.id));
        } else {
            setSelectedIds([]);
        }

    },[allSelected]);

    let tableModel = columns?.map(({ accessor, title_accessor, is_checkbox }, index) => {
        let rows = tableData?.map((item) => {
            const tData = item[accessor] ? item[accessor] : "\u00A0";

            return is_checkbox ?
                <tr key={item.id} title={title_accessor ? item[title_accessor] : null }
                    onMouseEnter={(event) => { onMouseEnter(event, item.id) }}
                    style={{"userDrag": "none"}}
                    ><td style={{"padding": "0.625rem 1rem"}}>
                    <label className="flex">
                        <input 
                            type="checkbox" 
                            className="checkbox" 
                            checked={ selectedIds.includes(item.id)}
                            onMouseDown={(event) => { onMouseDown(event, item.id) }}
                            onChange={()=>{/* do nothing coz react triggers without onChange event */}}
                        />
                    </label>
                </td></tr> :
                <tr key={item.id} title={title_accessor ? item[title_accessor] : null }><td>{tData}</td></tr>
        });

        return (
            <td key={accessor} className={`p-0 ${index == 0 ? 'w-0': ''}`}>
                <table className="w-full">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </td>
        )
    })
    
    return (
        <tbody onMouseUp={(event) => { onMouseUp() }}>
            <tr>
                {tableModel}
            </tr>
        </tbody>
    );
};

export default TableBodyVerticalInput;