import React, { useMemo, useState } from "react";
import { useGetTeamsQuery, filterTeamsByStringSelector } from "redux/index";
import ItemsList from "components/ItemsList";
import { FiPlus} from "react-icons/fi";
import TeamListItem from "./TeamListItem";

const TeamList = () => {
    const [searchValue, setSearchValue] = useState("");

    const teamsSearchRresult = useMemo(filterTeamsByStringSelector, []);

    const { searchFiltered } = useGetTeamsQuery(undefined, {
      selectFromResult: (result) => ({
        ...result,
        searchFiltered: teamsSearchRresult(result, searchValue)
      })
    });
    
    let items = searchFiltered.map((item, index)=> {
      let itemProps = {
        ...item,
        badge: item.id,
        title: item.name,
        paragraphs: [
          `Members: ${item.users.length}`
        ]
      }
      return <TeamListItem key={index} item={itemProps}/>;
    });
  
    let itemsParams = {
      pageHeader: ["Administration", "Teams"],
      searchParams: {
        key: "TeamList",
        value: searchValue,
        placeholder: "Team name...",
        showSearch: false,
        onSearch: setSearchValue
      },
      headerButtons: [
        {
          title: "Add Team",
          route: '/teams/add',
          icon: <FiPlus />
        }
      ],
      items: items
    }

    return <ItemsList {...itemsParams}/>;
};

export default TeamList;