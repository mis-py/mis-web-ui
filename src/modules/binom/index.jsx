import React from 'react'
import PageHeader from "../../components/common/PageHeader";
import TabsList from "../../components/common/tabs/TabsList";

const tabs = [
    {
        label: 'Domain management',
        Component: React.lazy(() => import("components/domainManagement/DomainManagement"))
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
            />

            <Component />
          </div>
        </div>
    )
}

export default Binom