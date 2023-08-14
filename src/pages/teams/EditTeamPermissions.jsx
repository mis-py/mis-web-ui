import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetPermissionsQuery,
  useGetPermissionsTeamIdQuery,
  useEditTeamPermissionMutation,
} from "redux/index";
import { addTeamPermissions } from "redux/slices/teamSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import PermissionLabel from "components/permissions/PermissionLabel";

import { FiSearch } from "react-icons/fi";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import PageHeader from "../../components/common/PageHeader";

const EditTeamPermissions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([]);
  const permissions = useSelector((state) => state.team.permissions);
  const [editTeamPermission] = useEditTeamPermissionMutation();
  const { data: dataPermissions = [], isLoading: loadingDataPermissions } =
    useGetPermissionsQuery();
  const { data: getPermissionsTeamId, isLoading: loadingPermissionsTeamId } =
    useGetPermissionsTeamIdQuery(id);

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
    if (!loadingPermissionsTeamId) {
      setChecked(getPermissionsTeamId.map((it) => it.permission.scope));
    }
  }, [loadingPermissionsTeamId]);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader header="Manage permissions" />
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
            <SpinnerLoader />
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
                        setChecked(checked.filter((obj) => obj !== item.scope));
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
