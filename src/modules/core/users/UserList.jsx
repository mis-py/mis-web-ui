import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "redux/index";
import ItemsList from "components/ItemsList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiEdit, FiXCircle, FiPlus} from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import UserImg from "assets/img/user.png";
import { resetUser } from "redux/slices/userSlice";

const UserList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
      data: getUsers = [],
      isLoading: loadingUser,
      error: errorGetUsers,
    } = useGetUsersQuery();

    const searchValue = useSelector((state) => "UserList" in state.search.searchData ? state.search.searchData["UserList"] : "");

    React.useEffect(() => {
        dispatch(resetUser());
      }, [loadingUser, searchValue]);

    const filteredUsers = getUsers.filter((el) => el.username.toLowerCase().includes(searchValue.toLowerCase().trim())).map((item)=> (
      {
        ...item,
        title: item.username,
        paragraphs: [
          item.team === null ? "Team: -" : "Team: " + item.team.name,
          item.position === null ? "Position: -" : "Position: " + item.position
        ],
        avatar: UserImg
      }
    ))

    const [deleteUser] = useDeleteUserMutation();

    const buttonOptions = [
        {
            title: "Edit",
            onClick: (item) => navigate(`/users/${ item.id }`),
            icon: <FiEdit />
        },
        {
            title: "Remove",
            onClick: (item) => handleDeleteUser(item.id),
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

    const routes = [
      {
        route: '/users/add',
        icon: <FiPlus />
      }
    ];

    return (
      <ItemsList 
        routes={routes} 
        pageHeader={["Administration", "Users"]}
        getItems={filteredUsers} 
        isLoading={loadingUser} 
        buttonOptions={buttonOptions}
        searchParams={{
          key: "UserList",
          value: searchValue,
          placeholder: "Enter name to search...",
          showSearch: false
        }}
      />
    );
};

export default UserList;