import { React } from "react";
import PageHeader from "components/common/PageHeader";
import MisButton from "../../../components/common/MisButton";

const EditUser = ({...props}) => {
    let {
        routeHeader,
        pageHeader,
        saveButtonEvent,
        saveButtonTitle,
        saveButtonIcon,
        formSection,
        settingsSection,
        permissionsSection
    } = props;

    return (<>
        <div className="flex flex-col">
            <PageHeader routeHeader={routeHeader} header={pageHeader} />
            <div className="flex flex-row gap-[10px] py-1">
                <MisButton clickEvent={(e) => saveButtonEvent(e)} title={saveButtonTitle} icon={saveButtonIcon} />
            </div>
            {formSection}
            <hr />
            <div className="h4 py-1">Settings</div>
            {settingsSection}            
            <hr />
            <div className="h4 py-1">Permissions</div>
            {permissionsSection}
        </div>
    </>
    );
}

export default EditUser;