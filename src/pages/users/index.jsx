import React from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "redux/index";

import AdminWrapper from "config/AdminWrapper";
import SearchInputBtn from "components/SearchInputBtn";
import UserList from "components/users/UserList";
import PageHeader from "../../components/common/PageHeader";

import "react-confirm-alert/src/react-confirm-alert.css";

import { FiUserPlus } from "react-icons/fi";

const Users = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const {
    data: getUsers = [],
    isLoading: loadingGetUser,
    error: errorGetUsers,
  } = useGetUsersQuery();

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          {/* <SearchInputBtn
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            placeholder={"Enter user name to search..."}
          /> */}
          <AdminWrapper>
            <Link
              to="/add-user"
              className="px-3 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <FiUserPlus />
            </Link>
          </AdminWrapper>
        </div>

        <PageHeader
          header={`Users (${getUsers?.length})`}
          showBack={false}
        />

        <UserList
          searchValue={searchValue}
          getUsers={getUsers}
          loadingGetUser={loadingGetUser}
          errorGetUsers={errorGetUsers}
          dots={true}
        />
      </div>
    </div>
  );
};

export default Users;
