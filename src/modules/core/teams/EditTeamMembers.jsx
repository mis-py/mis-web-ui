import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditTeamMembersMutation,
  useGetTeamIdQuery,
  useGetUsersQuery
} from "redux/index";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamMembers,
  deleteTeamMembers,
  setTeamMembers,
} from "redux/slices/teamSlice";

import PageHeader from "../../../components/common/PageHeader";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import SpinnerLoader from "../../../components/common/SpinnerLoader";
import { toast } from "react-toastify";

const EditTeamMembers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const members = useSelector((state) => state.team.members);
  const [searchValue, setSearchValue] = React.useState("");
  const { data: getTeamId, isLoading: isTeamDataLoading } = useGetTeamIdQuery(id);
  const { data: getDataUsers, isLoading: loadingDataUsers } =
    useGetUsersQuery();

  const [ editTeamMembers ] = useEditTeamMembersMutation();

  React.useEffect(() => {
    let userIds = [];

    if (!(getTeamId === undefined || getTeamId.users === undefined || getTeamId.users.length === 0)) {
      userIds = getTeamId.users.map(user => user.id);
    }

    dispatch(setTeamMembers(userIds));
  }, [isTeamDataLoading, dispatch, getTeamId]);

  const handleAddMembers = (id) => {
    if (!members.includes(id)) {
      dispatch(addTeamMembers(id));
    } else {
      dispatch(deleteTeamMembers(id));
    }
  };

  const handleEditTeamMembers = async (e) => {
    e.preventDefault();
    if (members) {
      await editTeamMembers({ id, members }).then((data) => {
        if (data.data === undefined || data.data !== true) {
          toast.error("Error on team members updating");
        } else {
          // refetchTeamData().then(() => {
            navigate(`/teams/${id}`);
            toast.success("Team members updating");
          // });
        }
      });
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader
          header="Manage members"
        />
        <div className="mb-1">Search for member</div>
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
        {loadingDataUsers || isTeamDataLoading ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-4 pb-[80px]">
            {getDataUsers
              ?.filter((el) =>
                el.username
                  .toLowerCase()
                  .includes(searchValue.toLowerCase().trim())
              )
              .map((user) =>
                user.team === null || user.team.name === getTeamId.name ? (
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
                              alt={user.username}
                              title={user.username}
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
                ) : (
                  <></>
                )
              )}
          </div>
        )}
      </div>
      <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround w-full lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleEditTeamMembers} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTeamMembers;
