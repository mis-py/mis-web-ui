import React, { useState } from 'react'
import PageHeader from "../../components/common/PageHeader";
import TabsList from "../../components/common/tabs/TabsList";
import MisButton from "components/common/MisButton";
import DomainDashboard from "components/domainManagement/DomainDashboard";


const tabs = [
    {
        name: 'Domain dashboard',
        element: <DomainDashboard/>
    },
    // {
    //     label: 'Domain management',
    //     element: React.lazy(() => import("components/domainManagement/DomainManagement"))
    // },
    // {
    //     label: 'Setup process',
    //     element: React.lazy(() => import("components/domainManagement/SetupProcess"))
    // },
];

const Binom = () => {
    const [selectedTab, selectTab] = useState(0)

    return (
        <div className="flex flex-5 flex-col h-screen overflow-y-auto">
            <div className="flex items-center justify-between">
                <PageHeader pageHeader={["Binom Companion"]} />
                {/* <div className="flex flex-row text-lg gap-1">
                    <MisButton clickEvent={(e) => saveButtonEvent(e)} title={saveButtonTitle} icon={saveButtonIcon} />
                </div> */}
            </div>
            <div className="tabs">
                {tabs.map((item, index) => {
                    return (
                        <a key={index} className={`tab tab-lifted ${index == selectedTab ? 'tab-active' : ''}`} onClick={()=>selectTab(index)} >{item.name}</a> 
                    )
                })}
            </div>
            <div className="flex flex-col h-screen overflow-y-auto p-2">
            { tabs[selectedTab]?.element }
            </div>
        </div>
        // <div className="py-6">
        //     <div className="flex flex-col">
        //     <PageHeader
        //         header="Binom companion"
        //         showBack={false}
        //     />
        //     <TabsList
        //         items={tabs}
        //         setActiveTab={setActiveTab}
        //         activeTab={activeTab}
        //     />

        //     <Component />
        //   </div>
        // </div>
    )
}

export default Binom