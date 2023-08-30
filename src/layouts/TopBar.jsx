import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import MisButton from "components/common/MisButton";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "redux/index";
import USER from "assets/img/user.png";
import { icons } from "react-icons/lib/esm";

const TopBar = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const {
        data: getUserId = [],
        isLoading: loadingUserId,
        refetch: refetchProfileData,
      } = useGetMeQuery();

    const topBar = [
        // { icon: <FiBell />, title: "Notifications" , clickEvent: () => setIsPopupOpen(!isPopupOpen) },
        { icon: <FiUser />, title: "Profile", clickEvent: () => navigate(`/profile/${localStorage.getItem('user_id')}`) },
        { icon: <FiLogOut />, title: "Logout", clickEvent: () => navigate("/logout") },
    ];

    const buttons = topBar.map((item, index) => (
        <MisButton key={item.title} clickEvent={item.clickEvent} isFirst={index===0} icon={item.icon}></MisButton>
    ))
    
    const handleClick = (e) => {
        const elem = e.target;//document.activeElement;
        if(elem){
            elem?.blur();
        }
    };

    const ahrefs = [
        { title: "Profile", path: `/profile/${getUserId.id}`, icon: <FiUser />},
        { title: "Logout", path: "/logout", icon: <FiLogOut /> }
    ].map((item, index)=>(
        <li key={index} onClick={(e) => {
            // e.preventDefault();
            // setIsPopupOpen(false)
            handleClick(e)
            }
            }>
            <NavLink key={index} className={({ isActive, isPending }) => isPending ? "" : isActive ? "" : ""
                } to={item.path}>
                {item.title}
                <span className="badge">{item.icon}</span>
            </NavLink>
        </li>
    ));

    return (
    <>
        <div className="flex items-center justify-between px-2 py-2">
            <div>Welcome, {getUserId.username}!</div>
            <div className="flex flex-row text-lg gap-1">
                {/* {buttons} */}
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-sm btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src={USER} />
                        </div>
                    </label>
                    <ul tabIndex="0" className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        {/* {buttons} */}
                        {ahrefs}
                        {/* <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li> */}
                    </ul>
                </div>
            </div>
        </div>

        {/* <div className="bg-base-100 flex flex-row gap-[10px] place-items-end ">
            
        </div> */}
    </>
  );
};

export default TopBar;


