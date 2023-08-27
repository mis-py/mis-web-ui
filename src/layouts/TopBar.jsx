import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import MisButton from "components/common/MisButton";

const TopBar = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const topBar = [
        { icon: <FiBell />, title: "Notifications" , clickEvent: () => setIsPopupOpen(!isPopupOpen) },
        { icon: <FiUser />, title: "Profile", clickEvent: () => navigate(`/profile/${localStorage.getItem('user_id')}`) },
         { icon: <FiLogOut />, title: "Logout", clickEvent: () => navigate("/logout") },
    ];

    return (
        <div className="flex flex-row gap-[10px] place-items-end p-1">
            {topBar.map((item, index) => (
                <MisButton key={item.title} clickEvent={item.clickEvent} isFirst={index===0} icon={item.icon}></MisButton>
            ))}
        </div>
  );
};

export default TopBar;


