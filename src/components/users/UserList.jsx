import React from "react";
import SpinnerLoader from "components/common/SpinnerLoader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetUser } from "redux/slices/userSlice";

import UserItem from "./UserItem";

const UserList = ({ searchValue, getUsers, loadingGetUser, errorGetUsers, dots, ...props }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = React.useState(false);

  const AdditionalActions = props.additional_actions || (() => <div />);

  React.useEffect(() => {
    dispatch(resetUser());
    if (errorGetUsers) {
      toast.error("No users found");
    }
  }, [errorGetUsers, searchValue, dispatch]);

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
            dots={dots}
            index={index}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            additional_actions={AdditionalActions}
          />
        ))}
    </div>
  );
};

export default UserList;
