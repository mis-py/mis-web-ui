import React from "react";
import { useGetTeamsQuery, useDeleteTeamMutation } from "redux/index";
import ItemsList from "components/ItemsList";
// import { resetUser } from "redux/slices/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import { FiEdit, FiXCircle} from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import TeamUsersShortList from "components/teams/TeamUsersShortList"
// import { SearchContext } from "context/SearchContext";

import TeamImg from "assets/img/groups.png";

const TeamList = () => {
    const navigate = useNavigate();

    const {
      data: getTeams = [],
      isLoading: loadingGetTeams,
      // error: errorGetUsers,
    } = useGetTeamsQuery();

    const searchValue = useSelector((state) => "TeamList" in state.search.searchData ? state.search.searchData["TeamList"] : "");

    // React.useEffect(() => {
    //     dispatch(resetUser());
    //     if (errorGetUsers) {
    //       toast.error("No users found");
    //     }
    //   }, [loadingGetUser, searchValue]);

    const filteredTeams = getTeams.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase().trim())).map((item)=> (
      {...item, primary_name: item.name, secondary_name: "", additional_name: "", avatar: TeamImg}
    ));

    const [deleteTeam] = useDeleteTeamMutation();

    const buttonOptions = [
        {
            title: "Edit",
            callback: (item_id) => navigate(`/teams/${ item_id }`),
            icon: <FiEdit />
        },
        {
            title: "Remove",
            callback: (item_id) => handleDeleteTeam(item_id),
            icon: <FiXCircle />
        }
    ]
  
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

    const routes = ['/teams/add'];

    return (
      <>
      <ItemsList 
        routes={routes} 
        pageHeader="Teams" 
        getItems={filteredTeams} 
        isLoading={loadingGetTeams} 
        buttonOptions={buttonOptions}
        primary_name="username"
        secondary_name="team"
        searchParams={ {
          key: "UserList",
          value: searchValue,
          placeholder: "Enter name to search...",
          showSearch: false
        } }
      />
      <TeamUsersShortList/>
      </>
    );
};

export default TeamList;