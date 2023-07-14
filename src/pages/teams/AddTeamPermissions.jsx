import React from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useGetPermissionsQuery } from "redux/index";
import { useDispatch, useSelector } from "react-redux";
import { addTeamPermissions } from "redux/slices/teamSlice";

import { IoIosArrowBack } from "react-icons/io";
import PermissionLabel from "components/permissions/PermissionLabel";
import { FiSearch } from "react-icons/fi";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import PageHeader from "../../components/common/PageHeader";

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
        <PageHeader
          header="Manage permissions"
        />
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
            <SpinnerLoader />
          ) : (
            <div className="flex flex-wrap gap-4">
              {getPermissions
                ?.filter((el) =>
                  el.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
                .map((item) => (
                  <PermissionLabel
                    key={item.id}
                    className="flex flex-col w-full sm:w-[calc(50%_-_8px)]"
                    item={item}
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
                  />
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
