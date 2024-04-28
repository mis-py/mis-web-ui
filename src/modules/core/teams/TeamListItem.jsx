import React from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "components/ListItem";
import { useRemoveTeamMutation } from "redux/index";
import { toast } from "react-toastify";
import { FiEdit, FiXCircle } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";


const TeamListItem = ({item}) => {
    const navigate = useNavigate();

    const [deleteTeam] = useRemoveTeamMutation();

    const handleDeleteTeam = async (id) => {
        confirmAlert({
            title: "Remove team",
            message: "Are you sure you want to remove this team?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                      await deleteTeam(id).then(({data, error}) => {
                        if (error) {
                            toast.error(`Error while remove team: ${error}`)
                        } else {
                            toast.success("Team deleted");
                            navigate("/teams");
                        }
                      });

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
              onClick: (item) => navigate(`/teams/${ item.id }`),
              icon: <FiEdit />
          },
          {
              title: "Remove",
              onClick: (item) => handleDeleteTeam(item.id),
              icon: <FiXCircle />
          }
      ]
    }

    return <ListItem {...itemProps}/>
}

export default TeamListItem;