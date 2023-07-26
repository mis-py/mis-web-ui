import React from "react";
import { useGetPermissionsQuery } from "redux/index";
import { useSelector, useDispatch } from "react-redux";
import { addUserPermissions } from "redux/slices/userSlice";
import { toast } from "react-toastify";

import SearchInput from "components/SearchInput";
import PermissionLabel from "components/permissions/PermissionLabel";

import SpinnerLoader from "../../components/common/SpinnerLoader";
import PageHeader from "../../components/common/PageHeader";

const AddUserPermissions = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.user.permissions);
  const [searchValue, setSearchValue] = React.useState("");
  const [checked, setChecked] = React.useState([...permissions]);
  const { data: getPermissions = [], isLoading: loadingPermissions } =
    useGetPermissionsQuery();

  const handleUserPermissions = () => {
    dispatch(addUserPermissions(checked));
    toast.success("User permissions saved");
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader
          header="Manage permissions"
        />
        <form className="my-4">
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={"Enter permission name to search..."}
          />
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
                      item={item}
                      checked={
                        checked.length === []
                            ? setChecked([])
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
        <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
          <button onClick={handleUserPermissions} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserPermissions;
