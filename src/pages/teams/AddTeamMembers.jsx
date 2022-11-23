import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import {
  addMembers,
  deleteMembers,
} from "../../redux/slices/addTeamMembersSlice";
// import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import UserImg from "../../assets/img/user.png";

const AddTeamMembers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.addTeamMembers.members);
  const [searchValue, setSearchValue] = React.useState("");
  const { data: getDataUsers, isLoading: loadingDataUsers } =
    useGetUsersQuery();

  const handleAddMembers = (id) => {
    if (!members.includes(id)) {
      dispatch(addMembers(id));
    } else {
      dispatch(deleteMembers(id));
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <div onClick={() => navigate(-1)}>back</div>
        </div>
        <h3 className="h3 mt-5 mb-6">Manage members</h3>
        <h3 className="mb-1">Search for member</h3>
        <form>
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>
        </form>
        {loadingDataUsers ? (
          <h2 className="text-2xl mx-auto">Loading...</h2>
        ) : (
          <div className="flex flex-col gap-4 pb-[80px]">
            {getDataUsers &&
              getDataUsers
                .filter((el) =>
                  el.username
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
                .filter((noteam) => noteam.team === null)
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
                    <div className="flex justify-between items-center lg:border-none lg:pb-0">
                      <div className="lg:flex lg:items-center">
                        <div className="flex flex-col lg:pr-[40px] lg:border-r lg:border-gray">
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
      <div className="flex fixed w-full h-[80px] bottom-0 bg-backGround">
        <button
          onClick={() => navigate(-1)}
          className="btn-primary absolute z-20 left-0 bottom-6 w-[calc(100%_-_40px)]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTeamMembers;
