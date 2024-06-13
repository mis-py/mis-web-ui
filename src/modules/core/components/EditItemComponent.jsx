import { React, useState } from "react";
import PageHeader from "components/common/PageHeader";
import MisButton from "components/common/MisButton";
import { FiSave } from "react-icons/fi";

const EditItem = ({...props}) => {
    let {
        pageHeader,
        saveButtonEvent,
        sections,
    } = props;
    
    const [selectedTab, selectTab] = useState(0)
    
    const saveButtonTitle = "Save";
    const saveButtonIcon = <FiSave />;
    return (
        <div className="flex flex-5 flex-col h-screen overflow-y-auto">
            <div className="flex flex-col justify-between pb-2">
                <PageHeader pageHeader={pageHeader} />
                <div className="flex flex-row text-lg gap-1">
                    <MisButton clickEvent={(e) => saveButtonEvent(e)} title={saveButtonTitle} icon={saveButtonIcon} />
                </div>
            </div>
            <div className="tabs">
                {sections.map((item, index) => {
                    return (
                        <a key={index} className={`tab tab-lifted ${index == selectedTab ? 'tab-active' : ''}`} onClick={()=>selectTab(index)} >{item.name}</a> 
                    )
                })}
            </div>
            <div className="flex flex-col h-screen overflow-y-auto p-2">
            {sections.map((item, index)=>{
                return <div key={item.name} hidden={index != selectedTab}>{item.element}</div>;
            })}
            </div>
        </div>
    );
}

export default EditItem;