import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
// swipe select - https://jsfiddle.net/ebStc/7/

const TableBodyVerticalInput = ({ tableData, columns, allSelected, onSelect }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const [mouseDownOn, setMouseDownOn] = useState({id: null, state: null});

    const handleCheckboxChange = (checked, checkedId) => {
        let newSelected = checked ? [...selectedIds, checkedId] : selectedIds.filter(id=>id !== checkedId);
        let deduplicated = [...new Set(newSelected)];

        setSelectedIds(deduplicated);
        onSelect(deduplicated);
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
        let newSelected = allSelected ? tableData.map((item)=>item.id) : [];

        setSelectedIds(newSelected);
        onSelect(newSelected);

    },[allSelected]);

    let tableModel = columns?.map(({ accessor, title_accessor, is_checkbox, is_checked, is_href, text_center, w0 }, index) => {
        let rows = tableData?.map((item) => {
            let tData = item[accessor] ? 
                (is_checked ? <FaCheck className="inline-block" /> : ( is_href ? <a target="_blank" className="link" href={"https://"+item[accessor]}><FiExternalLink className="inline-block"/></a> : item[accessor])) : "\u00A0";
            
            // is_ready_check: item.is_ready ? <FaCheck className="inline-block" /> : null,
            // is_invalid_check: item.is_invalid  ? <FaCheck className="inline-block" /> : null,

            return is_checkbox ?
                <tr className={selectedIds.includes(item.id) ? "bg-base-200" : ""} key={item.id} title={title_accessor ? item[title_accessor] : null }
                    onMouseEnter={(event) => { onMouseEnter(event, item.id) }}
                    style={{userDrag: "none"}}
                    >
                    <td style={{"padding": "0.625rem 1rem"}}>
                        <label className="flex">
                            <input 
                                type="checkbox" 
                                className="checkbox" 
                                checked={ selectedIds.includes(item.id)}
                                onMouseDown={(event) => { onMouseDown(event, item.id) }}
                                onChange={()=>{/* do nothing coz react triggers without onChange event */}}
                            />
                        </label>
                    </td>
                </tr> :
                <tr className={selectedIds.includes(item.id) ? "bg-base-200" : ""} key={item.id} title={title_accessor ? item[title_accessor] : null }><td>{tData}</td></tr>
        });

        return (
            <td key={index} className={`p-0${is_checkbox || is_href || w0 ? ' w-0': ''} ${text_center ? 'text-center' : ''}`}>
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