import React from "react";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, Link } from "react-router-dom";
import { useGetPermissionsQuery } from "redux/index";
import { useDispatch, useSelector } from "react-redux";
import { addTeamPermissions } from "redux/slices/teamSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const AddTeamPermissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.team.permissions);
  const { data: getPermissions = [], isLoading: loadingPermissions } =
    useGetPermissionsQuery();

  const [searchValue, setSearchValue] = React.useState("");
  const [checked, setChecked] = React.useState([]);

  React.useEffect(() => {
    if (permissions?.length) {
      setChecked(permissions);
    }
  }, []);

  const handleAddPermissions = () => {
    dispatch(addTeamPermissions(checked.filter((n) => n !== "")));
    navigate(-1);
    toast.success("Team permissions saved");
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <Link to={-1} className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <span>back</span>
        </Link>
        <h3 className="h3 mt-5">Manage permissions</h3>
        <form className="my-4">
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Enter permission name to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>

          {loadingPermissions ? (
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
            <div className="flex flex-wrap gap-4">
              {getPermissions
                ?.filter((el) =>
                  el.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col w-full sm:w-[calc(50%_-_8px)]"
                  >
                    {item.app.name}
                    <label
                      className={`${
                        checked.includes(item.id)
                          ? "border-primary"
                          : "border-blackSecond"
                      } flex border duration-300 items-center gap-2 rounded bg-blackSecond p-5 cursor-pointer text-gray body-2`}
                      htmlFor={item.name}
                    >
                      <input
                        type="checkbox"
                        name={item.name}
                        id={item.name}
                        checked={
                          !checked.length
                            ? setChecked([""])
                            : checked.includes(item.scope)
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setChecked([...checked, item.scope]);
                          } else {
                            setChecked(
                              checked.filter((obj) => obj !== item.scope)
                            );
                          }
                        }}
                        className="bg-transparent cursor-pointer 
                        w-5 h-5 border border-primary focus:ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none active:!outline-none focus-visible:!outline-none rounded"
                      />
                      {item.name} ({item.scope})
                    </label>
                  </div>
                ))}
            </div>
          )}
        </form>
      </div>
      <button onClick={handleAddPermissions} className="btn-primary">
        Save
      </button>
    </div>
  );
};

export default AddTeamPermissions;
