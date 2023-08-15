import React from "react";
import { Link } from "react-router-dom";
import { useGetAppsQuery } from "redux/index";
import { toast } from "react-toastify";
import AdminWrapper from "config/AdminWrapper";

import AppList from "components/apps/AppList";
import SearchInputBtn from "components/SearchInputBtn";

import { AiOutlinePlus } from "react-icons/ai";

const Apps = () => {
  const [searchValue, setSearchValue] = React.useState("");
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
          <SearchInputBtn
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={"Enter user name to search..."}
          />
          <AdminWrapper>
            <Link
              to="/apps/clone"
              className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <AiOutlinePlus />
            </Link>
          </AdminWrapper>
        </div>

        <h3 className="h3 mb-5">Applications ({getApps?.length})</h3>
        <AppList
          getApps={getApps}
          loadingApps={loadingApps}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};

export default Apps;
