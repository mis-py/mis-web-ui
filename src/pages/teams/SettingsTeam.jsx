import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Switch from "react-switch";
import { toast } from "react-toastify";
import { useGetSettingsTeamIdQuery } from "../../redux";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const SettingsTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: getTeamSettings } = useGetSettingsTeamIdQuery(id);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center justify-between text-gray">
          <div className="flex">
            <div className="flex items-center mr-2">
              <IoIosArrowBack />
            </div>
            <Link to="/teams">back</Link>
          </div>
        </div>

        <h3 className="h3 my-4">Team name settings</h3>
        <h4 className="text-gray mb-5">General settings</h4>

        {/* <AdminWrapper>
          <h1 className="text-2xl font-bold">Global settings</h1>
          <form className="my-7">
            {formGlobalValue.map(
              (item, index) =>
                item.is_global && (
                  <label
                    key={item.id}
                    className="flex flex-col gap-1 mb-4"
                    htmlFor={item.key}
                  >
                    {item.key}
                    <input
                      className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
                      type={item.type}
                      id={item.id}
                      name={item.default_value}
                      autoComplete="off"
                      value={
                        item.default_value === null ? "" : item.default_value
                      }
                      onChange={(e) => {
                        let data = [...formGlobalValue];
                        data[index] = { ...data[index] };
                        data[index].default_value = e.target.value;

                        let data2 = { ...newGlobalSettings };
                        data2[e.target.id] = {
                          setting_id: data[index].id,
                          new_value:
                            data[index].default_value === ""
                              ? null
                              : data[index].default_value,
                        };
                        setFormGlobalValue(data);
                        setNewGlobalSettings(data2);
                      }}
                    />
                  </label>
                )
            )}
          </form>
        </AdminWrapper> */}
      </div>

      <div className="flex flex-col gap-4">
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
};

export default SettingsTeam;
