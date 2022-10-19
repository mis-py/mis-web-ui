import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";
import { useAddTeamMutation } from "../../redux";
import { toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

import UserImg from "../../assets/img/user.png";

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     fontWeight: state.isSelected ? "bold" : "normal",
//     color: state.isSelected ? "#ffffff" : "#757575",
//     backgroundColor: state.isSelected ? "#1A69DF" : "#1d1d1d",
//     borderRadius: "4px",
//   }),
//   singleValue: (provided, state) => ({
//     ...provided,
//     color: "#757575",
//     backgroundColor: "#1d1d1d",
//   }),
//   control: (base, state) => ({
//     ...base,
//     background: "#1d1d1d",
//     color: "#757575",
//     borderColor: "none",
//     borderWidth: "0",
//     boxShadow: state.isFocused ? null : null,
//   }),
//   menu: (provided) => ({
//     ...provided,
//     padding: 10,
//     backgroundColor: "#1d1d1d",
//   }),
//   input: (provided) => ({
//     ...provided,
//     color: "#757575",
//   }),
// };

const AddTeam = () => {
  const navigate = useNavigate();
  const [addTeam, { error: errorAddTeam }] = useAddTeamMutation();

  const [formValue, setFormValue] = React.useState({
    team_name: "",
    permissions: [],
  });

  // const options = dataGetTeams.map((item, index) => {
  //   return {
  //     value: item.id,
  //     label: item.name,
  //     id: index + 1,
  //   };
  // });

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!errorAddTeam) {
      if (formValue.username < 1) {
        toast.error("name min 2");
      } else {
        await addTeam({
          ...formValue,
        }).unwrap();
        navigate("/teams");
        toast.success("Added new team");
      }
    }
  };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center text-gray">
          <div className="flex mr-2">
            <IoIosArrowBack />
          </div>
          <Link to="/teams">back</Link>
        </div>
        <h3 className="h3 mt-5">New team</h3>

        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="name">
            Team name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none"
              type="text"
              id="name"
              placeholder="Enter a name"
              value={formValue.team_name}
              onChange={(e) =>
                setFormValue({ ...formValue, team_name: e.target.value })
              }
            />
          </label>

          <button className="w-[177px] mb-5 btn-primary items-center bg-transparent border border-primary text-primary hover:text-white">
            Add member
            <AiOutlinePlus className="ml-2" />
          </button>

          <div className="flex">
            <img className="w-[29px] h-[29px] shadow" src={UserImg} alt="" />
            <img
              className="w-[29px] h-[29px] shadow -ml-1"
              src={UserImg}
              alt=""
            />
            <img
              className="w-[29px] h-[29px] shadow -ml-1"
              src={UserImg}
              alt=""
            />
            <img
              className="w-[29px] h-[29px] shadow -ml-1"
              src={UserImg}
              alt=""
            />
            <img
              className="w-[29px] h-[29px] shadow -ml-1"
              src={UserImg}
              alt=""
            />
          </div>

          {/* <label className="flex flex-col gap-1 mb-4" htmlFor="password">
            Password
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none"
              type="password"
              id="password"
              placeholder="Enter a password"
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </label> */}
          {/* <label htmlFor="team">
            Team
            <Select
              options={options}
              styles={customStyles}
              placeholder="The team is not selected"
              onChange={(choice) =>
                setFormValue({
                  ...formValue,
                  team_id: choice.value,
                })
              }
            />
          </label> */}
        </form>
      </div>
      <button onClick={handleAddUser} className="btn-primary">
        Create a team
      </button>
    </div>
  );
};

export default AddTeam;
