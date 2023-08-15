import React from 'react'
import PageHeader from "../../components/common/PageHeader";
import TabsList from "../../components/common/tabs/TabsList";

const tabs = [
    {
        label: 'Domain dashboard',
        Component: React.lazy(() => import("components/domainManagement/DomainDashboard"))
    },
    {
        label: 'Domain management',
        Component: React.lazy(() => import("components/domainManagement/DomainManagement"))
    },
    {
        label: 'Setup process',
        Component: React.lazy(() => import("components/domainManagement/SetupProcess"))
    },
];

const Binom = () => {
    const [activeTab, setActiveTab] = React.useState(0);

    const { Component } = tabs[activeTab];

    return (
        <div className="py-6">
            <div className="flex flex-col">
            <PageHeader
                header="Binom companion"
                showBack={false}
            />
            <TabsList
                items={tabs}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />

            <Component />
          </div>
        </div>
    )
}

export default Binom