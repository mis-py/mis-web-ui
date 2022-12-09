import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPermissionsUserIdQuery,
  useGetUsersQuery,
  useAddGroupMutation,
} from "../../redux";
import {
  addMembers,
  deleteMembers,
  deleteMembersAll,
} from "../../redux/slices/membersSlice";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import UserImg from "../../assets/img/user.png";

const AddGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.membersList.members);
  const {
    data: getUsers,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useGetUsersQuery();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );
  const [addGroup] = useAddGroupMutation();

  const [searchValue, setSearchValue] = React.useState("");
  const [formValue, setFormValue] = React.useState({
    name: "",
    users_ids: [],
  });

  React.useEffect(() => {
    if (getPermissionsUserId && getPermissionsUserId.length === 0) {
      navigate("/groups");
    }
    if (errorUsers) {
      toast.error("No users found");
    }
  }, [errorUsers]);

  const handleAddMembers = (id) => {
    if (!members.includes(id)) {
      dispatch(addMembers(id));
    } else {
      dispatch(deleteMembers(id));
    }
  };

  const handleAddGroup = async (e) => {
    e.preventDefault();
    if (!errorUsers) {
      if (formValue.name < 1) {
        toast.error("Invalid group name");
      } else {
        await addGroup({
          ...formValue,
          users_ids: members,
        }).unwrap();
        navigate("/groups");
        dispatch(deleteMembersAll());
        toast.success("Added new group");
      }
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/groups" onClick={() => dispatch(deleteMembersAll())}>
            back
          </Link>
        </div>
        <h3 className="h3 mt-5">New group</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="name">
            Group name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="name"
              placeholder="Enter a group name"
              autoComplete="off"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>
        </form>

        {loadingUsers ? (
          <h2 className="text-2xl mx-auto">Loading...</h2>
        ) : (
          <div className="flex flex-col gap-4 pb-[80px]">
            <div className="flex flex-col">
              <h3 className="mb-1">Search for member</h3>
              <label
                className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray"
                htmlFor="search"
              >
                <input
                  className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
                  type="search"
                  placeholder="Enter user name to search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <FiSearch className="w-12 text-gray" />
              </label>
            </div>
            {getUsers &&
              getUsers
                .filter((el) =>
                  el.username
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col relative bg-blackSecond px-4 py-[10px] rounded lg:p-6"
                  >
                    <button
                      onClick={() => handleAddMembers(user.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {members.includes(user.id) ? (
                        <AiOutlineCloseCircle className="text-danger text-2xl" />
                      ) : (
                        <AiOutlineCheckCircle className="text-gray text-2xl" />
                      )}
                    </button>
                    <div className="flex justify-between items-center">
                      <div className="lg:flex lg:items-center">
                        <div className="flex flex-col lg:pr-[40px]">
                          <div className="flex items-center gap-4">
                            <img
                              className="w-[56px] h-[56px]"
                              src={UserImg}
                              alt=""
                            />
                            <div className="flex flex-col">
                              <h5 className="text-white mb-[10px]">
                                {user.username}
                              </h5>
                              <h4 className={`text-xs mb-[6px] text-gray`}>
                                Position
                              </h4>
                              <h4 className="text-gray text-xs">
                                Added: 10.10.2000
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleAddGroup} className="btn-primary">
          Add group
        </button>
      </div>
    </div>
  );
};

export default AddGroup;
