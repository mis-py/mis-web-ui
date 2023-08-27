import React from "react";
import { useGetUsersQuery } from "redux/index";
import ItemsList from "components/ItemsList";
import { resetUser } from "redux/slices/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteUserMutation } from "redux/index";
import { FiEdit, FiXCircle} from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
// import { SearchContext } from "context/SearchContext";

const UserList = () => {
    const navigate = useNavigate();

    const {
      data: getUsers = [],
      isLoading: loadingGetUser,
      error: errorGetUsers,
    } = useGetUsersQuery();

    const searchValue = useSelector((state) => "UserList" in state.search.searchData ? state.search.searchData["UserList"] : "");

    // React.useEffect(() => {
    //     dispatch(resetUser());
    //     if (errorGetUsers) {
    //       toast.error("No users found");
    //     }
    //   }, [loadingGetUser, searchValue]);

    const filteredUsers = getUsers.filter((el) => el.username.toLowerCase().includes(searchValue.toLowerCase().trim()))

    const [deleteUser] = useDeleteUserMutation();

    const buttonOptions = [
        {
            title: "Edit",
            callback: (item_id) => navigate(`/users/${ item_id }`),
            icon: <FiEdit />
        },
        {
            title: "Remove",
            callback: (item_id) => handleDeleteUser(item_id),
            icon: <FiXCircle />
        }
    ]
  
    const handleDeleteUser = async (id) => {
      confirmAlert({
        title: "Delete user",
        message: "Are you sure you want to delete this user?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await deleteUser(id);
              navigate("/users");
              toast.success("User deleted");
            },
          },
          {
            label: "No",
          },
        ],
        overlayClassName: "bg-blackSecond/70",
      });
    };

    const routes = ['/users/add'];

    return (
      <ItemsList 
        routes={routes} 
        pageHeader="Users" 
        getItems={filteredUsers} 
        isLoading={loadingGetUser} 
        buttonOptions={buttonOptions} 
        searchParams={ {
          key: "UserList",
          value: searchValue,
          placeholder: "Enter name to search...",
          showSearch: false
        } }
      />
    );
};

export default UserList;