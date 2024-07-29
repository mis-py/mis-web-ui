import React from "react";

const DomainsStatsTab = () => {
  return (
    <>
      <div className="overflow-x-auto bg-base-300 rounded-box p-3">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date and time</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>saveweb2zip</td>
              <td>
                <div className="badge badge-success">available</div>
              </td>
              <td>2024-07-26 13:50:34</td>
              <td>200 - OK</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DomainsStatsTab;
