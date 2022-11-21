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
  const { data: dataPermissions } = useGetPermissionsQuery();
  const { data: dataPermissionsTeamId } = useGetPermissionsTeamIdQuery(id);
  const [editTeamPermission] = useEditTeamPermissionMutation();

  React.useEffect(() => {
    if (dataPermissionsTeamId && dataPermissionsTeamId.length) {
      setChecked(
        dataPermissionsTeamId &&
          dataPermissionsTeamId.map((it) => it.permission.scope)
      );
    } else if (dataPermissionsTeamId && !dataPermissionsTeamId.length) {
      setChecked(false);
    }
  }, [dataPermissionsTeamId]);

  const handleEditTeamPermissions = async (e) => {
    e.preventDefault();
    if (checked) {
      await editTeamPermission({ id, rest: checked }).unwrap();
    } else {
      await editTeamPermission({ id, rest: [] }).unwrap();
    }
    toast.success("Team rights changed");
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
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
              placeholder="Search..."
            />
            <FiSearch className="w-12 text-gray" />
          </label>

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
        </form>
      </div>
      <button onClick={handleEditTeamPermissions} className="btn-primary">
        Save
      </button>
    </div>
  );
};

export default EditTeamPermissions;
