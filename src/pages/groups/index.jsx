import React from "react";
import { toast } from "react-toastify";
import { useGetGroupsQuery } from "redux/index";
import { deleteMembersAll } from "redux/slices/membersSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminWrapper from "config/AdminWrapper";

import GroupList from "components/groups/GroupList";
import SearchInputBtn from "components/SearchInputBtn";

import { AiOutlineUsergroupAdd } from "react-icons/ai";

const Groups = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState("");
  const {
    data: getGroups = [],
    isLoading: loadingGroup,
    error: errorGroup,
  } = useGetGroupsQuery();

  React.useEffect(() => {
    const deleteMembersAndShowError = async () => {
      if (errorGroup) {
        toast.error("Groups not found");
      }
      dispatch(deleteMembersAll());
    };

    deleteMembersAndShowError();
  }, [errorGroup, loadingGroup, dispatch]);

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <SearchInputBtn
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={"Enter group name to search..."}
          />
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
        <GroupList
          getGroups={getGroups}
          loadingGroup={loadingGroup}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};

export default Groups;
