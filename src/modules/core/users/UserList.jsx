import React, { useMemo, useState } from "react";
import { useGetUsersQuery, filterUsersByStringSelector } from "redux/api/usersApi";
import ItemsList from "components/ItemsList";
import { FiPlus } from "react-icons/fi";
import UserListItem from "./UserListItem";

const UserList = () => {
    const [searchValue, setSearchValue] = useState("");

    const usersSearchRresult = useMemo(filterUsersByStringSelector, []);

    const { searchFiltered } = useGetUsersQuery(undefined, {
      selectFromResult: (result) => ({
        ...result,
        searchFiltered: usersSearchRresult(result, searchValue)
      })
    });

    let items = searchFiltered.map((item, index)=> {
      let itemProps = {
        ...item,
        badge: item.id,
        title: item.username,
        paragraphs: [
          item.team === null ? "Team: -" : "Team: " + item.team.name,
          item.position === null ? "Position: -" : "Position: " + item.position,
          `Active: ${!item.disabled}`
        ]
      }
      return <UserListItem key={index} item={itemProps}/>
    });
  
    let itemsProps = {
      pageHeader: ["Administration", "Users"],
      items: items,
      searchParams: {
        key: "UserList",
        value: searchValue,
        placeholder: "Username...",
        showSearch: false,
        onSearch: setSearchValue
      },
      headerButtons: [
        {
          title: "Add user",
          route: '/users/add',
          icon: <FiPlus />
        }
      ]
    }

    return <ItemsList {...itemsProps}/>;
};

export default UserList;