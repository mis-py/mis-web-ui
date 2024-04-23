import React, { useMemo, useState } from "react";
import { useGetUsersQuery, useRemoveUserMutation, filterUsersByStringSelector } from "redux/api/usersApi";
import ItemsList from "components/ItemsList";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FiEdit, FiXCircle, FiPlus} from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import UserImg from "assets/img/user.png";
import { resetUser } from "redux/slices/userSlice";
import ListItem from "components/ListItem";

const UserList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");

    const [deleteUser] = useRemoveUserMutation();

    const usersSearchRresult = useMemo(filterUsersByStringSelector, []);

    const {
      data,
      isLoading,
      isSuccess,
      error,
      searchFiltered,
    } = useGetUsersQuery(undefined, {
      selectFromResult: (result) => ({
        ...result,
        searchFiltered: usersSearchRresult(result, searchValue)
      })
    });

    React.useEffect(() => {
      dispatch(resetUser());
    }, [isLoading, searchValue]);

    let users = searchFiltered.map((item)=> {
      return {
        ...item,
        title: item.username,
        paragraphs: [
          item.team === null ? "Team: -" : "Team: " + item.team.name,
          item.position === null ? "Position: -" : "Position: " + item.position
        ],
        avatar: UserImg
      }
    });
  
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

    return (
      <ItemsList 
        routes={[]} 
        pageHeader={["Administration", "Users"]}
        getItems={users} 
        isLoading={isLoading} 
        buttonOptions={[]}
        searchParams={{
          key: "UserList",
          value: searchValue,
          placeholder: "Username...",
          showSearch: false,
          onSearch: setSearchValue
        }}
        headerButtons={[
          {
            title: "Add user",
            route: '/users/add',
            icon: <FiPlus />
          }
        ]}
        items={
          users.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              buttonOptions={[
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
              ]}
            />
          ))
        }
      />
    );
};

export default UserList;