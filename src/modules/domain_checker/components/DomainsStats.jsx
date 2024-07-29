import React from "react";

const DomainsStats = () => {
  return (
    <div className="grid grid-cols-3 bg-base-300 rounded-box p-3 gap-3">
      <div className="stats shadow">
        <div className="stat">
          <div className="text-xl">Up</div>
          <div className="stat-value text-success">1</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="text-xl">Down</div>
          <div className="stat-value text-error">1</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="text-xl">Pause</div>
          <div className="stat-value">0</div>
        </div>
      </div>
    </div>
  );
};

export default DomainsStats;
