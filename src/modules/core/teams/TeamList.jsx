import React from "react";
import { useGetTeamsQuery, useDeleteTeamMutation } from "redux/index";
import ItemsList from "components/ItemsList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { FiEdit, FiXCircle, FiPlus} from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import TeamImg from "assets/img/groups.png";
// import TeamUsersShortList from "components/teams/TeamUsersShortList"
import { resetTeam } from "redux/slices/teamSlice";

const TeamList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
      data: getTeams = [],
      isLoading: loadingGetTeams,
      error: errorGetTeams,
    } = useGetTeamsQuery();

    const searchValue = useSelector((state) => "TeamList" in state.search.searchData ? state.search.searchData["TeamList"] : "");

    React.useEffect(() => {
      dispatch(resetTeam());
    }, [loadingGetTeams, searchValue]);

    const filteredTeams = getTeams.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase().trim())).map((item)=> (
      {
        ...item, 
        primary_name: item.name, 
        secondary_name: "", 
        additional_name: "", 
        avatar: TeamImg
      }
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
    ];
  
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

    const routes = [
      {
        route: '/teams/add',
        icon: <FiPlus />
      }
    ];

    return (
      <>
        <ItemsList 
          routes={routes} 
          pageHeader={["Administration", "Teams"]} 
          getItems={filteredTeams} 
          isLoading={loadingGetTeams} 
          buttonOptions={buttonOptions}
          searchParams={{
            key: "TeamList",
            value: searchValue,
            placeholder: "Enter team name to search...",
            showSearch: false
          }}
        />
      {/* <TeamUsersShortList/> */}
      </>
    );
};

export default TeamList;