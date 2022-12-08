import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetGroupsQuery, useGetPermissionsUserIdQuery } from "../../redux";
import { toast } from "react-toastify";
import useOutsideClick from "../../hooks/useOutsideClick";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";

import UserImg from "../../assets/img/user.png";

const ManageGroupApp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: getGroups = [],
    isLoading: loadingGroups,
    error: errorGroups,
  } = useGetGroupsQuery();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [showEdit, setShowEdit] = React.useState(false);

  React.useEffect(() => {
    if (errorGroups) {
      toast.error("Groups not found");
    }
  }, [errorGroups]);

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(false);
      return;
    }
    setShowEdit(index);
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
        <h3 className="h3 mt-5 mb-6">Manage groups</h3>
        <h3 className="mb-1">Search for groups</h3>
        <form>
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Enter group name to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>
        </form>
        {loadingGroups ? (
          <h2 className="text-2xl mx-auto">Loading...</h2>
        ) : (
          <div className="flex flex-col gap-4 pb-[80px]">
            {getGroups &&
              getGroups
                .filter((el) =>
                  el.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
                .map((group, index) => (
                  <div
                    key={group.id}
                    className="flex flex-col relative bg-blackSecond px-4 py-[10px] rounded lg:p-6"
                  >
                    <div
                      ref={refPopup}
                      className={`${
                        showEdit === index
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
                    >
                      <div
                        onClick={() =>
                          navigate(`/apps/settings/manage/members/${id}`)
                        }
                        className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Manage members
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/apps/settings/manage/objects/${id}`)
                        }
                        className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                      >
                        Manage objects
                      </div>
                      <div className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary">
                        Remove
                      </div>
                    </div>
                    {getPermissionsUserId &&
                    getPermissionsUserId.length !== 0 ? (
                      <button className="absolute right-3 top-1/2 -translate-y-1/2">
                        <BiDotsVerticalRounded
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEdit(index);
                          }}
                          className="text-3xl text-gray cursor-pointer"
                        />
                      </button>
                    ) : (
                      false
                    )}
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
                                {group.name}
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

export default ManageGroupApp;
