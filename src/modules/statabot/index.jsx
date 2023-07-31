import React from "react";
import { useGetUsersQuery } from "redux/index";
import UserList from "components/users/UserList";
import UserStatabotStatus from "./UserStatabotStatus";

const Statabot = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const {
    data: getUsers = [],
    isLoading: loadingGetUser,
    error: errorGetUsers,
  } = useGetUsersQuery();

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <h3 className="h3 mb-5">Statabot ({getUsers?.length})</h3>
        <UserList
          searchValue={searchValue}
          getUsers={getUsers}
          loadingGetUser={loadingGetUser}
          errorGetUsers={errorGetUsers}
          dots={false}
          additional_actions={UserStatabotStatus}
        />
      </div>
    </div>
  );
};

export default Statabot;
