import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useGetUsersQuery } from "redux/index";
import { useDispatch, useSelector } from "react-redux";
import { addTeamMembers, deleteTeamMembers } from "redux/slices/teamSlice";

import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import PageHeader from "../../components/common/PageHeader";

const AddTeamMembers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.team.members);
  const { data: getUsers = [], isLoading: loadingUsers } = useGetUsersQuery();

  const [searchValue, setSearchValue] = React.useState("");

  const [filteredUsers, setFilteredUsers] = React.useState([]);

  React.useEffect(() => {
    setFilteredUsers(getUsers
        ?.filter((el) =>
            el.username
                .toLowerCase()
                .includes(searchValue.toLowerCase().trim())
            && el.team === null
        ))
  }, [searchValue, loadingUsers, getUsers]);

  const handleAddMembers = (id) => {
    if (!members.includes(id)) {
      dispatch(addTeamMembers(id));
    } else {
      dispatch(deleteTeamMembers(id));
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between relative">
      <div className="flex flex-col">
        <PageHeader
          header="Manage members"
        />
        <h3 className="mb-1">Search for member</h3>
        <form>
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
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
        </form>
        {loadingUsers ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-4 pb-[80px]">
            {filteredUsers.length ? filteredUsers.map((user) => (
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
                            src={require("assets/img/user.png")}
                            alt=""
                          />
                          <div className="flex flex-col">
                            <div className="text-white mb-[10px]">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <h2>No users without teams</h2>
            )}
          </div>
        )}
      </div>
      <div className="flex fixed w-full pb-5 bottom-0 left-0 bg-transparent lg:absolute">
        <button
          onClick={() => {
            navigate(-1);
            toast.success("Team members saved");
          }}
          className="btn-primary z-20 h-auto w-full left-0 bottom-6 right-0"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTeamMembers;
