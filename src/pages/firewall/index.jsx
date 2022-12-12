import React from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useGetPermissionsUserIdQuery, useGetFirewallQuery } from "../../redux";

import { FiSearch } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const Firewall = () => {
  const navigate = useNavigate();
  const {
    data: getFirewall = [],
    isLoading: loadingFirewall,
    error: errorFirewall,
  } = useGetFirewallQuery();
  const { data: getPermissionsUserId } = useGetPermissionsUserIdQuery(
    localStorage.getItem("user_id")
  );

  const [showSearch, setShowSearch] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [serchValue, setSearchValue] = React.useState("");

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const refPopup = useOutsideClick(handleClickOutside);

  React.useEffect(() => {
    if (errorFirewall) {
      toast.error("Firewall not found");
    }
  }, [errorFirewall]);

  const toggleEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(false);
      return;
    }
    setShowEdit(index);
  };

  // const handleDeleteTeam = async (id) => {
  //   confirmAlert({
  //     title: "Delete team",
  //     message: "Are you sure you want to delete this team?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: async () => {
  //           // await deleteTeam(id);
  //           navigate("/teams");
  //           toast.success("Team deleted");
  //         },
  //       },
  //       {
  //         label: "No",
  //       },
  //     ],
  //     overlayClassName: "bg-blackSecond/70",
  //   });
  // };

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
                placeholder="Enter firewall name to search..."
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          {getPermissionsUserId && getPermissionsUserId.length !== 0 ? (
            <Link
              to="/add-firewall"
              className="px-5 flex items-center justify-center bg-blackSecond text-gray rounded-lg"
            >
              <AiOutlinePlus />
            </Link>
          ) : (
            false
          )}
        </div>

        <h3 className="h3 mb-5">Firewalls ({getFirewall.length})</h3>
        {loadingFirewall ? (
          <h2 className="text-2xl mx-auto">Loading...</h2>
        ) : (
          <div className="flex flex-col gap-4">
            {getFirewall &&
              getFirewall
                // .filter((el) =>
                //   el.name
                //     .toLowerCase()
                //     .includes(serchValue.toLowerCase().trim())
                // )
                .map((firewall, index) => (
                  <div
                    key={firewall.id}
                    className="flex flex-col relative bg-blackSecond px-4 py-2 rounded lg:p-6"
                  >
                    <div
                      ref={refPopup}
                      className={`${
                        showEdit === index
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      } duration-300 absolute top-12 z-10 right-1 bg-backGround shadow lg:top-3`}
                    >
                      {getPermissionsUserId &&
                      getPermissionsUserId.length !== 0 ? (
                        <div className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary">
                          Editing
                        </div>
                      ) : (
                        false
                      )}
                      <div className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary">
                        Remove
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h4>{firewall.name}</h4>
                        <h5 className="text-gray text-xs">{firewall.ip}</h5>
                      </div>
                      <BiDotsVerticalRounded
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleEdit(index);
                        }}
                        className="text-3xl text-gray cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Firewall;
