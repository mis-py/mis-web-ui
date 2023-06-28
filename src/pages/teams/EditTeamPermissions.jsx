import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPermissionsQuery,
  useGetPermissionsTeamIdQuery,
  useEditTeamPermissionMutation,
} from "redux/index";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import PermissionLabel from "components/permissions/PermissionLabel";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const EditTeamPermissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const permissions = useSelector((state) => state.team.permissions);
  const [checked, setChecked] = React.useState([]);
  const [editTeamPermission] = useEditTeamPermissionMutation();
  const { data: dataPermissions = [], isLoading: loadingDataPermissions } =
    useGetPermissionsQuery();
  const { data: getPermissionsTeamId } = useGetPermissionsTeamIdQuery(id);

  const handleAddPermissions = async (e) => {
    e.preventDefault();
    if (checked) {
      await editTeamPermission({ id, rest: checked }).unwrap();
    } else {
      await editTeamPermission({ id, rest: [] }).unwrap();
    }
    toast.success("Team rights changed");
  };

  React.useEffect(() => {
    if (getPermissionsTeamId && getPermissionsTeamId.length) {
      setChecked(
        getPermissionsTeamId &&
          getPermissionsTeamId.map((it) => it.permission.scope)
      );
    } else if (getPermissionsTeamId && !getPermissionsTeamId.length) {
      setChecked(false);
    }
  }, [getPermissionsTeamId]);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray cursor-pointer">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <div onClick={() => navigate(-1)}>back</div>
        </div>
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
            />
            <FiSearch className="w-12 text-gray" />
          </label>

          {loadingDataPermissions ? (
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
            <div className="flex flex-col gap-4">
              {dataPermissions &&
                dataPermissions.map((item) => (
                  <PermissionLabel 
                  key={item.id} 
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

export default EditTeamPermissions;
