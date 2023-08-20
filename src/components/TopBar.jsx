import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import MisButton from "components/MisButton";
import MisSearch from "./MisSearch";

const TopBar = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    
    // Get our logged in user, if they exist, from the root route loader data
    // let { user } = useRouteLoaderData("root");

    const topBar = [
        { icon: <FiBell />, title: "Notifications" , clickEvent: () => setIsPopupOpen(!isPopupOpen) },
        { icon: <FiUser />, title: "Profile", clickEvent: () => navigate(`/profile/${localStorage.getItem('user_id')}`) },
         { icon: <FiLogOut />, title: "Logout", clickEvent: () => navigate("/logout") },
    ];

    return (
        <div className="flex flex-row gap-[10px] place-items-end p-1">
            <MisSearch />
            {topBar.map((item, index) => (
                <MisButton key={item.title} clickEvent={item.clickEvent} isFirst={index===0} icon={item.icon}></MisButton>
            ))}
        </div>
  );
};

export default TopBar;


