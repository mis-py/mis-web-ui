import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGroupsObjectsQuery } from "../../redux";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const EditObjectsGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checked, setChecked] = React.useState([]);

  const { data: getGroupsObjects, isLoading: loadingGroupsObjects } =
    useGetGroupsObjectsQuery();

  console.log(getGroupsObjects);

  console.log(checked);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray cursor-pointer">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <div onClick={() => navigate(-1)}>back</div>
        </div>
        <h3 className="h3 mt-5">Manage objects</h3>
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

          {loadingGroupsObjects ? (
            <h2 className="text-2xl text-center">Loading...</h2>
          ) : (
            <div className="flex flex-col gap-4">
              {getGroupsObjects &&
                getGroupsObjects.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <label
                      className="flex items-center gap-2 text-gray body-2"
                      htmlFor={item.object_id}
                    >
                      <input
                        type="checkbox"
                        name={item.object_id}
                        id={item.object_id}
                        checked={
                          !checked.length
                            ? setChecked([""])
                            : checked.includes(item.id)
                        }
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
                      {item.object_id}
                    </label>
                  </div>
                ))}
            </div>
          )}
        </form>
      </div>
      <button className="btn-primary">Save</button>
    </div>
  );
};

export default EditObjectsGroup;
