import React, { useMemo, useState } from "react";
import { useGetTeamsQuery, useRemoveTeamMutation, filterTeamsByStringSelector } from "redux/index";
import ItemsList from "components/ItemsList";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import { FiEdit, FiXCircle, FiPlus} from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import TeamImg from "assets/img/groups.png";
// import TeamUsersShortList from "components/teams/TeamUsersShortList"
import { resetTeam } from "redux/slices/teamSlice";
import ListItem from "components/ListItem";

const TeamList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");

    const [deleteTeam] = useRemoveTeamMutation();

    const teamsSearchRresult = useMemo(filterTeamsByStringSelector, []);

    const {
      data,
      isLoading,
      isSuccess,
      error,
      searchFiltered,
    } = useGetTeamsQuery(undefined, {
      selectFromResult: (result) => ({
        ...result,
        searchFiltered: teamsSearchRresult(result, searchValue)
      })
    });

    React.useEffect(() => {
      dispatch(resetTeam());
    }, [isLoading, searchValue]);
    
    let teams = searchFiltered.map((item)=> {
      return {
        ...item, 
        title: item.name,
        avatar: TeamImg
      }
    });
  
    const handleDeleteTeam = async (id) => {
        confirmAlert({
            title: "Delete team",
            message: "Are you sure you want to delete this team?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                      await deleteTeam(id);
                      navigate("/teams");
                      toast.success("Team deleted");
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
      <>
        <ItemsList 
          routes={[]} 
          pageHeader={["Administration", "Teams"]} 
          getItems={[]} 
          isLoading={isLoading} 
          buttonOptions={[]}
          searchParams={{
            key: "TeamList",
            value: searchValue,
            placeholder: "Team name...",
            showSearch: false,
            onSearch: setSearchValue
          }}
          headerButtons={
            [
              {
                title: "Add Team",
                route: '/teams/add',
                icon: <FiPlus />
              }
            ]
          }
          items={
            teams.map((item, index) => (
              <ListItem
                key={index}
                item={item}
                buttonOptions={[
                  {
                      title: "Edit",
                      onClick: (item) => navigate(`/teams/${ item.id }`),
                      icon: <FiEdit />
                  },
                  {
                      title: "Remove",
                      onClick: (item) => handleDeleteTeam(item.id),
                      icon: <FiXCircle />
                  }
              ]}
              />
            ))
          }
        />
      {/* <TeamUsersShortList/> */}
      </>
    );
};

export default TeamList;