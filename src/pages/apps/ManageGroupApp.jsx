import React from "react";
import { useGetGroupsQuery, useGetAppByIdQuery } from "../../redux";
import { toast } from "react-toastify";
import { firstUppercase } from "config/functions";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import GroupListItem from "../../components/groups/GroupListItem";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import PageHeader from "../../components/common/PageHeader";

const ManageGroupApp = () => {
  const {id} = useParams();
  const {
    data: getGroups = [],
    isLoading: loadingGroups,
    error: errorGroups,
  } = useGetGroupsQuery({ app_id: id });
  const { data: applicationData, isLoading: isAppDataLoading } =
    useGetAppByIdQuery(id);
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
          header={`${
            !isAppDataLoading && firstUppercase(applicationData.name)
          } group list`}
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
    </div>
  );
};

export default ManageGroupApp;
