import React from "react";
import { toast } from "react-toastify";
import { useGetGroupsQuery } from "redux/index";
import { FiEdit, FiXCircle, FiPlus} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import ItemsList from "components/ItemsList";
import { useDeleteGroupMutation } from "redux/index";
import { useNavigate } from "react-router-dom";
import { resetGroup } from "redux/slices/groupSlice";

const GroupList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data: getGroups = [],
        isLoading: loadingGroup,
        error: errorGroup,
    } = useGetGroupsQuery();

    const searchValue = useSelector((state) => "GroupList" in state.search.searchData ? state.search.searchData["GroupList"] : "");

    React.useEffect(() => {
        dispatch(resetGroup());
      }, [loadingGroup, searchValue]);

    const filteredGroups = getGroups.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase().trim())).map((item)=> (
        {
            ...item,
            title: item.name,
            avatar: require("assets/img/groups.png")
        }
    ));

    const [deleteGroup] = useDeleteGroupMutation();

    const buttonOptions = [
        {
            title: "Edit",
            onClick: (item) => navigate(`/groups/${ item.id }`),
            icon: <FiEdit />
        },
        {
            title: "Remove",
            onClick: (item) => handleDeleteGroup(item.id),
            icon: <FiXCircle />
        }
    ];

    const handleDeleteGroup = async (id) => {
        confirmAlert({
            title: "Delete group",
            message: "Are you sure you want to delete this group?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await deleteGroup(id);
                        navigate("/groups");
                        toast.success("Group deleted");
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
          route: '/groups/add',
          icon: <FiPlus />
        }
      ];

    return (
        <ItemsList 
            routes={routes}
            pageHeader={["Administration", "Groups"]}
            getItems={filteredGroups}
            isLoading={loadingGroup}
            buttonOptions={buttonOptions}
            searchParams={{
                key: "GroupList",
                value: searchValue,
                placeholder: "Enter group name to search...",
                showSearch: false
            }}
        />
    );
    // <div className="py-6">
    //   <div className="flex flex-col">
        // <div className="flex justify-between gap-3 mb-5">
          {/* <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={"Enter group name to search..."}
          /> */}
        //   <AdminWrapper>
        //     <Link
        //       to="/add-group"
        //       className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
        //     >
        //       <AiOutlineUsergroupAdd />
        //     </Link>
        //   </AdminWrapper>
        // </div>

        // <h3 className="h3 mb-5">Groups ({getGroups?.length})</h3>
        {/* <GroupList
          getGroups={getGroups}
          loadingGroup={loadingGroup}
          searchValue={searchValue}
        /> */}
    //   </div>
    // </div>
//   );
};

export default GroupList;
