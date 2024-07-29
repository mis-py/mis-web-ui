import React from "react";

const DomainsList = ({ setDomainTab }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Status</th>
              <th>Domain</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="badge badge-success">100%</div>
                </div>
              </td>
              <td>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => setDomainTab("Current domain")}
                >
                  https://saveweb2zip.com
                </span>
              </td>
              <td>
                <progress
                  className="progress progress-success w-56"
                  value="100"
                  max="100"
                ></progress>
              </td>
            </tr>

            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="badge badge-warning">50%</div>
                </div>
              </td>
              <td>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => setDomainTab("Current domain")}
                >
                  https://daisyui.com/
                </span>
              </td>
              <td>
                <progress
                  className="progress progress-warning w-56"
                  value="50"
                  max="100"
                ></progress>
              </td>
            </tr>

            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="badge badge-error">0%</div>
                </div>
              </td>
              <td>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => setDomainTab("Current domain")}
                >
                  https://demo.kuma.pet/
                </span>
              </td>
              <td>
                <progress
                  className="progress progress-error w-56"
                  value="10"
                  max="100"
                ></progress>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DomainsList;
