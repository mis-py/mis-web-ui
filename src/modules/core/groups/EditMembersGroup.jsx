import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetGroupIdUsersQuery,
  useGetUsersQuery,
  useEditGroupMembersMutation,
} from "redux/index";
import { useDispatch, useSelector } from "react-redux";
import { addMembers, deleteMembers, setMembers } from "redux/slices/membersSlice";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import SpinnerLoader from "../../../components/common/SpinnerLoader";
import PageHeader from "../../../components/common/PageHeader";
import AvatarUser from "components/users/AvatarUser";

const EditMembersGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const members = useSelector((state) => state.membersList.members);
  const [searchValue, setSearchValue] = React.useState("");
  const { data: getDataUsers, isLoading: loadingDataUsers } =
    useGetUsersQuery();
  const { data: getGroupIdUsers, refetch: refetchMembers, isLoading: isGroupIdUsersLoading } = useGetGroupIdUsersQuery(id);
  const [editGroupMembers] = useEditGroupMembersMutation();

  React.useEffect(() => {
    if (getGroupIdUsers) {
      dispatch(setMembers(getGroupIdUsers.map((user) => user.id)));
    }
  }, [isGroupIdUsersLoading, getGroupIdUsers, dispatch]);

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
      await editGroupMembers({ id, rest: members }).then(() => {
        refetchMembers().then(() => {
          navigate("/groups");
          toast.success("Group members updating");
        });
      });
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
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
        {loadingDataUsers ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-4 pb-[80px]">
            {getDataUsers
              ?.filter((el) =>
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
                          <AvatarUser
                            width={56}
                            height={56}
                            icon={false}
                            userData={user}
                          />
                          <div className="flex flex-col">
                            <div className="text-white mb-[10px]">
                              {user.username}
                            </div>
                            <div className={`text-xs mb-[6px] text-gray`}>
                              {user.position === null
                                ? "Position name none"
                                : user.position}
                            </div>
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
      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround w-full lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleEditGroupMembers} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditMembersGroup;
