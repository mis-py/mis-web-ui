import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGroupsQuery } from "../../redux";
import { toast } from "react-toastify";

import { FiSearch } from "react-icons/fi";

import GroupListItem from "../../components/groups/GroupListItem";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import PageHeader from "../../components/common/PageHeader";

const ManageGroupApp = () => {
  const params = useParams();
  const navigate = useNavigate();

  console.log(params);

  const {
    data: getGroups = [],
    isLoading: loadingGroups,
    error: errorGroups,
  } = useGetGroupsQuery();

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    if (errorGroups) {
      toast.error("Groups not found");
    }
  }, [errorGroups]);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader
          header="Manage groups"
        />
        <h3 className="mb-1">Search for groups</h3>
        <form>
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Enter group name to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>
        </form>
        {loadingGroups ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-4 pb-[80px]">
            {getGroups &&
              getGroups
                .filter((el) =>
                  el.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
                .map((group, index) => (
                    <GroupListItem
                        key={group.id}
                        group={group}
                        index={index}
                    />
                ))}
          </div>
        )}
      </div>
      <div
        className={`flex fixed w-full h-[80px] bottom-0 bg-backGround lg:w-[985px] lg:max-w-[-webkit-fill-available]`}
      >
        <button
          onClick={() => navigate(-1)}
          className={`btn-primary absolute z-20 left-0 bottom-6 w-[calc(100%_-_40px)] lg:w-full`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ManageGroupApp;
