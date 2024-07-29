import React from "react";

import DomainsStats from "./DomainsStats";
import DomainsStatsTab from "./DomainsStatsTab";

const DomainsStatsList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        <DomainsStats />
        <DomainsStatsTab />
      </div>
    </>
  );
};

export default DomainsStatsList;
