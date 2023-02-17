import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import {
  useGetGroupIdUsersQuery,
  useGetUsersQuery,
  useEditGroupMembersMutation,
} from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { addMembers, deleteMembers } from "../../redux/slices/membersSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import UserImg from "../../assets/img/user.png";

const EditMembersGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const members = useSelector((state) => state.membersList.members);
  const [searchValue, setSearchValue] = React.useState("");
  const { data: getDataUsers, isLoading: loadingDataUsers } =
    useGetUsersQuery();
  const { data: getGroupIdUsers } = useGetGroupIdUsersQuery(id);
  const [editGroupMembers] = useEditGroupMembersMutation();

  React.useEffect(() => {
    if (getGroupIdUsers) {
      getGroupIdUsers.map((user) => dispatch(addMembers(user.id)));
    }
  }, [getGroupIdUsers]);

  const handleAddMembers = (id) => {
    if (!members.includes(id)) {
      dispatch(addMembers(id));
    } else {
      dispatch(deleteMembers(id));
    }
  };

  const handleEditGroupMembers = async (e) => {
    e.preventDefault();
    if (members) {
      await editGroupMembers({ id, rest: members }).unwrap();
    }
    navigate("/groups");
    toast.success("Group members updating");
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray cursor-pointer">
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
              placeholder="Enter user name to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>
        </form>
        {loadingDataUsers ? (
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
          <div className="flex flex-col gap-4 pb-[80px]">
            {getDataUsers &&
              getDataUsers
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
        <button onClick={handleEditGroupMembers} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditMembersGroup;
