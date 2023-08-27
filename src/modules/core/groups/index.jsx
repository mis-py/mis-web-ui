import React from "react";
import { toast } from "react-toastify";

import { useGetGroupsQuery } from "redux/index";
import { deleteMembersAll } from "redux/slices/membersSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import AdminWrapper from "config/AdminWrapper";

import { FiSearch } from "react-icons/fi";

import { AiOutlineUsergroupAdd } from "react-icons/ai";

import GroupListItem from "../../../components/groups/GroupListItem";
import SpinnerLoader from "../../../components/common/SpinnerLoader";

const Groups = () => {
  const dispatch = useDispatch();
  const {
    data: getGroups = [],
    isLoading: loadingGroup,
    error: errorGroup,
  } = useGetGroupsQuery();

  const [serchValue, setSearchValue] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);


  React.useEffect(() => {
    const deleteMembersAndShowError = async () => {
      if (errorGroup) {
        toast.error("Groups not found");
      }
      dispatch(deleteMembersAll());
    };
  
    deleteMembersAndShowError();
  }, [errorGroup, loadingGroup, dispatch]); 
  // React.useEffect(() => {
  //   if (errorGroup) {
  //     toast.error("Groups not found");
  //   }
  //   dispatch(deleteMembersAll());
  // }, [errorGroup, loadingGroup]);

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          {/* <div className="flex flex-auto">
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
                placeholder="Enter group name to search..."
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div> */}
          {/* </div> */}
          <AdminWrapper>
            <Link
              to="/add-group"
              className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <AiOutlineUsergroupAdd />
            </Link>
          </AdminWrapper>
        </div>

        <h3 className="h3 mb-5">Groups ({getGroups?.length})</h3>
        {loadingGroup ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-4">
            {getGroups
              ?.filter((el) =>
                el.name.toLowerCase().includes(serchValue.toLowerCase().trim())
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

export default Groups;
