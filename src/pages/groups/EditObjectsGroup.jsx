import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useGetGroupsObjectsQuery,
  useGetGroupIdObjectsQuery,
  useEditObjectsGroupMutation,
} from "redux/index";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const EditObjectsGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: getGroupsObjects, isLoading: loadingGroupsObjects } =
    useGetGroupsObjectsQuery();
  const { data: getIdObjects } = useGetGroupIdObjectsQuery(id);
  const [editObjectsGroup] = useEditObjectsGroupMutation();

  const [checked, setChecked] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    if (getIdObjects) {
      setChecked(getIdObjects.map((obj) => obj.id));
    } else {
      setChecked(false);
    }
  }, [getIdObjects]);

  const handleEditObjectsGroup = async (e) => {
    e.preventDefault();
    if (checked) {
      await editObjectsGroup({ id, rest: checked }).unwrap();
    } else {
      await editObjectsGroup({ id, rest: [] }).unwrap();
    }
    navigate("/groups");
    toast.success("Group objects changed");
  };

  const handleChooseAll = () => {
    getGroupsObjects?.map((item) => {
      setChecked((checked) => [...checked, item.id]);
    });

    if (checked.length === getGroupsObjects?.length) {
      setChecked([]);
    }
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
        <h3 className="h3 mt-5">Manage objects</h3>
        <form className="my-4">
          <label
            className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
            htmlFor="search"
          >
            <input
              className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
              type="search"
              placeholder="Enter object name to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-12 text-gray" />
          </label>

          <h2
            onClick={handleChooseAll}
            className="flex justify-end cursor-pointer text-gray mb-5"
          >
            Choose all
          </h2>

          {loadingGroupsObjects ? (
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
              {getGroupsObjects &&
                getGroupsObjects
                  .filter((el) =>
                    el.object_id
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim())
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex w-full md:w-[calc(33.3333%_-_15px)]"
                    >
                      <label
                        className="flex items-center gap-2 text-gray body-2"
                        htmlFor={item.object_id}
                      >
                        <input
                          type="checkbox"
                          name={item.object_id}
                          id={item.object_id}
                          checked={checked ? checked.includes(item.id) : false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setChecked([...checked, item.id]);
                            } else {
                              setChecked(
                                checked.filter((obj) => obj !== item.id)
                              );
                            }
                          }}
                          className="bg-transparent cursor-pointer 
    w-5 h-5 border border-primary focus:ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none active:!outline-none focus-visible:!outline-none rounded"
                        />
                        {item.object_id.includes("Repo:")
                          ? item.object_id.slice(5)
                          : item.object_id}
                      </label>
                    </div>
                  ))}
            </div>
          )}
        </form>
      </div>
      <button onClick={handleEditObjectsGroup} className="btn-primary">
        Save
      </button>
    </div>
  );
};

export default EditObjectsGroup;
