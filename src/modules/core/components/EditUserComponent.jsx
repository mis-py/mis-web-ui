import { React } from "react";
import PageHeader from "components/common/PageHeader";
import MisButton from "../../../components/common/MisButton";

const EditUser = ({...props}) => {
    let {
        pageHeader,
        saveButtonEvent,
        saveButtonTitle,
        saveButtonIcon,
        formSection,
        settingsSection,
        permissionsSection
    } = props;

    return (<>
        <div className="flex flex-5 flex-col">
            <div className="flex items-center justify-between">
                <PageHeader pageHeader={pageHeader} />
                <div className="flex flex-row text-lg gap-1">
                    <MisButton clickEvent={(e) => saveButtonEvent(e)} title={saveButtonTitle} icon={saveButtonIcon} />
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto p-2">
                <div className="divider text-lg font-medium mt-0 mb-0">User</div> 
                {formSection}
                <div className="divider text-lg font-medium mt-6">Settings</div> 
                {settingsSection}            
                <div className="divider text-lg font-medium mt-6">Permissions</div> 
                {permissionsSection}
            </div>
        </div>
    </>
    );
}

export default EditUser;