import React from "react";
import { Link } from "react-router-dom";
import { useGetAppsQuery } from "redux/index";
import { toast } from "react-toastify";

import AdminWrapper from "config/AdminWrapper";

import { FiSearch } from "react-icons/fi";
import ListItemWrapper from "components/common/ListItemWrapper";
import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import SpinnerLoader from "components/common/SpinnerLoader";
import InstallLogs from "components/logs/InstallLogs";

const Apps = () => {

  const [showSearch, setShowSearch] = React.useState(false);
  const [serchValue, setSearchValue] = React.useState("");
  const {
    data: getApps = [],
    isLoading: loadingApps,
    error: errorApps,
    refetch,
  } = useGetAppsQuery();

  React.useEffect(() => {
    if (errorApps) {
      toast.error("No apps found");
    }
    refetch();
  }, [errorApps, refetch]);

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex flex-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch
                  ? "rounded-l-lg text-primary"
                  : "rounded-l-lg text-gray"
              } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
            >
              <FiSearch />
            </button>
            <div className="relative h-[32px] w-full duration-300">
              <input
                className={`${
                  showSearch ? "w-full px-3" : "w-0 px-0"
                } bg-blackSecond h-full text-xs text-gray border-none placeholder:text-gray duration-300 rounded-r w-full focus:shadow-none focus:ring-0`}
                type="search"
                placeholder="Enter user name to search..."
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <AdminWrapper>
            <InstallLogs
              className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <AiOutlinePlus />
            </InstallLogs>
          </AdminWrapper>
        </div>

        <h3 className="h3 mb-5">Applications ({getApps?.length})</h3>
        {loadingApps ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-4">
            {getApps
              ?.filter((el) =>
                el.name.toLowerCase().includes(serchValue.toLowerCase().trim())
              )
              .map((app, index) => (
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
                          <CgFileDocument
                              className="text-2xl text-gray cursor-pointer"
                          />
                        </Link>

                        {(app.is_editable === true || app.is_editable === undefined) &&
                          <Link to={`/apps/settings/${app.id}`}>
                            <AiOutlineSetting
                                className="text-2xl text-gray cursor-pointer"
                            />
                          </Link>
                        }
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
                            className={`${
                                app.enabled ? "text-success" : "text-danger"
                            }`}
                        >
                          {app.enabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                  </ListItemWrapper>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apps;
