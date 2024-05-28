import React from "react";
import { useRemoveUserMutation } from "redux/api/usersApi";
import { toast } from "react-toastify";
import { FiEdit, FiXCircle} from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import ListItem from "components/ListItem";


const UserListItem = ({item}) => {
    const navigate = useNavigate();

    const [deleteUser] = useRemoveUserMutation();

    const handleDeleteUser = async (id) => {
        confirmAlert({
          title: "Delete user",
          message: "Are you sure you want to delete this user?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                await deleteUser({ user_id: id });
                // navigate("/users");
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

    let itemProps = {
        item: item,
        buttonOptions: [
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
    }

    return <ListItem {...itemProps}/>
}

export default UserListItem;