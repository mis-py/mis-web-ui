import React from "react";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { confirmAlert } from "react-confirm-alert";
import { useGetGroupsQuery, useDeleteGroupMutation } from "redux/index";
import { deleteMembersAll } from "redux/slices/membersSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useOutsideClick from "hooks/useOutsideClick";

import Tooltip from "components/Tooltip";
import AdminWrapper from "config/AdminWrapper";

import { FiSearch } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ListItemWrapper from "../../components/common/ListItemWrapper";

const Groups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: getGroups = [],
    isLoading: loadingGroup,
    error: errorGroup,
  } = useGetGroupsQuery();
  const [deleteGroup] = useDeleteGroupMutation();

  const [serchValue, setSearchValue] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  React.useEffect(() => {
    if (errorGroup) {
      toast.error("Groups not found");
    }
    dispatch(deleteMembersAll());
  }, [errorGroup, loadingGroup]);

  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(false);
      return;
    }
    setShowEdit(index);
  };

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

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex flex-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch
                  ? "rounded-l-lg text-primary"
                  : "rounded-lg text-gray"
              } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
            >
              <FiSearch />
            </button>
            <div className="relative h-[32px] w-full duration-300">
              <input
                className={`${
                  showSearch ? "w-full px-3" : "w-0 px-0"
                } bg-blackSecond h-full text-xs text-gray border-none placeholder:text-gray duration-300 rounded-r w-full focus:shadow-none focus:ring-0`}
                type="search"
                placeholder="Enter team name to search..."
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <AdminWrapper>
            <Link
              to="/add-group"
              className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <AiOutlineUsergroupAdd />
            </Link>
          </AdminWrapper>
        </div>

        <h3 className="h3 mb-5">Groups ({getGroups?.length})</h3>
        {loadingGroup ? (
          <PulseLoader
            size={15}
            cssOverride={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            color="#757575"
          />
        ) : (
          <div className="flex flex-col gap-4">
            {getGroups
              ?.filter((el) =>
                el.name.toLowerCase().includes(serchValue.toLowerCase().trim())
              )
              .map((group, index) => (
                  <ListItemWrapper key={group.id} className="lg:pt-6 lg:px-6">
                    <div
                        ref={refPopup}
                        className={`${
                            showEdit === index
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                        } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
                    >
                      <div
                          onClick={() => navigate(`/group/members/${group.id}`)}
                          className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Manage members
                      </div>

                      <div
                          onClick={() => navigate(`/group/objects/${group.id}`)}
                          className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Manage objects
                      </div>

                      <div
                          onClick={() => handleDeleteGroup(group.id)}
                          className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Remove
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-backGround">
                      <div className="flex items-center gap-4">
                        <img
                            className="w-[56px] h-[56px]"
                            src={require("assets/img/groups.png")}
                            alt=""
                        />
                        <div className="flex flex-col">
                          <h5 className="text-gray text-xs">
                            Name of the department:
                          </h5>
                          <h4>{group.name}</h4>
                        </div>
                      </div>
                      <AdminWrapper>
                        <BiDotsVerticalRounded
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleEdit(index);
                            }}
                            className="text-3xl text-gray cursor-pointer"
                        />
                      </AdminWrapper>
                    </div>
                    <div className={`duration-300 flex flex-col pt-4`}>
                      <p className="pb-4">Members of the department:</p>
                      <div className="flex pl-1">
                        {group.users.length ? (
                            group.users.map((item) => (
                                <div
                                    key={item.id}
                                    className="group cursor-pointer shadow -ml-1 relative"
                                >
                                  <img
                                      className="w-[35px] h-[35px]"
                                      src={require("assets/img/user.png")}
                                      alt=""
                                  />
                                  <Tooltip name={item.username} />
                                </div>
                            ))
                        ) : (
                            <p className="text-danger">NO USERS</p>
                        )}
                      </div>
                    </div>
                  </ListItemWrapper>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
