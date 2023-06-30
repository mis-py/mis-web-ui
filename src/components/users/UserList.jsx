import React from "react";
import SpinnerLoader from "components/common/SpinnerLoader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetUser } from "redux/slices/userSlice";

import UserItem from "./UserItem";

const UserList = ({ searchValue, getUsers, loadingGetUser, errorGetUsers }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = React.useState(false);

  React.useEffect(() => {
    dispatch(resetUser());
    if (errorGetUsers) {
      toast.error("No users found");
    }
  }, [errorGetUsers, searchValue]);

  return loadingGetUser ? (
    <SpinnerLoader />
  ) : (
    <div className="flex flex-col gap-4">
      {getUsers
        ?.filter((el) =>
          el.username.toLowerCase().includes(searchValue.toLowerCase().trim())
        )
        .map((user, index) => (
          <UserItem
            key={user.id}
            user={user}
            index={index}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
          />
        ))}
    </div>
  );
};

export default UserList;
