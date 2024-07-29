import React from "react";

import { FiPlay, FiPause, FiEdit, FiDelete } from "react-icons/fi";

const CurrentDomain = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-10">
        <a
          href="https://saveweb2zip.com/"
          target="_blank"
          className="hover:underline"
        >
          https://saveweb2zip.com/
        </a>
        <div className="badge badge-success">Available</div>
      </div>

      <div className="flex items-center gap-2 mb-10">
        <button className="btn btn-outline btn-xs">
          <FiPlay /> Resume
        </button>
        <button className="btn btn-outline btn-xs">
          <FiPause /> Pause
        </button>
        <button className="btn btn-outline btn-xs">
          <FiEdit /> Edit
        </button>
        <button className="btn btn-outline btn-xs">
          <FiDelete /> Delete
        </button>
      </div>

      <div className="grid grid-cols-3 bg-base-300 rounded-box p-3 gap-3">
        <div className="stat">
          <div className="stat-title">Response</div>
          <div className="stat-value">Curr</div>
          <div className="stat-desc">162 ms</div>
        </div>

        <div className="stat">
          <div className="stat-title">Uptime</div>
          <div className="stat-value">24h</div>
          <div className="stat-desc">100%</div>
        </div>

        <div className="stat">
          <div className="stat-title">Cert Exp.</div>
          <div className="stat-value">89 days</div>
          <div className="stat-desc">(2024-10-25)</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDomain;
