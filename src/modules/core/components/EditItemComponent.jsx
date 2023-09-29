import { React } from "react";
import PageHeader from "components/common/PageHeader";
import MisButton from "components/common/MisButton";
import { FiSave } from "react-icons/fi";

const EditItem = ({...props}) => {
    let {
        pageHeader,
        saveButtonEvent,
        formSection,
        settingsSection,
        permissionsSection,
        formName,
        sections
    } = props;
    
    const saveButtonTitle = "Save";
    const saveButtonIcon = <FiSave />;
    return (<>
        <div className="flex flex-5 flex-col">
            <div className="flex items-center justify-between">
                <PageHeader pageHeader={pageHeader} />
                <div className="flex flex-row text-lg gap-1">
                    <MisButton clickEvent={(e) => saveButtonEvent(e)} title={saveButtonTitle} icon={saveButtonIcon} />
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto p-2">
                {
                    sections.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className={`divider text-lg font-medium ${index == 0 ? 'mt-0 mb-0' : 'mt-6'}`}>{item.name}</div> 
                                {item.element}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
    );
}

export default EditItem;