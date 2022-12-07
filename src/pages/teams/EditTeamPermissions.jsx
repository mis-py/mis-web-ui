import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPermissionsQuery,
  useGetPermissionsTeamIdQuery,
  useEditTeamPermissionMutation,
} from "../../redux";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const EditTeamPermissions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
            <h2 className="text-2xl text-center">Loading...</h2>
          ) : (
            <div className="flex flex-col gap-4">
              {dataPermissions &&
                dataPermissions.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    {item.app.name}
                    <label
                      className="flex items-center gap-2 text-gray body-2"
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

export default EditTeamPermissions;
