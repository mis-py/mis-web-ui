import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPermissionsQuery } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { addSuperUser } from "../../redux/slices/addUserPermissionsSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const AddUserPermissions = () => {
  const navigate = useNavigate();
  const [checkSuperUser, setCheckSuperUser] = React.useState(false);
  const { data: dataPermissions } = useGetPermissionsQuery();
  const superUser = useSelector((state) => state.addUserPermissions.superUser);
  const dispatch = useDispatch();

  const handleCheckSuperPermissions = () => {
    if (checkSuperUser) {
      dispatch(addSuperUser("core:sudo"));
    }
    navigate(-1);
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
              placeholder="Enter permission name to search..."
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
      <button onClick={handleCheckSuperPermissions} className="btn-primary">
        Save
      </button>
    </div>
  );
};

export default AddUserPermissions;
