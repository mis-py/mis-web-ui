import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Select from "react-select";
import { toast } from "react-toastify";
import { useEditTeamMutation, useGetTeamIdQuery } from "../../redux";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

import IconUserImg from "../../assets/img/user.png";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    color: state.isSelected ? "#ffffff" : "#757575",
    backgroundColor: state.isSelected ? "#1A69DF" : "#1d1d1d",
    borderRadius: "4px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#757575",
    backgroundColor: "#1d1d1d",
  }),
  control: (base, state) => ({
    ...base,
    background: "#1d1d1d",
    color: "#757575",
    borderColor: "none",
    borderWidth: "0",
    boxShadow: state.isFocused ? null : null,
  }),
  menu: (provided) => ({
    ...provided,
    padding: 10,
    backgroundColor: "#1d1d1d",
  }),
  input: (provided) => ({
    ...provided,
    color: "#757575",
  }),
};

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: getTeamId, isLoading } = useGetTeamIdQuery(id);
  const [editTeam] = useEditTeamMutation();

  const [formValue, setFormValue] = React.useState({
    name: "",
  });

  // const options = dataGetTeams.map((item, index) => {
  //   return {
  //     value: item.id,
  //     label: item.name,
  //     id: index + 1,
  //   };
  // });

  React.useEffect(() => {
    if (!isLoading) {
      setFormValue({
        name: getTeamId.name,
      });
    }
  }, [isLoading]);

  const handleEditTeam = async (e) => {
    e.preventDefault();
    await editTeam({
      id,
      name: formValue.name,
    }).unwrap();
    navigate("/teams");
    toast.success("Team updating");
  };

  // const handleDeletUser = async (e) => {
  //   e.preventDefault();
  //   await deletUser(id);
  //   navigate("/");
  //   toast.success("User DELETED");
  // };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/teams">back</Link>
        </div>
        <h3 className="h3 mt-5">Editing Team</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="teamname">
            Team name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none"
              type="text"
              id="teamname"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </label>

          <button className="w-[177px] mb-5 btn-primary items-center bg-transparent border border-primary text-primary hover:text-white">
            Add member
            <AiOutlinePlus className="ml-2" />
          </button>

          <div className="flex">
            {!isLoading &&
              getTeamId.users.map((item) => (
                <img
                  key={item.id}
                  className="w-[29px] h-[29px] shadow -ml-1"
                  src={IconUserImg}
                  alt=""
                />
              ))}
          </div>

          {/* <label htmlFor="team">
            Team
            <Select
              options={options}
              styles={customStyles}
              value={{
                label: formValue.team.name,
                value: formValue.team.id,
              }}
              onChange={(choice) => {
                setFormValue({
                  ...formValue,
                  team: { id: choice.value, name: choice.label },
                });
              }}
            />
          </label> */}
        </form>
      </div>
      <button onClick={handleEditTeam} className="btn-primary">
        Save
      </button>
    </div>
  );
};

export default EditUser;
