import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineSetting } from "react-icons/ai";
import ListItemWrapper from "../../components/common/ListItemWrapper";
import { CgFileDocument } from "react-icons/cg";
import SpinnerLoader from "../../components/common/SpinnerLoader";

const AppList = ({ getApps, loadingApps, searchValue }) => {
  return loadingApps ? (
    <SpinnerLoader />
  ) : (
    <div className="flex flex-col gap-4">
      {getApps
        ?.filter((el) =>
          el.name.toLowerCase().includes(searchValue.toLowerCase().trim())
        )
        .map((app) => (
          <ListItemWrapper key={app.id}>
            <div className="flex justify-between items-center pb-2 border-b border-backGround">
              <div className="flex">
                <img
                  className="w-[56px] h-[56px] rounded-full mr-3"
                  src={require("assets/img/app.png")}
                  alt={app.name}
                />
                <div className="flex flex-col">
                  <h4>{app.name}</h4>
                  <h5 className="text-gray text-xs">Category</h5>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to={`/apps/logs/${app.id}`}>
                  <CgFileDocument className="text-2xl text-gray cursor-pointer" />
                </Link>

                {(app.is_editable === true ||
                  app.is_editable === undefined) && (
                  <Link to={`/apps/settings/${app.id}`}>
                    <AiOutlineSetting className="text-2xl text-gray cursor-pointer" />
                  </Link>
                )}
              </div>
            </div>

            <div className={`duration-300 flex flex-col pt-4 gap-2`}>
              <div className="flex justify-between">
                <h3>Status:</h3>
                <p className="text-gray">
                  {app.enabled ? "Healthy" : "Unhealthy"}
                </p>
              </div>
              <div className="flex justify-between">
                <h3>Is active:</h3>
                <p
                  className={`${app.enabled ? "text-success" : "text-danger"}`}
                >
                  {app.enabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </ListItemWrapper>
        ))}
    </div>
  );
};

export default AppList;
