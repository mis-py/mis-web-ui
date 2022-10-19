import React from "react";
import { toast } from "react-toastify";
import { useGetAppsQuery } from "../../redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FiSearch } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import UserImg from "../../assets/img/user.png";
import StarImg from "../../assets/img/star.png";

const Applications = () => {
  const { data: getApps = [], error: errorGetApps } = useGetAppsQuery();

  const [showSearch, setShowSearch] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  React.useEffect(() => {
    if (errorGetApps) {
      toast.error("🦄 Wow so easy!");
    }
  }, [errorGetApps]);

  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(null);
      return;
    }
    setShowEdit(index);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex flex-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch ? "rounded-l-lg" : "rounded-lg"
              } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
            >
              <FiSearch />
            </button>
            <input
              className={`${
                showSearch ? "w-1/2 px-3 lg:w-1/3" : "w-0 px-0"
              } bg-[#3F3F3F] absolute h-[32px] ml-[40px] duration-300 rounded-r focus-visible:outline-none focus:outline-none`}
              type="text"
            />
          </div>
          <div className="flex gap-5">
            <div className="flex items-center text-gray gap-2 cursor-pointer">
              <p>Sort by</p>
              <IoIosArrowDown className="mt-1" />
            </div>
            <div className="flex items-center text-gray gap-2 cursor-pointer">
              <p>Categories</p>
              <IoIosArrowDown className="mt-1" />
            </div>
          </div>
        </div>

        <h3 className="h3 mb-5">Using applications ({getApps.length})</h3>
        <div className="flex flex-col gap-4">
          {getApps &&
            getApps.map((app, index) => (
              <div
                key={app.id}
                className="flex flex-col relative bg-blackSecond px-4 py-2 rounded lg:p-6"
              >
                <div
                  ref={refPopup}
                  className={`${
                    showEdit === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-16`}
                >
                  <div className="px-5 py-1 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary">
                    Settings
                  </div>
                  <div className="px-5 py-1 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary">
                    Remove
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray/30">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <img className="w-[32px] h-[32px]" src={UserImg} alt="" />
                      <div className="flex flex-col">
                        <h5 className="text-gray text-xs">
                          The name of the application:
                        </h5>
                        <h4>{app.name}</h4>
                      </div>
                    </div>
                  </div>
                  <BiDotsVerticalRounded
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEdit(index);
                    }}
                    className="text-3xl text-gray cursor-pointer"
                  />
                </div>
                <div className="flex flex-col py-4">
                  <p className="text-gray text-xs mb-4">
                    An instant planning poker integration for your Jira tickets.
                    The fastest story points poker cards for your Scrum Teams
                  </p>
                  <div className="flex gap-3 overflow-x-auto text-xs font-medium mb-4">
                    <p className="bg-primary rounded-full py-1 px-2 whitespace-nowrap">
                      Project management
                    </p>
                    <p className="bg-primary rounded-full py-1 px-2 whitespace-nowrap">
                      Shared workflows
                    </p>
                    <p className="bg-primary rounded-full py-1 px-2 whitespace-nowrap">
                      Project management
                    </p>
                    <p className="bg-primary rounded-full py-1 px-2 whitespace-nowrap">
                      Shared workflows
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <img src={StarImg} alt="" />
                      <img src={StarImg} alt="" />
                      <img src={StarImg} alt="" />
                      <img src={StarImg} alt="" />
                      <img className="opacity-50" src={StarImg} alt="" />
                    </div>
                    <p className="body-2 text-gray">25 installs</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
