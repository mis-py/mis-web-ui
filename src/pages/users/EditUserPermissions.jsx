import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPermissionsQuery,
  useGetPermissionsUserIdQuery,
  useEditUserPermissionMutation,
} from "../../redux";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const EditUserPermissions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkSuperUser, setCheckSuperUser] = React.useState(false);
  const { data: dataPermissions } = useGetPermissionsQuery();
  const { data: dataPermissionsUserId } = useGetPermissionsUserIdQuery(id);
  // const [editUserPermission] = useEditUserPermissionMutation();

  React.useEffect(() => {
    if (dataPermissionsUserId && dataPermissionsUserId.length) {
      if (dataPermissionsUserId[0].permission.scope === "core:sudo") {
        setCheckSuperUser(true);
      }
    } else if (dataPermissionsUserId && !dataPermissionsUserId.length) {
      setCheckSuperUser(false);
    }
  }, [dataPermissionsUserId]);

  const handleEditUserPermissions = async (e) => {
    e.preventDefault();
    // if (checkSuperUser) {
    //   await editUserPermission({
    //     id,
    //     str: "sudo:core", /////// CORE:SUDO
    //   }).unwrap();
    // } else {
    //   await editUserPermission({id, ...[]}).unwrap();
    // }
    toast.success("User rights changed");
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
              placeholder="Search ..."
            />
            <FiSearch className="w-12 text-gray" />
          </label>

          <label
            className="flex items-center gap-2 text-gray body-2"
            htmlFor="check-1"
          >
            <input
              type="checkbox"
              name="checkbox-1"
              id="check-1"
              checked={checkSuperUser}
              onChange={() => setCheckSuperUser(!checkSuperUser)}
              className="bg-transparent body-2 cursor-pointer 
      w-5 h-5 border border-primary focus:ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none active:!outline-none focus-visible:!outline-none rounded"
            />
            {dataPermissions && dataPermissions.core[0].name}
          </label>
        </form>
      </div>
      <button onClick={handleEditUserPermissions} className="btn-primary">
        Save
      </button>
    </div>
  );
};

export default EditUserPermissions;
