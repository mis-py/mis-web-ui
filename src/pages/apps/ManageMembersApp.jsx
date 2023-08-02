import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTeamIdQuery, useGetUsersQuery } from "../../redux";
import { useDispatch, useSelector } from "react-redux";

import {
  addMembers,
  deleteMembers,
} from "../../redux/slices/editTeamMembersSlice";

import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import UserImg from "../../assets/img/user.png";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import PageHeader from "../../components/common/PageHeader";

const ManageMembersApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  let containerWidth = React.useRef();
  const members = useSelector((state) => state.editTeamMembers.members);
  const [btnWidth, setBtnWidth] = React.useState(985);
  const [searchValue, setSearchValue] = React.useState("");
  const [ setChecked] = React.useState([]);
  const { data: getDataTeamId } = useGetTeamIdQuery(id);
  const { data: getDataUsers, isLoading: loadingDataUsers } =
    useGetUsersQuery();

  const handleAddMembers = (id) => {
    if (!members.includes(id)) {
      dispatch(addMembers(id));
    } else {
      dispatch(deleteMembers(id));
    }
  };

  React.useEffect(() => {
    if (getDataTeamId && getDataTeamId.users.length) {
      setChecked(getDataTeamId.users.map((user) => user.id));
    } else {
      setChecked(false);
    }
    setBtnWidth(containerWidth.current.clientWidth);
  }, [getDataTeamId, containerWidth, btnWidth, setChecked]);

  return (
    <div
      ref={containerWidth}
      className="py-6 min-h-screen h-full flex flex-col justify-between"
    >
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
            {getDataUsers &&
              getDataUsers
                .filter((el) =>
                  el.username
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
                .map((user) =>
                  user.team === null
                  || user.team === undefined
                  || user.team.name === getDataTeamId.name
                      ? (
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
                    ""
                  )
                )}
          </div>
        )}
      </div>
      <div
        className={`flex fixed w-full h-[80px] bottom-0 bg-backGround lg:w-[985px] lg:max-w-[-webkit-fill-available]`}
      >
        <button
          onClick={() => navigate(-1)}
          className={`btn-primary absolute z-20 left-0 bottom-6 w-[calc(100%_-_40px)] lg:w-full`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ManageMembersApp;
